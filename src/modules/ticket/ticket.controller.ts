import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketResponseDto } from './dto/ticket-response.dto';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {
    constructor(private readonly ticketService: TicketService) { }

    // create new ticker
    @Post()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Create new ticket'
    })

    @ApiBody({ type: CreateTicketDto })

    @ApiResponse({
        status: 201,
        description: 'The ticket has been successfully created.',
        type: CreateTicketDto
    })

    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })

    @ApiResponse({
        status: 500,
        description: 'Internal server error.'
    })

    async createTicket(@Body() createTicketDto: CreateTicketDto, @Req() req): Promise<TicketResponseDto> {
        const userId = req.user.id;
        return this.ticketService.createTicket(createTicketDto, userId);
    }


}
