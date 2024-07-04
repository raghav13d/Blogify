import mongoose from "mongoose";

export const connectDb=async()=>{
    await mongoose.connect('mongodb+srv://khandelwalraghavd13:JSPf6Nyff1tQdaOk@raghavcluster.i918idu.mongodb.net/?retryWrites=true&w=majority&appName=raghavCluster').then(()=>console.log('db connected'));
}
