import express from "express";
import cors from "cors";//cors: Imports Cross-Origin Resource Sharing middleware. It allows your app to accept requests from different origins (domains).
import cookieParser from "cookie-parser";//Imports a middleware that parses cookies attached to client requests.
import { ApiResponse } from "./utils/ApiResponse.js"; // Import your ApiResponse utility

const app = express();//express app

app.use(cors({
    origin: process.env.CORS_ORIGIN, // Accept requests from a particular URL stored in the CORS_ORIGIN in .env file
    credentials: true // Allow credentials (cookies, authorization headers, etc.) to be sent
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serves static files from the "public" directory
app.use(cookieParser()); // Parses cookies attached to the client request object

// Routes import
import stockRouter from './routes/stock.routes.js';
import userRouter from './routes/user.router.js';
import farmerRouter from './routes/farmer.routes.js';
import OrderRouter from './routes/order.routes.js';
import deliverypartnerRouter from './routes/deliverypartner.routes.js'
import cartRouter from './routes/cart.routes.js'
import CSARouter from "./routes/subscriptionCSA.routes.js";

// Routes declaration
app.use("/api/v1/stocks", stockRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/farmers", farmerRouter);
app.use("/api/v1/orders", OrderRouter);
app.use("/api/v1/deliverypartners", deliverypartnerRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/subscriptions" , CSARouter);

// Global error-handling middleware (add this after all routes)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging purposes
    
    const statusCode = err.statusCode || 500; // Default to 500 if no status code is set
    const message = err.message || "Internal Server Error"; // Default to a generic message if none is set
    
    res.status(statusCode).json(new ApiResponse(statusCode, null, message)); // Send a JSON response with the error
});

export { app };
/*import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,//will accept requests from aa particular url stored in the CORS_ORIGIN in .env file
    credentials : true//see cors documentation to see from where we need the credentials
}))

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))//stores all info in a public storage
app.use(cookieParser())//to encode and decode cookies 

//routes import
import stockRouter from './routes/stock.routes.js'
import userRouter from './routes/user.router.js'
import farmerRouter from './routes/farmer.routes.js'
import OrderRouter from './routes/order.routes.js'

//routes declaration
app.use("/api/v1/stocks",stockRouter)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/farmers",farmerRouter)
app.use("/api/v1/orders",OrderRouter)

export { app }




//to accept data from json we need to use a json middleware that will limit the incoming json data
//app.use(express.json({limit: " 16kb "}))//to get data of a specific limit 
//app.use(express.urlencoded({extended:true,limit:"16kb"}))//url itself is encoded hence we use a middleware to parse the url 
*/