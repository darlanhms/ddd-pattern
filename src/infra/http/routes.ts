import userRouter from '@user/infra/http/routes';
import { Router } from 'express';

const router = Router();

router.use('/users', userRouter);

export default router;
