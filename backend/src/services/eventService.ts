import prisma from '../lib/prisma';

export const createEvent = async (
  data: any,
  organizerId: string,
) => {
  return prisma.event.create({
    data: {
      ...data,
      organizerId,
    },
  });
};

export const getEvents = async (
  query: any,
) => {
  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const where: any = {
    status: 'PUBLISHED',
  };

  // SEARCH
  if (query.search) {
    where.OR = [
      {
        title: {
          contains: query.search,
          mode: 'insensitive',
        },
      },
      {
        description: {
          contains: query.search,
          mode: 'insensitive',
        },
      },
    ];
  }

  // CATEGORY
  if (query.category) {
    where.category = query.category;
  }

  // LOCATION
  if (query.location) {
    where.location = {
      contains: query.location,
      mode: 'insensitive',
    };
  }

  const [events, total] =
    await Promise.all([
      prisma.event.findMany({
        where,

        skip,

        take: limit,

        orderBy: {
          createdAt: 'desc',
        },
      }),

      prisma.event.count({ where }),
    ]);

  return {
    data: events,

    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(
        total / limit,
      ),
    },
  };
};

export const getEventById = async (
  id: string,
) => {
  return prisma.event.findUnique({
    where: { id },
  });
};

export const updateEvent = async (
  id: string,
  data: any,
) => {
  return prisma.event.update({
    where: { id },

    data,
  });
};

export const updateEventStatus =
  async (
    id: string,
    status: string,
  ) => {
    return prisma.event.update({
      where: { id },

      data: {
        status: status as any,
      },
    });
  };

export const deleteEvent = async (
  id: string,
) => {
  return prisma.event.delete({
    where: { id },
  });
};

export const getOrganizerEvents =
  async (organizerId: string) => {
    return prisma.event.findMany({
      where: {
        organizerId,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  };