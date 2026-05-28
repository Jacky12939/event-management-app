import { Router } from 'express';
import { registerToEvent, getMyRegistrations } from '../controllers/registration.controller';
import { authMiddleware } from '..auth.middleware';

const router = Router();

router.post('/events/:eventId/register', authMiddleware, registerToEvent);
router.get('/my-registrations', authMiddleware, getMyRegistrations);

export default router;
