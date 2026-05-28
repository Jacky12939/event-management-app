var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from "@nestjs/common";
let EventsService = class EventsService {
    constructor() {
        // Notre fausse base de données locale
        this.events = [];
    }
    async createEvent(data) {
        const newEvent = {
            id: Math.random().toString(36).substring(2, 9), // Génère un faux ID unique
            title: data.title,
            description: data.description,
            date: data.date,
            location: data.location,
            time: data.time,
            capacity: Number(data.capacity),
            image: data.image || null,
            status: "DRAFT", // Statut par défaut
            organizerId: data.organizerId || "fake-id-organisateur",
            createdAt: new Date(),
        };
        this.events.push(newEvent);
        return newEvent;
    }
    async getAllEvents() {
        return this.events;
    }
};
EventsService = __decorate([
    Injectable()
], EventsService);
export { EventsService };
//# sourceMappingURL=events.service.js.map