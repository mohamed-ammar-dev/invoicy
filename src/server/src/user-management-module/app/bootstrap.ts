import { server } from "../../config/server";
import { userAuthRouter } from "./routes/auth/userAuthRouter";

const app = server.app;

app.use("/auth/user", userAuthRouter);
