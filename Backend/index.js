const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user.routes");
const expressSession = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const port = 8000;

const uri =
  "mongodb+srv://hari:root@cluster0.cnjpa.mongodb.net/Hotel?retryWrites=true&w=majority";
mongoose
  .connect(uri)
  .then((result) =>
    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    })
  )
  .catch((err) => console.log(err));

app.use("/user", userRoute);
