// import packages
import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db_connection.js    ";
import authRoutes from "./routes/auth.routes.js"
import postRoutes from "./routes/post.routes.js"
import cors from "cors";
import cookieParser from "cookie-parser";

// config dotEnv for using enviourment variables
config();

// init express app
const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};


// setting up middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions));
app.use(cookieParser());
// connect to database
connectDB();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res)=>{
    res.send("Hello")
})

app.use("/api/auth", authRoutes)
app.use("/api/post", postRoutes)



app.listen(PORT, (err)=>{
    if(err){
        console.warn(`Error while running server :: ${err}`);
    }else{
        console.log(`Server started ✅`);        
    }
})


