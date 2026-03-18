import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { PaymentResponseDto } from './dto/payment-response.dto';

@Injectable()
export class PaymentsService {
    private stripe: Stripe;

    constructor(private prisma: PrismaService) {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2026-02-25.clover'
        })
    }

    // create payment intent
    async createPaymentIntent(createPaymentDto: CreatePaymentDto, userId: string): Promise<{
        susssess: boolean;
        data: {
            clientSecret: string;
            paymentId: string;
        };
        message: string;
    }> {
        const { orderId, provider = 'STRIPE', transactionId } = createPaymentDto;

        const order = await this.prisma.order.findUnique({
            where: {
                id: orderId,
                userId
            }
        });

        if (!order)
            throw new NotFoundException(`Order not found in ${userId} account`);


        const exixtingPayment = await this.prisma.payment.findFirst({
            where: {
                orderId
            }
        });

        if (exixtingPayment && exixtingPayment.status === PaymentStatus.SUCCESS)
            throw new BadRequestException('Payment already completed for this order')


        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: order.totalAmount * 100,
            currency: 'usd',
            payment_method_types: ['card'],
            metadata: {
                orderId,
                userId
            }
        })


        const payment = await this.prisma.payment.create({
            data: {
                orderId,
                userId,
                status: PaymentStatus.PENDING,
                provider,
                transactionId: paymentIntent.id
            }
        })

        return {
            susssess: true,
            data: {
                clientSecret: paymentIntent.client_secret!,
                paymentId: payment.id
            },
            message: 'Payment intent created successfully'
        }

    }


    // confirmed paymant
    async confirmPayment(confirmPaymentDto: { paymentIntentId: string, orderId: string }, userId: string): Promise<{
        success: boolean;
        data: PaymentResponseDto;
        message: string;
    }> {

        const { paymentIntentId, orderId } = confirmPaymentDto;

        const payment = await this.prisma.payment.findFirst({
            where: {
                userId,
                orderId,
                transactionId: paymentIntentId
            }
        });

        if (!payment)
            throw new NotFoundException('Payment not found or already confirmed')

        if (payment.status === PaymentStatus.SUCCESS)
            throw new BadRequestException('Payment already confirmed')

        const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== 'succeeded')
            throw new BadRequestException('Payment not completed')


        const [updatedPayment] = await this.prisma.$transaction([
            this.prisma.payment.update({
                where: {
                    id: payment.id
                },
                data: {
                    status: PaymentStatus.SUCCESS
                },
            }),

            this.prisma.order.update({
                where: {
                    id: orderId
                },
                data: {
                    status: OrderStatus.PROCESSING
                }
            }),
        ]);

        // TODO: as like update checkout in card item


        return {
            success: true,
            data: this.mapToPaymentResponse(updatedPayment),
            message: 'Payment confirmed successfully'
        }

    }



    // get all payment
    async getAllPayment(userId: string): Promise<{
        success: boolean;
        data: PaymentResponseDto[];
        message: string;
    }> {

        const payments = await this.prisma.payment.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return {
            success: true,
            data: payments.map(payment => this.mapToPaymentResponse(payment)),
            message: 'Payment found successfully'
        }

    }


    private mapToPaymentResponse(payment: any): PaymentResponseDto {
        return {
            id: payment.id,
            provider: payment.provider,
            transactionId: payment.transactionId,
            status: payment.status,
            userId: payment.userId,
            orderId: payment.orderId,
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt
        }
    }

}
