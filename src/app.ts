import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authentication from "./routes/auth";
import stripeRoute from "./routes/stripe";
import alienationRoute from "./routes/alienation";

const isProduction = process.env.NODE_ENV === "production";

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Secure Cors
const origin = {
  origin: isProduction
    ? ["https://www.app.rafartmusic.com/", "https://app.rafartmusic.com"]
    : "*",
};
app.use(cors(origin));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// routes
app.use("/auth", authentication);
app.use("/stripe", stripeRoute);
app.use("/alienation", alienationRoute);

export default app;
