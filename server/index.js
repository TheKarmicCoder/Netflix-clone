const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const morgan = require('morgan');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const adminRoute = require('./routes/admin');
const searchRoute = require("./routes/search")
const path = require("path")




dotenv.config();


app.use(cors({ origin: "netflix-clone-frontend-psi.vercel.app" })); 
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'client', 'build', )));


mongoose.connect(process.env.MONGO_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(() => console.log("DB Connection Successful"))
.catch((err) => console.log( err))


app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/search", searchRoute);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });

app.listen(8800, () => {
    console.log('server is running');
});

