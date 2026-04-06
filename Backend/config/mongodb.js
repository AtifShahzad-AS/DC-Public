import mongoose from "mongoose";
const connectdb=async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log('db connected')
    })
//    await mongoose.connect(`${process.env.MONGODB_URI}/fyp`)
   await mongoose.connect(`${process.env.LOCAL_MONGO_URI}/fyp`)
}
export default connectdb

// both

// import mongoose from "mongoose";

// const connectdb = async () => {
//   mongoose.connection.on("connected", () => {
//     console.log("✅ DB connected");
//   });

//   try {
//     // 🔹 Try Atlas first
//     console.log("🌐 Trying to connect to ATLAS...");
//     await mongoose.connect(`${process.env.MONGODB_URI}/fyp`, {
//       serverSelectionTimeoutMS: 5000, // fail fast (5 sec)
//     });

//     console.log("🚀 Connected to ATLAS");

//   } catch (atlasError) {
//     console.log("❌ Atlas failed:", atlasError.message);

//     try {
//       // 🔹 Fallback to Local
//       console.log("💻 Switching to LOCAL MongoDB...");
//       await mongoose.connect(`${process.env.LOCAL_MONGO_URI}/fyp`);

//       console.log("✅ Connected to LOCAL MongoDB");

//     } catch (localError) {
//       console.log("❌ Local DB also failed:", localError.message);
//       process.exit(1); // stop app if both fail
//     }
//   }
// };

// export default connectdb;

// only local

// import mongoose from "mongoose";

// const connectdb = async () => {
//   try {
//     const uri = `${process.env.LOCAL_MONGO_URI}/fyp`;

//     console.log("💻 Connecting to LOCAL MongoDB...");

//     await mongoose.connect(uri);

//     mongoose.connection.on("connected", () => {
//       console.log("✅ Local DB connected");
//     });

//   } catch (error) {
//     console.log("❌ DB connection error:", error.message);
//   }
// };

// export default connectdb;