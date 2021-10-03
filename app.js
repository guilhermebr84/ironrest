require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db.config")();

const app = express();

const API_VERSION = 1;

app.use(express.json());
// Não esquecer de criar variável de ambiente com o endereço do seu app React (local ou deployado no Netlify)
app.use(cors({ origin: process.env.REACT_APP_URL }));

// app.use((err, req, res, next) => {
//   if (err) {
//     return res.status(500).json({
//       msg: "Server internal error.",
//       err: err,
//     });
//   }

//   return next()
// })

const userRouter = require("./routes/user.routes");
app.use(`/api`, userRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);