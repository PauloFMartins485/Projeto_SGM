import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// GET ROUTES

// POST ROUTES

const loginPost = async (request: Request, response: Response) => {
    const userRecived = request.body;
    const recivedPassword = userRecived.password;

    const user = await prisma.user.findFirst({ where: {username: userRecived.username}});
    
    if (user) {
        const isValid = bcrypt.compareSync(userRecived.password, user.hashedpass);
        response.json( `O seu login foi realizado com ${isValid?"sucesso":"falha"}`).send()
    }
}

// DELETE ROUTES

// PUT ROUTES

// PATCH ROUTES

// export default {userGet, userPost, userDelete, userPatch};

export default {loginPost}