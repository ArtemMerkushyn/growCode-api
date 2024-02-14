import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

import authRoute from './routes/auth.js';
import postsRoute from './routes/posts.js';
import commentsRoute from './routes/comments.js';
import queriesRoute from "./routes/queries.js";
import repliesRoute from './routes/replies.js';
import portfoliosRoute from './routes/portfolios.js';

const app = express();

//constants
const PORT = 8080;
export const secred = 'secredtoken';

//middleware
app.use(cors()); //для того щоб можно було відправляти з різних ip, запроси до нашого серверу
app.use(express.json()); //для  того щоб express розумів що дані з фронту будуть приходити у форматі json

//routes http://localhost:8080/
app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);
app.use('/api/comments/', commentsRoute);
app.use('/api/queries', queriesRoute);
app.use('/api/replies', repliesRoute);
app.use('/api/portfolios', portfoliosRoute);


async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://test:testpassword@cluster0.p68m5mc.mongodb.net/`
        );
        app.listen(PORT, () => {
            console.log(`server started on: http://localhost:${PORT}`)
        });
    } catch (error) {
        console.log(error);
    }
}
start();