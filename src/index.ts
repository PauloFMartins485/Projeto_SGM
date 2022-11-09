import express, {Express} from 'express';
import {userRouter} from './routes/userRoutes';
import {loginRouter} from './routes/loginRoutes';

const app: Express = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/login", loginRouter);

app.listen(8000, () => {
    console.log("Server funcionando!");
});
