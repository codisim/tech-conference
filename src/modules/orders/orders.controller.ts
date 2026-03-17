import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderResponseDto } from './dto/response-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role.decorators';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';


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


    // update status only admin
    @Patch(':id/status')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Update order status' })

    @ApiResponse({
        status: 200,
        description: 'Order status updated successfully',
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
        status: 401,
        description: 'Unauthorized',
    })

    @ApiResponse({
        status: 500,
        description: 'Internal server error',
    })


    @Patch(':id/status')
    updateStatus(
        @Param('id') id: string,
        @Body() dto: UpdateOrderStatusDto,
    ) {
        return this.ordersService.updateStatus(id, dto.status);
    }


    // delete
    @Delete(':id')
    @ApiOperation({ summary: 'Delete order' })
    @ApiResponse({
        status: 200,
        description: 'Order deleted successfully',
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
        status: 401,
        description: 'Unauthorized',
    })

    @ApiResponse({
        status: 500,
        description: 'Internal server error',
    })


    remove(@Param('id') id: string): Promise<{ message: string }> {
        return this.ordersService.remove(id);
    }
}
