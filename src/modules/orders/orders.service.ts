import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/response-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    // create
    async create(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
        return this.prisma.order.create({
            data: createOrderDto,
            include: {
                payment: true,
                tickets: true,
            },
        });
    }

    async findAll(): Promise<OrderResponseDto[]> {
        return this.prisma.order.findMany({
            include: {
                payment: true,
                tickets: true,
            },
        });
    }

    async findOne(id: string): Promise<OrderResponseDto> {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                payment: true,
                tickets: true,
            },
        });

        if (!order)
            throw new NotFoundException('Order not found');

        return order;
    }


    // update only admin
    async updateStatus(id: string, status: any) {
        await this.findOne(id);

        return this.prisma.order.update({
            where: { id },
            data: { status },
        });
    }


    // delete
    async remove(id: string): Promise<{ message: string }> {
        const existingOrder = await this.findOne(id);

        if (!existingOrder)
            throw new NotFoundException('Order not found');

        await this.prisma.order.delete({
            where: { id },
        });

        return { message: 'Order deleted successfully' };
    }

}
