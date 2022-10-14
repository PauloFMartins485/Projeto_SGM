import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import { User } from "../models/userModel";

const prisma = new PrismaClient();

// GET ROUTES
const userGet = async (request: Request, response: Response) => {
    await prisma.user.findMany().then((user:User[]) => {
      console.log(user);
      response.send(user);
    }).catch((err: any) => {
      console.log(err);
      response.sendStatus(404);
    });
};

// POST ROUTES
const userPost = async (request: Request, response: Response) => {
    const userRecived = request.body;
    await prisma.user.create({data: userRecived}).then((user) => {
        response.send(user);
    }).catch(err => {
        response.sendStatus(400);
    });
};

// DELETE ROUTES
const userDelete = async (request: Request, response: Response) => {
  console.log(request.params.id);
  const userRecived = await prisma.user.findUnique({ 
    where:  {
      id: Number(request.params.id),
    }
  });
  console.log(userRecived);
  if(userRecived){
    const user = await prisma.user.delete({
      where: {
        id: Number(request.params.id),
      }
    }).then((user) => {
      response.sendStatus(204); 
    });
  }else{
    response.sendStatus(404);
  };
};

// PATCH ROUTES
const userPatch = async (request: Request, response: Response) => {
  console.log(request.params.id);
  const userRecived = await prisma.user.findUnique({ 
    where:  {
      id: Number(request.params.id),
    }
  });
  console.log(userRecived);
  if(userRecived){
    const user = await prisma.user.update({
      where: {
        id: Number(request.params.id),
      },
      data: {
        nome: request.body.nome,
        papel: request.body.papel,
        username: request.body.username,
        hashedpass: request.body.hashedpass,
      },
    });
    response.sendStatus(200);
  }else{
    response.sendStatus(404);
  };
};

export default {userGet, userPost, userDelete, userPatch};