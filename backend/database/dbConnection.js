const mongoose=require("mongoose")
require('dotenv').config({ path: './config/config.env' });
const mongoURI=process.env.MONGO_URI
const dbConnection = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
        // to fetch data from mongoDB Atlas existing collection med_items
        let fetched_data = await mongoose.connection.db.collection("med_items")
        // using .find() and giving empty object we fetch all entries 
        //and then convert them to an array using toArray()
        let data = await fetched_data.find({}).toArray();
        // med_items is a variable now that can be accessed from any file
        //it is the array of all the med items in the database
        global.med_items = data;
        let medCategory = await mongoose.connection.db.collection("medCategory")
        let catData = await medCategory.find({}).toArray();
        global.medCategory = catData;


    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
    }
}
module.exports=dbConnection;