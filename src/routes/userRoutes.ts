import express from "express";
import userController from "../controllers/userController"; 

export const userRouter = express.Router();

userRouter.get('/', userController.userGet);
userRouter.post('/', userController.userPost);
userRouter.delete('/:id/', userController.userDelete);
userRouter.patch('/:id/', userController.userPatch);