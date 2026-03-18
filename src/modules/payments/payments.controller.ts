import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentResponseApiDto } from './dto/payment-response.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

@Controller('payments')
@UseGuards(JwtAuthGuard)
@ApiTags('payments')
@ApiBearerAuth()

export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }


    // create 
    @Post('payment-intent')
    @ApiOperation({
        summary: 'create payment intent',
        description: 'create payment intent for an order'
    })

    @ApiCreatedResponse({
        description: 'payment intent created successfully',
        type: PaymentResponseApiDto
    })

    @ApiBadRequestResponse({
        description: 'bad request',
    })


    async createPaymentIntent(@Body() createPaymentDto: CreatePaymentDto, @GetUser('id') userId: string) {
        return await this.paymentsService.createPaymentIntent(createPaymentDto, userId)
    }


    // confirmed paymant
    @Post('confirm')
    @ApiOperation({
        summary: 'confirm payment',
        description: 'confirm payment for an order'
    })

    @ApiResponse({
        status: 200,
        description: 'payment confirmed successfully',
        type: PaymentResponseApiDto
    })

    @ApiBadRequestResponse({
        description: 'Payment not found or already confirmed',
    })


    async confirmpayment(@Body() confirmPaymentDto: ConfirmPaymentDto, @GetUser('id') userId: string) {
        return await this.paymentsService.confirmPayment(confirmPaymentDto, userId)
    }



    // get all payment
    @Get()
    @ApiOperation({
        summary: 'get all payment',
        description: 'get all payment for an user'
    })

    @ApiOkResponse({
        description: 'payment found successfully',
        type: PaymentResponseApiDto,
        isArray: true
    })

    async getAllPayment(@GetUser('id') userId: string) {
        return await this.paymentsService.getAllPayment(userId)
    }

}
