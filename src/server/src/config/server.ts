import { Sequelize } from "sequelize";
import express from "express";
import cors from "cors";
import { createNamespace } from "cls-hooked";
import { config } from "dotenv";
import { resolve } from "path";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { join } from "path";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 20, // Limit each IP to 20 requests per `window` (here, per 1 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  handler: (request, response, next, options) =>
    response.send("too many requests"),
});
console.log(__dirname);

const environment = process.env.NODE_ENV ?? "production";

if (environment == "development")
  config({ path: resolve(__dirname, "../../../dev.env") });

if (environment == "production")
  config({ path: resolve(__dirname, "../../../.env") });

const port = process.env.PORT || 443;
const app = express();

import { DB_CONFIG } from "./dbConfig";
import { COOKIE_SECRET } from "./constants";

const clientPath = join(__dirname, "../../../../client/src");
app.set("view engine", "ejs");
app.set("views", join(clientPath, "views"));

app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "https: data:"],
        "frame-src": ["'self'", "https: data:"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);
app.use(express.static(clientPath));
app.use(limiter);
app.use(cookieParser(COOKIE_SECRET));

const startServer = () => {
  app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
  });
};

const dbConnection = () => {
  const namespace = createNamespace("my-very-own-namespace");
  Sequelize.useCLS(namespace);

  const dbName = DB_CONFIG.dbName;
  const dbUser = DB_CONFIG.dbUser;
  const dbPassword = DB_CONFIG.dbPassword;
  const dbPort: any = DB_CONFIG.dbPort;
  const dbHost = DB_CONFIG.dbHost;
  const dialect: any = DB_CONFIG.dialect;

  const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect,
    host: dbHost,
    port: dbPort,
    logging: false,
    pool: {
      max: 20,
      min: 0,
      acquire: 100000,
    },
    //FOR HEROUKU DB ERROR
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });

  try {
    sequelize.authenticate();
    sequelize.sync();

    console.log("Database connected...");
  } catch (error) {
    console.log("<----------- CAN NOT CONNECT TO THE DB ---------->");

    console.log(error);

    process.exit(1);
  }

  return sequelize;
};

export const server = {
  dataBaseConnection: dbConnection(),
  startServer,
  app,
};
