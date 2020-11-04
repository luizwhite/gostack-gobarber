import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const usersRouter = Router();

// http://localhost:3333/sessions

usersRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({ email, password });

    return res.json({ user: { ...user, password: undefined }, token });
  } catch (err) {
    return res.status(err.statusCode).json({ error: err.message });
  }
});

export default usersRouter;
