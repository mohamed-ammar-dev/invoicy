import { server } from "./src/config/server";

server.startServer();

import "./src/user-management-module/app/bootstrap";
import "./src/order-management-module/app/bootstrap";
import "./src/schedule-module/bootstrap";
import "./src/error-module/app/routes/errorHandler";
