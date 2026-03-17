import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderResponseDto } from './dto/response-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';


@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    // create
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

    create(@Body() createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
        return this.ordersService.create(createOrderDto);
    }


    // get all
    @Get()
    @ApiOperation({ summary: 'Get all orders' })
    @ApiResponse({
        status: 200,
        type: [OrderResponseDto],
    })

    @ApiResponse({
        status: 400,
        description: 'Bad request',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error',
    })


    // get all
    findAll(): Promise<OrderResponseDto[]> {
        return this.ordersService.findAll();
    }


    // get one 
    @Get(':id')
    @ApiOperation({ summary: 'Get order by ID' })
    @ApiResponse({
        status: 200,
        type: OrderResponseDto,
    })

     @ApiResponse({
        status: 400,
        description: 'Bad request',
    })
    
    @ApiResponse({
        status: 404,
        description: 'Order not found',
    })

    @ApiResponse({
        status: 500,
        description: 'Internal server error',
    })

    findOne(@Param('id') id: string): Promise<OrderResponseDto> {
        return this.ordersService.findOne(id);
    }

}
