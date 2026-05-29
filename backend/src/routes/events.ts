import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  getOrganizerEvents,
  updateEvent,
  updateEventStatus,
} from '../services/eventService';

@ApiTags('Events')
@Controller('events')
export class EventsController {



  @Post()
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title:       { type: 'string',  example: 'Mon super événement' },
        description: { type: 'string',  example: 'Une description détaillée' },
        date:        { type: 'string',  example: '2026-06-15' },
        time:        { type: 'string',  example: '18:00' },
        location:    { type: 'string',  example: 'Yaoundé, Cameroun' },
        category:    { type: 'string',  example: 'Concert' },
        capacity:    { type: 'number',  example: 100 },
        image:       { type: 'string',  example: 'https://...' },
      },
      required: ['title', 'description', 'date', 'time', 'location', 'category', 'capacity'],
    },
  })
  async create(
    @Body() body: any,
    @Req() req: Request,
  ) {
    const organizerId = (req as any).user?.sub;

    if (!organizerId) {
      throw new UnauthorizedException("Impossible d'identifier l'organisateur");
    }

    
    const eventData = {
      ...body,
      date: new Date(body.date).toISOString(),
    };

    
    delete eventData.organizerId;

    return createEvent(eventData, organizerId);
  }

  

  @Get()
  async findAll(@Query() query: any) {
    return getEvents(query);
  }

 

  @Get('organizer/:id')
  @ApiBearerAuth()
  async organizerEvents(@Param('id') id: string) {
    return getOrganizerEvents(id);
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return getEventById(id);
  }



  @Patch(':id')
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return updateEvent(id, body);
  }

  

  @Patch(':id/status')
  @ApiBearerAuth()
  async updateStatus(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return updateEventStatus(id, body.status);
  }

 
  @Delete(':id')
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return deleteEvent(id);
  }
}