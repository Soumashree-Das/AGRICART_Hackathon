import dotenv from "dotenv";
import connectDB from "./db/index.js"
import { app } from "./app.js";

// Load environment variables from .env file
dotenv.config({
    path: './.env', // Ensure this path is correct relative to your project structure
});

connectDB()
.then( () => {
    const port = process.env.PORT || 3026;
    app.listen(port||3026, () => {
        console.log(` ⚙️ Server is running at http://localhost:${port} `)
    });
})
.catch( (err) => {
    console.error("Mongodb connection failed !! " ,err);
    process.exit(1);
});