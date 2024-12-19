// import mongoose from "mongoose";

// import { DB_NAME_CSAPlans,
//     DB_NAME_Stocks, 
//     DB_NAME_Customer ,
//     DB_NAME_Farmer,
//     DB_NAME_Order,
//     DB_NAME_Deliverypartner,
//     DB_NAME_Cart } from "../constants.js";

// const connectDB = async() => {
//     // let connectionInstanceCSAPlans, connectionInstanceCustomer, connectionInstanceFarmer, connectionInstanceOrder, connectionInstanceDeliveryPartner, connectionInstanceCart, connectionInstanceStocks;

//     // try{
//     //     //CSA plans
//     //     const connectionInstanceCSAPlans = await mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME_CSAPlans}`);
//     //     console.log(`\nCSA_plans databse connected!! DB Host : ${connectionInstanceCSAPlans.connection.host}`);
//     //     //console.log(`\nCSA_plans databse connected!!`);
//     // }catch(error){
//     //     console.log(`Mongodb connection FAILED for CSA Plans database: ${error}`);
//     //     process.exit(1);
//     // }


//     try{
//         //Customer database
//         const connectionInstanceCustomer = await mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME_Customer}`);
//         console.log(`\nCustomer Database connected!! `);
//     }catch(error){
//         console.log(`Mongodb connection FAILED for Customer database: ${error} `);
//         process.exit(1);
//     } 


//     try{
//         //Farmer database
//         const connectionInstanceFarmer = await mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME_Farmer}`);
//         console.log(`\nFarmer Database connected!! `);
//     }catch(error){
//         console.log(`Mongodb connection FAILED for Farmer database: ${error}`);
//         process.exit(1);
//     }


//     try{
//         //order database
//         const connectionInstanceOrder = await mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME_Order}`);
//         console.log(`\nDelivery Partner Database connected!! `);
//     }catch(error){
//         console.log(`Mongodb connection FAILED for Order database: ${error}`);
//         process.exit(1);
//     }


//     try{
//         //delivery partner database
//         const connectionInstanceDeliveryPartner = await mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME_Deliverypartner}`);
//         console.log(`\nDelivery Partner Database connected!! `);
//     }catch(error){
//         console.log(`Mongodb connection FAILED for Delivery Partner database: ${error}`);
//         process.exit(1);
//     }

 
//     try{
//         //cart database
//         const connectionInstanceCart = await mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME_Cart}`);
//         console.log(`\nCart Partner Database connected!! `);
//     }catch(error){
//         console.log(`Mongodb connection FAILED for Cart database: ${error}`);
//         process.exit(1);
//     }
//     try{
//         //Stocks database
//         const connectionInstanceStocks = await mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME_Stocks}`);
//         console.log(`\nStocks Database connected!!`);
//     }catch(error){
//         console.log(`Mongodb connection FAILED for Stock database: ${error}`);
//         process.exit(1);
//     }

//     // Optionally return connections if needed for further use
//     return { 
//         //connectionInstanceCSAPlans,
//         connectionInstanceStocks, 
//         connectionInstanceCustomer,
//         connectionInstanceFarmer,
//         connectionInstanceOrder,
//         connectionInstanceDeliveryPartner,
//         connectionInstanceCart
//     };
// }

// export default connectDB;
import mongoose from "mongoose";
import { DB_NAME_Stocks, DB_NAME_Customer ,DB_NAME_Farmer,DB_NAME_Order,DB_NAME_Deliverypartner,DB_NAME_Cart, DB_NAME_CSAPlans} from "../constants.js";

const connectDB = async () => {
    try {
        // Connecting to the Stocks database
        const connectionInstanceStocks = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME_Stocks}`);
        console.log(`\nStocks Database connected!! DB HOST: ${connectionInstanceStocks.connection.host}`);

        // Create a new connection for the Customer database
        const connectionInstanceCustomer = mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME_Customer}`);
        console.log(`\nCustomer Database connected!! `);

        // Create a new connection for the Farmer database
        const connectionInstanceFarmer = mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME_Farmer}`);
        console.log(`\nFarmer Database connected!! `);

        // Create a new connection for the order database
        const connectionInstanceOrder = mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME_Order}`);
        console.log(`\nOrder Database connected!! `);
        
        // Create a new connection for the delivery partner database
        const connectionInstanceDeliveryPartner = mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME_Deliverypartner}`);
        console.log(`\nDelivery Partner Database connected!! `);

        // Create a new connection for the cart database
        const connectionInstanceCart = mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME_Cart}`);
        console.log(`\nCart Partner Database connected!! `);
        
        // Create a new connection for the csa database
        const connectionInstanceCSAPlans = mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME_CSAPlans}`);
        console.log(`\nCsa plans Database connected!!`);

        // Optionally return connections if needed for further use
        return { connectionInstanceStocks, connectionInstanceCustomer,connectionInstanceFarmer,connectionInstanceOrder,connectionInstanceDeliveryPartner,connectionInstanceCart , connectionInstanceCSAPlans};
        
    } catch (error) {
        console.log("MONGODB connection FAILED for one or more databases", error);
        process.exit(1);
    }
};

export default connectDB;
