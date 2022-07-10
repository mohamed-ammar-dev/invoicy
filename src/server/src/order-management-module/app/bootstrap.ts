import { server } from "../../config/server";
import orderRouter from "./routes/orderRouter";

const app = server.app;

app.use("/order", orderRouter);
