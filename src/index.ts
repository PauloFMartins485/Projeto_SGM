import express, { application, Express, Request, Response } from 'express';
import { User } from './types/userModel';

const app: Express = express();

app.get("/hello", (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post("/users", (req: Request, res: Response) => {
  const userRecived = req.body
  console.log(req)
  res.send(userRecived)
});
  
app.listen(8000, () => {
    console.log("Server funcionando!")
});
