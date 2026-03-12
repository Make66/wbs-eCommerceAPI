import { Router } from 'express';
import { getUsers, createUser, getUserById, updateUser, deleteUser } from '#controller';
import { validateBodyZod } from '#middleware';
import { UserInputSchema } from '#schema';
import { userExists } from '#middleware';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.post('/', validateBodyZod(UserInputSchema), createUser);
userRouter.get('/:id', userExists, getUserById);
userRouter.put('/:id', validateBodyZod(UserInputSchema), userExists, updateUser);
userRouter.delete('/:id', userExists, deleteUser);

export default userRouter;
