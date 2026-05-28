export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    time: string;
    capacity: number;
    image?: string;
    status: "DRAFT" | "PUBLISHED" | "CANCELLED" | "COMPLETED";
    organizerId: string;
    createdAt: Date;
}
export declare class EventsService {
    private events;
    createEvent(data: Array<any> | any): Promise<Event>;
    getAllEvents(): Promise<Event[]>;
}
//# sourceMappingURL=events.service.d.ts.map