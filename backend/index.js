import express from 'express' 
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { connectDb } from './src/db/connectDb.js';
import { router } from './src/routes/user.routes.js';
import { contactRouter } from './src/routes/contact.routes.js';

const app = express();

app.use(cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

connectDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server started at port ${process.env.PORT},`);
    })
}).catch((err) => console.log("Error connecting database", err));

app.use("/", router)
app.use("/dashboard", contactRouter)