import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// S'inscrire à un événement
export const registerToEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    // Vérifier si l'événement existe
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { registrations: true }
    });

    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    // Vérifier les places disponibles
    if (event.registrations.length >= event.capacity) {
      return res.status(400).json({ message: 'Plus de places disponibles' });
    }

    // Vérifier si déjà inscrit
    const existing = await prisma.registration.findFirst({
      where: { userId, eventId }
    });

    if (existing) {
      return res.status(400).json({ message: 'Déjà inscrit à cet événement' });
    }

    // Générer le ticket code et QR code
    const ticketCode = uuidv4();
    const qrCode = await QRCode.toDataURL(ticketCode);

    // Créer l'inscription
    const registration = await prisma.registration.create({
      data: { userId, eventId, ticketCode }
    });

    res.status(201).json({ registration, qrCode });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Voir mes inscriptions
export const getMyRegistrations = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const registrations = await prisma.registration.findMany({
      where: { userId },
      include: { event: true }
    });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};