import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import { NewData, User } from "../models/userModel";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// GET ROUTES
const userGet = async (request: Request, response: Response) => {
    await prisma.user.findMany().then((user:NewData[]) => {
      response.send(user);
    }).catch((err: any) => {
      response.sendStatus(404);
    });
};

// POST ROUTES
const userPost = async (request: Request, response: Response) => {
    const userRecived = request.body;
    const recivedPassword = userRecived.hashedpass
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(recivedPassword, salt);
    console.log(hashedPassword)
    const data = {
      nome: request.body.nome,
      papel: request.body.papel,
      username: request.body.username,
      hashedpass: hashedPassword,
    }
    await prisma.user.create({data: data}).then((user) => {
      const newData = {
        nome: user.nome,
        papel: user.papel,
        username: user.username,
      }
      response.send(newData);
    }).catch(err => {
        response.sendStatus(400);
    });
};

// DELETE ROUTES
const userDelete = async (request: Request, response: Response) => {
  const userRecived = await prisma.user.findUnique({ 
    where:  {
      id: Number(request.params.id),
    }
  });
  if(userRecived){
    await prisma.user.delete({
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

// PUT ROUTES

// PATCH ROUTES
const userPatch = async (request: Request, response: Response) => {
  const userRecived = await prisma.user.findUnique({ 
    where:  {
      id: Number(request.params.id),
    }
  });
  if(userRecived){
    await prisma.user.update({
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