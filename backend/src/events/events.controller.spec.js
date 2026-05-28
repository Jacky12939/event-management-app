import { Test } from '@nestjs/testing';
import { EventsController } from './events.controller';
describe('EventsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [EventsController],
        }).compile();
        controller = module.get(EventsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=events.controller.spec.js.map