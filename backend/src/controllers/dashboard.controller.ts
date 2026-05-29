import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const organizerId = req.user.id;

    // Récupérer tous les événements de l'organisateur
    const events = await prisma.event.findMany({
      where: { organizerId },
      include: { registrations: true }
    });

    // Calculer les statistiques
    const stats = events.map(event => ({
      id: event.id,
      title: event.title,
      date: event.date,
      capacity: event.capacity,
      totalRegistrations: event.registrations.length,
      fillRate: Math.round((event.registrations.length / event.capacity) * 100),
      status: event.status
    }));

    const totalEvents = events.length;
    const totalParticipants = events.reduce(
      (acc, event) => acc + event.registrations.length, 0
    );

    res.json({ stats, totalEvents, totalParticipants });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};