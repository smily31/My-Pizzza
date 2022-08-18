const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('colors');
const connectDB = require('./config/config')
const Pizza = require('./models/pizzaModel');
const Pizzas = require('./data/pizza-data')

// config dotenv and connection of mongodb
dotenv.config();
connectDB();

// import data
const importData = async () => {
    try {
        await Pizza.deleteMany();
        const sampleData = Pizzas.map(pizza => { return { ...pizza } });
        await Pizza.insertMany(sampleData);
        console.log(`DATA IMPORTED SUCCESSFULLY`.bgCyan.white);
        process.exit();
    } catch (error) {
        console.log(`error : ${error.message}`.bgRed.white);
        process.exit(1);
    }
}

// delete data - modify krenge baad me
const destroyData = () => { };

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}