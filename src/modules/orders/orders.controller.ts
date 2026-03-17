import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderResponseDto } from './dto/response-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';


@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create Order' })
    @ApiResponse({
        status: 201,
        description: 'Order created successfully',
        type: OrderResponseDto,
    })

    @ApiResponse({
        status: 400,
        description: 'Bad request',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error',
    })

    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }


}
