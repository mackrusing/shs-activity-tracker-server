import express, { type Express, type Request, type Response, type NextFunction } from "express";
import { ApiResponse } from "./api/response";
import { GradeLvl, JsonEvent, JsonStudent } from "./types";
import validate from "./api/validation";
import { state, panic } from "./api/helpers";

declare module "express-serve-static-core" {
    interface Request {
        validatedId?: number;
        validatedStudent?: JsonStudent;
        validatedEvent?: JsonEvent;

        validatedFirstName?: string;
        validatedLastName?: string;
        validatedGradeLvl?: GradeLvl;

        validatedEventId?: number;

        validatedName?: string;
        validatedPoints?: number;
    }
}

function authAdmin(req: Request, res: Response, next: NextFunction) {
    const b64 = btoa("admin:pass");
    if (req.headers.authorization !== `Basic ${b64}`) {
        return res.status(401).send(ApiResponse.error("Authentication required"));
    }
    return next();
}

const api: Express = express();
export default api;

api.on("mount", (app) => {
    api.set("appState", app.get("appState"));
});

// middleware
api.use("/", express.urlencoded());
api.use("/", (_req: Request, res: Response, next: NextFunction) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Authorization");
    res.set("Cache-Control", "no-cache");
    next();
})

//
// students endpoints
//

api.route("/students.json")
    .get(
        validate.optFirstName,
        validate.optLirstName,
        validate.optGradeLvl,
        (req, res) => {
            return res
                .status(200)
                .json(
                    ApiResponse.ok(
                        state().getStudentsArr(
                            req.validatedFirstName,
                            req.validatedLastName,
                            req.validatedGradeLvl
                        )
                    )
                );
        }
    )
    .post(
        authAdmin,
        validate.reqFirstName,
        validate.reqLirstName,
        validate.reqGradeLvl,
        (req, res) => {
            if (
                !req.validatedFirstName ||
                !req.validatedLastName ||
                !req.validatedGradeLvl
            ) {
                return panic();
            }

            state().addStudent(
                req.validatedFirstName,
                req.validatedLastName,
                req.validatedGradeLvl
            );
            return res.status(200).json(ApiResponse.ok(null));
        }
    );

api.route("/students/:id.json")
    .all(validate.id)
    .get(validate.student, (req, res) => {
        if (!req.validatedStudent) {
            return panic();
        }
        return res.status(200).json(ApiResponse.ok(req.validatedStudent));
    })
    .put(
        authAdmin,
        validate.reqFirstName,
        validate.reqLirstName,
        validate.reqGradeLvl,
        (req, res) => {
            if (
                !req.validatedId ||
                !req.validatedFirstName ||
                !req.validatedLastName ||
                !req.validatedGradeLvl
            ) {
                return panic();
            }

            state().replaceStudent(
                req.validatedId,
                req.validatedFirstName,
                req.validatedLastName,
                req.validatedGradeLvl
            );
            return res.status(200).json(ApiResponse.ok(null));
        }
    )
    .patch(
        authAdmin,
        validate.student,
        validate.optFirstName,
        validate.optLirstName,
        validate.optGradeLvl,
        (req, res) => {
            if (!req.validatedStudent) {
                return panic();
            }

            state().updateStudent(
                req.validatedStudent,
                req.validatedFirstName,
                req.validatedLastName,
                req.validatedGradeLvl
            );
            return res.status(200).json(ApiResponse.ok(null));
        }
    )
    .delete(
        authAdmin,
        validate.student,
        (req, res) => {
            if (!req.validatedId) {
                return panic();
            }

            state().deleteStudent(req.validatedId);
            return res.status(200).json(ApiResponse.ok(null));
        }
    );

api.route("/students/:id/completed_events.json")
    .all(validate.id, validate.student)
    .post(
        authAdmin,
        validate.reqEventId,
        (req, res) => {
            if (!req.validatedStudent || !req.validatedEventId) {
                return panic();
            }

            const success = state().addEventIdToStudent(
                req.validatedStudent,
                req.validatedEventId
            );
            if (!success) {
                return res
                    .status(400)
                    .json(
                        ApiResponse.error(
                            "event_id must exist and not already be added"
                        )
                    );
            }

            return res.status(200).json(ApiResponse.ok(null));
        }
    )
    .patch(
        authAdmin,
        validate.reqEventId,
        (req, res) => {
            if (!req.validatedStudent || !req.validatedEventId) {
                return panic();
            }

            const success = state().removeEventIdFromStudent(
                req.validatedStudent,
                req.validatedEventId
            );
            if (!success) {
                return res
                    .status(400)
                    .json(
                        ApiResponse.error(
                            "event_id must be in the student's completed events"
                        )
                    );
            }

            return res.status(200).json(ApiResponse.ok(null));
        }
    );

//
// events endpoints
//

api.route("/events.json")
    .options(
        (_req: Request, res: Response) => {
            return res.status(200).send();
        }
    )
    .get(
        validate.optName,
        validate.optPoints,
        (req: Request, res: Response) => {
            return res
                .status(200)
                .json(
                    ApiResponse.ok(
                        state().getEventsArr(
                            req.validatedName,
                            req.validatedPoints
                        )
                    )
                );
        }
    )
    .post(
        authAdmin,
        validate.reqName,
        validate.reqPoints,
        (req: Request, res: Response) => {
            if (!req.validatedName || !req.validatedPoints) {
                return panic();
            }

            state().addEvent(req.validatedName, req.validatedPoints);
            return res.status(200).json(ApiResponse.ok(null));
        }
    );

api.route("/events/:id.json")
    .all(validate.id)
    .get(validate.event, (req: Request, res: Response) => {
        if (!req.validatedEvent) {
            return panic();
        }
        return res.status(200).json(ApiResponse.ok(req.validatedEvent));
    })
    .put(
        authAdmin,
        validate.reqName,
        validate.reqPoints,
        (req: Request, res: Response) => {
            if (
                !req.validatedId ||
                !req.validatedName ||
                !req.validatedPoints
            ) {
                return panic();
            }

            state().replaceEvent(
                req.validatedId,
                req.validatedName,
                req.validatedPoints
            );
            return res.status(200).json(ApiResponse.ok(null));
        }
    )
    .patch(
        authAdmin,
        validate.event,
        validate.optName,
        validate.optPoints,
        (req: Request, res: Response) => {
            if (!req.validatedEvent) {
                return panic();
            }

            state().updateEvent(
                req.validatedEvent,
                req.validatedName,
                req.validatedPoints
            );
            return res.status(200).json(ApiResponse.ok(null));
        }
    )
    .delete(
        authAdmin,
        validate.event,
        (req: Request, res: Response) => {
            if (!req.validatedId) {
                return panic();
            }

            state().deleteEvent(req.validatedId);
            return res.status(200).json(ApiResponse.ok(null));
        }
    );


api.put("/utils/reset_data",
    authAdmin,
    (_req, res: Response) => {
        state().resetData();
        return res.status(200).json(ApiResponse.ok(null));
    }
);
