const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require("mongoose");
// const cors = require("cors");
const productRoute = require("./routes/productRoute.js");
require('dotenv/config');



//  ========== env for app start ========
const port =  process.env.PORT;
const api = process.env.API_URL;
const connectionString = process.env.CONNECTION_STRING;
//  ========== env for app end ========



//  ============== mongodb connection starts ===============
mongoose.connect(connectionString,(err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Mongo DB Connected Successfully");
    }
}
);
//  ============== mongodb connection ends ===============


// ========== middleware starts ===========
app.use(express.json());  //bodyParser.json() or express.json() --> both are use for data converter into json format
// app.use(cors());
app.use(morgan('tiny'));
app.use(`${api}/products`, productRoute);
// =========== middleware ends ============


app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})
