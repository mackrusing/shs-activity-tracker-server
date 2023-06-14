import express, { type Express } from "express";
import api from "./api";
import State from "./state";

// app instance
const app: Express = express();

// app variables
app.set("PORT", 8000); // process.env[PORT]

// managed state
const appState = new State();
app.set("appState", appState);

// routes
app.use(api);

// make public
app.listen(app.get("PORT"), () => {
    console.log(`listening on ${app.get("PORT")}`);
});
