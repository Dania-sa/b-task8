const express = require("express")
const app = express()
const routes = require("./routes")

app.use("/api", routes)

app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || "internal server error";
  
    return res.status(status).json({ message, stack: err.stack });
  });
  mongoose.set("strictQuery", false);
  
  const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB_CONNECTION_STRING);
      console.log("monogdb connected");
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  };


const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`The server is running on port ${port}`);
})