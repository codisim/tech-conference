import { Body, Controller, Get, Post } from '@nestjs/common';
import { SpeakersService } from './speakers.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { SpeakerResponseDto } from './dto/response-speaker.dto';


@ApiTags('Speakers')
@Controller('speakers')
export class SpeakersController {
    constructor(private readonly speakersService: SpeakersService) { }

    // create a speaker
    @Post()
    @ApiOperation({ summary: 'Create a new speaker' })
    @ApiBody({ type: CreateSpeakerDto })
    @ApiResponse({ status: 201, description: 'Speaker created successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async createSpeaker(@Body() createSpeakerDto: CreateSpeakerDto): Promise<SpeakerResponseDto> {
        return this.speakersService.CreateSpeakerDto(createSpeakerDto);
    }

    // get all speakers
    @Get()
    @ApiOperation({ summary: 'Get all speakers' })
    @ApiResponse({ status: 200, description: 'Speakers retrieved successfully' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getAllSpeakers(): Promise<SpeakerResponseDto[]> {
        return this.speakersService.getAllSpeakers();
    }

    // get a speaker
    @Get(':id')
    @ApiOperation({ summary: 'Get a speaker by ID' })
    @ApiResponse({ status: 200, description: 'Speaker retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Speaker not found' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getSpeakerById(@Body('id') id: string): Promise<SpeakerResponseDto> {
        return this.speakersService.getSpeakerById(id);
    }

    // update a speaker

    // delete a speaker

}
