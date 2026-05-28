import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
// 1. Ajoute l'import de ApiBody tout en haut
import { ApiBody, ApiTags } from '@nestjs/swagger'; 

import {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  getOrganizerEvents,
  updateEvent,
  updateEventStatus,
} from '../services/eventService';

@ApiTags('Events') // Optionnel : pour regrouper tes routes proprement dans Swagger
@Controller('events')
export class EventsController {
  // ============================================
  // CREATE EVENT
  // ============================================

  @Post()
  // 2. On dit explicitement à Swagger à quoi doit ressembler le JSON attendu
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Mon super événement' },
        description: { type: 'string', example: 'Une description détaillée' },
        date: { type: 'string', example: '2026-06-15T18:00:00.000Z' },
        location: { type: 'string', example: 'Yaoundé, Cameroun' },
        price: { type: 'number', example: 0 },
        capacity: { type: 'number', example: 100 },
        organizerId: { type: 'string', example: 'clx123abc456' }, // Très important car ton service l'attend !
      },
      required: ['title', 'date', 'organizerId'], // Les champs obligatoires
    },
  })
  async create(
    @Body() body: any,
  ) {
    return createEvent(
      body,
      body.organizerId,
    );
  }

  // ============================================
  // GET EVENTS
  // ============================================

  @Get()
  async findAll(
    @Query() query: any,
  ) {
    return getEvents(query);
  }

  // ============================================
  // GET ORGANIZER EVENTS
  // ============================================

  @Get('organizer/:id')
  async organizerEvents(
    @Param('id') id: string,
  ) {
    return getOrganizerEvents(id);
  }

  // ============================================
  // GET ONE EVENT
  // ============================================

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ) {
    return getEventById(id);
  }

  // ============================================
  // UPDATE EVENT
  // ============================================

  @Patch(':id')
  async update(
    @Param('id') id: string,

    @Body() body: any,
  ) {
    return updateEvent(id, body);
  }

  // ============================================
  // UPDATE STATUS
  // ============================================

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,

    @Body() body: any,
  ) {
    return updateEventStatus(
      id,
      body.status,
    );
  }

  // ============================================
  // DELETE EVENT
  // ============================================

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ) {
    return deleteEvent(id);
  }
}