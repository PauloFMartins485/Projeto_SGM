import express, { application, Express, Request, Response } from 'express';

const app: Express = express();

app.get("/hello", (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });

app.listen(8000, () => {
    console.log("Server funcionando!")
});