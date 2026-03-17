import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketResponseDto } from './dto/ticket-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateTicketDto } from './dto/update-ticker.dto';

@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  // create new ticker
  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create new ticket',
  })
  @ApiBody({ type: CreateTicketDto })
  @ApiResponse({
    status: 201,
    description: 'The ticket has been successfully created.',
    type: CreateTicketDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async createTicket(
    @Body() createTicketDto: CreateTicketDto,
    @Req() req,
  ): Promise<TicketResponseDto> {
    const userId = req.user.id;
    return this.ticketService.createTicket(createTicketDto, userId);
  }

  // get all
  @Get()
  @ApiOperation({ summary: 'Get all tickets of logged-in user' })
  @ApiResponse({ status: 200, type: [TicketResponseDto] })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getAllTickets(@Req() req): Promise<TicketResponseDto[]> {
    return this.ticketService.getAllTickets(req.user.id);
  }

  // get single
  @Get(':id')
  @ApiOperation({ summary: 'Get single ticket by ID' })
  @ApiResponse({ status: 200, type: TicketResponseDto })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getTicketById(
    @Param('id') id: string,
    @Req() req,
  ): Promise<TicketResponseDto> {
    return this.ticketService.getTicketById(id, req.user.id);
  }

  // update
  @Patch(':id')
  @ApiOperation({ summary: 'Update ticket (status or qrCode)' })
  @ApiResponse({ status: 200, type: TicketResponseDto })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async updateTicket(
    @Param('id') id: string,
    @Body() dto: UpdateTicketDto,
    @Req() req,
  ): Promise<TicketResponseDto> {
    return this.ticketService.updateTicket(id, dto, req.user.id);
  }

  // delete
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete ticket' })
  async deleteTicket(
    @Param('id') id: string,
    @Req() req,
  ): Promise<{ message: string }> {
    return this.ticketService.deleteTicket(id, req.user.id);
  }
}
