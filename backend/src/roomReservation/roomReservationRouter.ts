import { Router } from 'express';
import { createRoomReservationController } from './roomReservationController';

const router = Router();

// POST /reservations
router.post('/', createRoomReservationController);

export default router;
