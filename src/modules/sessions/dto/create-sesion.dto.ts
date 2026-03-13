import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateSessionDto {

  @ApiProperty({
    description: "Session title",
    example: "Introduction to NestJS"
  })
  @IsString()
  @IsNotEmpty({ message: "Title cannot be empty." })
  title: string;

  @ApiProperty({
    description: "Session start time",
    example: "2026-05-10T10:00:00Z"
  })
  @IsDateString({}, { message: "Start time must be a valid ISO date string." })
  startTime: string;

  @ApiProperty({
    description: "Session end time",
    example: "2026-05-10T11:00:00Z"
  })
  @IsDateString({}, { message: "End time must be a valid ISO date string." })
  endTime: string;

  @ApiProperty({
    description: "Event ID this session belongs to",
    example: "7d9f1f5c-2d11-4e5e-9c90-1e5a1b23c7aa"
  })
  @IsString()
  eventId: string;
}