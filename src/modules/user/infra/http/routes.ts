import UserMapper from '@user/mappers/userMapper';
import UserRepository from '@user/repositories/implementations/TypeORM/UserRepository';
import { createUserController } from '@user/useCases';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  return createUserController.execute(req, res);
});

userRouter.get('/:id', async (req, res) => {
  const userRepo = new UserRepository();

  const user = await userRepo.findById(req.params.id);

  if (user) {
    const persistedUser = UserMapper.toPersistence(user);
    return res.json({ ...persistedUser, password: undefined });
  }

  return res.json(null);
});

export default userRouter;
