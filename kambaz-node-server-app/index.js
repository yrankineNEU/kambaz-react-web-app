import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import Lab5 from "./Lab5/index.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:5173",
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));
app.use(express.json());

AssignmentRoutes(app);
CourseRoutes(app);
UserRoutes(app);
ModuleRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000);
