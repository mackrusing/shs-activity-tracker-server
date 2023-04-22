import express from "express";
import { State } from "./state";
import { api } from "./api";
import web from "./web";
import type { Express } from "express";

// app instance
const app: Express = express();

// app variables
app.set("PORT", 8000); // process.env[PORT]

// managed state
const appState = new State();
app.set("appState", appState);

// middleware middleware
app.use("/resources", express.static("./resources"));
app.use("/api", api);
app.use("/", web);

// make public
app.listen(app.get("PORT"), () => {
    console.log(`listening on ${app.get("PORT")}`);
});
