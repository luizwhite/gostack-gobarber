import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const usersRouter = Router();
const sessionsController = new SessionsController();

// http://localhost:3333/sessions

usersRouter.post('/', sessionsController.create);

export default usersRouter;
