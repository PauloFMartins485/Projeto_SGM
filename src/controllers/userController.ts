import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import { User } from "../models/userModel";

const prisma = new PrismaClient();

const userGet = async (req: Request, res: Response) => {
    await prisma.user.findMany().then((user:User[]) => {
      console.log(user);
      res.send(user);
    }).catch((err: any) => {
      console.log(err);
      res.sendStatus(404);
    });
};

const userPost = async (req: Request, res: Response) => {
    const userRecived = req.body;
    console.log(req);
    await prisma.user.create({data: userRecived}).then((user) => {
        res.send(user);
    }).catch(err => {
        res.sendStatus(400);
    });
};

// const userDelete
// const userUpdate

export default {userGet, userPost};