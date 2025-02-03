// import packages
import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./config/db_connection.js    ";
import authRoutes from "./routes/auth.routes.js"
import postRoutes from "./routes/post.routes.js"


// config dotEnv for using enviourment variables
configDotenv();

// init express app
const app = express();

// setting up middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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


