import { Controller, Post, Get, Body, Req, Res } from "@nestjs/common";
import { EventsService } from "./events.service.js";

interface createEventDto {
  title: string;
  description: string;
  date: string;
  location: string;
  time: string;
  capacity: number;
  image?: string;
  organizerId?: string;
}

@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(
    @Body() createEventDto: any,
    @Req() req: any,
    @Res() res: any,
  ): Promise<any> {
    const result = await this.eventsService.createEvent(createEventDto);
    return res.status(201).json(result);
  }

  @Get()
  async findAll(@Req() req: any, @Res() res: any): Promise<any> {
    const result = await this.eventsService.getAllEvents();
    return res.status(200).json(result);
  }
}
