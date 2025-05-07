const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const clientsRouter = require("./routes/clients");
const companiesRouter = require("./routes/companies");
const usersRouter = require("./routes/users");
const petsRouter = require("./routes/pets");
const visitsRouter = require("./routes/visits");
const articlesRouter = require("./routes/articles");
const paymentsRouter = require("./routes/payments");
const vaccinationsRouter = require("./routes/vaccinations");
const authRouter = require("./routes/auth");
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/clients", clientsRouter);
app.use("/companies", companiesRouter);
app.use("/users", usersRouter);
app.use("/pets", petsRouter);
app.use("/visits", visitsRouter);
app.use("/articles", articlesRouter);
app.use("/payments", paymentsRouter);
app.use("/vaccinations", vaccinationsRouter);
app.use("/auth", authRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`TOBOAPI listening at http://localhost:${port}`);
});
