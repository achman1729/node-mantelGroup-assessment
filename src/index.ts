import express from "express";
import http from "http";
import morgan from "morgan";
import routes from './routes/logInfo'

const app = express();

const PORT: any = process.env.PORT ?? 3000;

/** Logging */
app.use(morgan("dev"));
/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express.json());

app.use((req, res, next) => {
  // set the CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  // set the CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  // set the CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET");
    return res.status(200).json({});
  }
  next();
});

app.use('/', routes);

app.use((_req, res, next) => {
  const error = new Error('not found');
  return res.status(404).json({
      message: error.message
  });
});

const httpServer = http.createServer(app);
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
