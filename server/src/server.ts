
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";

// Create a new express application instance
const app = express();

// Call midlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

//Set all routes from routes folder
app.use("/", routes);

app.listen(3001, () => {
  console.log("Server started on port 3001!");
});

