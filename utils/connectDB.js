import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log(`Connected to database`);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
  };
  
  //call function to connect to database
  connectDB();

export default connectDB