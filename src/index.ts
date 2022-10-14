import express, {Express} from 'express';
import {userRouter} from './routes/userRoutes';

const app: Express = express();
app.use(express.json())
app.use("/users", userRouter)

app.listen(8000, () => {
    console.log("Server funcionando!");
});
