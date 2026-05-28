import { EventsService } from "./events.service.js";
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(createEventDto: any, req: any, res: any): Promise<any>;
    findAll(req: any, res: any): Promise<any>;
}
//# sourceMappingURL=events.controller.d.ts.map