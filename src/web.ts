import express from "express";

import type { Express, Request, Response, NextFunction } from "express";
import { State } from "./state";

const web: Express = express();
web.set("view engine", "pug");

web.on("mount", (app) => {
    web.set("appState", app.get("appState"));
});

web.get("/students/:id", (req: Request, res: Response, next: NextFunction) => {
    if (!req.params["id"]) {
        next();
        return;
    }

    let id = state().getStudent(Number(req.params["id"]));
    if (!id) {
        next();
        return;
    }

    res.render("student", { id: id.id });
});

web.get("/students", (_req, res) => {
    res.render("students");
});

web.get("/events", (_req, res) => {
    res.render("events");
});

web.get("/winners", (_req, res) => {
    res.render("winners");
});

web.all("*", (_req, res) => {
    res.render("404");
});

function state(): State {
    return web.get("appState");
}

export default web;
