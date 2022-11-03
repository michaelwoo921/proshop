import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import products from './products.js';
import users from './users.js';
import connectDB from '../db.js';

dotenv.config();
console.log(process.argv);

connectDB();

const importData = async () => {
    try{
       
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0];


        const productsData = products.map(product => {
            delete product._id;
            product.user = adminUser._id;
            return product;
        })
        await Product.insertMany(productsData);


        console.log('successfully imported Data');
        process.exit();

        
    }catch(err){
        console.log('failed to import Data: ', err.message);
        process.exit(1);
    }
}

const removeData = async () => {
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('successfully deleted Data');
        process.exit();
    }catch(err){
        console.log('failed to delete data', err.message);
        process.exit(1);
    }
}

if(process.argv[2]==='--delete'){
    removeData();
}else {
   importData();
}



