import { type Request, type Response, type NextFunction } from "express";
import { ApiResponse } from "./response";
import { state, panic } from "./helpers";

export const validate: any = {};

validate.id = (req: Request, res: Response, next: NextFunction) => {
    // parse id
    let id = Number(req.params["id"]);
    if (!id) {
        return res.status(400).json(ApiResponse.error("id must be a number"));
    }
    req.validatedId = id;
    return next();
};

validate.student = (req: Request, res: Response, next: NextFunction) => {
    // assuming id is already validated and parsed
    if (!req.validatedId) {
        return panic();
    }

    let student = state().getStudent(req.validatedId);
    if (!student) {
        return res
            .status(404)
            .json(ApiResponse.error("user with this id not found"));
    }
    req.validatedStudent = student;
    return next();
};

validate.event = (req: Request, res: Response, next: NextFunction) => {
    // assuming id is already validated and parsed
    if (!req.validatedId) {
        return panic();
    }

    let event = state().getEvent(req.validatedId);
    if (!event) {
        return res
            .status(404)
            .json(ApiResponse.error("event with this id not found"));
    }
    req.validatedEvent = event;
    return next();
};

validate.optGradeLvl = (req: Request, res: Response, next: NextFunction) => {
    // check parameter
    if (req.query["grade_lvl"]) {
        let parsedNum = Number(req.query["grade_lvl"]);

        // check for failed parse
        if (!parsedNum) {
            return res
                .status(400)
                .json(ApiResponse.error("grade_lvl must be a number"));
        }

        // check for invalid number
        if (
            parsedNum !== 9 &&
            parsedNum !== 10 &&
            parsedNum !== 11 &&
            parsedNum !== 12
        ) {
            return res
                .status(400)
                .json(ApiResponse.error("grade_lvl must be 9, 10, 11, or 12"));
        }

        req.validatedGradeLvl = parsedNum;
    }
    return next();
};
validate.reqGradeLvl = (req: Request, res: Response, next: NextFunction) => {
    // ensure param exists
    if (!req.query["grade_lvl"]) {
        return res
            .status(400)
            .json(ApiResponse.error("grade_lvl is a required parameter"));
    }

    let parsedNum = Number(req.query["grade_lvl"]);

    // check for failed parse
    if (!parsedNum) {
        return res
            .status(400)
            .json(ApiResponse.error("grade_lvl must be a number"));
    }

    // check for invalid number
    if (
        parsedNum !== 9 &&
        parsedNum !== 10 &&
        parsedNum !== 11 &&
        parsedNum !== 12
    ) {
        return res
            .status(400)
            .json(ApiResponse.error("grade_lvl must be 9, 10, 11, or 12"));
    }

    req.validatedGradeLvl = parsedNum;
    return next();
};

validate.optFirstName = (req: Request, res: Response, next: NextFunction) => {
    if (req.query["first_name"]) {
        if (typeof req.query["first_name"] !== "string") {
            return res
                .status(400)
                .json(ApiResponse.error("first_name must be a string"));
        }

        req.validatedFirstName = req.query["first_name"];
    }
    return next();
};
validate.reqFirstName = (req: Request, res: Response, next: NextFunction) => {
    if (!req.query["first_name"]) {
        return res
            .status(400)
            .json(ApiResponse.error("first_name is a required parameter"));
    }

    if (typeof req.query["first_name"] !== "string") {
        return res
            .status(400)
            .json(ApiResponse.error("first_name must be a string"));
    }

    req.validatedFirstName = req.query["first_name"];
    return next();
};

validate.optLirstName = (req: Request, res: Response, next: NextFunction) => {
    if (req.query["last_name"]) {
        if (typeof req.query["last_name"] !== "string") {
            return res
                .status(400)
                .json(ApiResponse.error("last_name must be a string"));
        }

        req.validatedLastName = req.query["last_name"];
    }
    return next();
};
validate.reqLirstName = (req: Request, res: Response, next: NextFunction) => {
    if (!req.query["last_name"]) {
        return res
            .status(400)
            .json(ApiResponse.error("last_name is a required parameter"));
    }

    if (typeof req.query["last_name"] !== "string") {
        return res
            .status(400)
            .json(ApiResponse.error("last_name must be a string"));
    }

    req.validatedLastName = req.query["last_name"];
    return next();
};

validate.reqEventId = (req: Request, res: Response, next: NextFunction) => {
    if (!req.query["event_id"]) {
        return res
            .status(400)
            .json(ApiResponse.error("event_id is a required parameter"));
    }

    let eventId = Number(req.query["event_id"]);
    if (!eventId) {
        return res
            .status(400)
            .json(ApiResponse.error("event_id must be a number"));
    }

    req.validatedEventId = eventId;
    return next();
};

validate.optName = (req: Request, res: Response, next: NextFunction) => {
    if (req.query["name"]) {
        if (typeof req.query["name"] !== "string") {
            return res
                .status(400)
                .json(ApiResponse.error("name must be a string"));
        }

        req.validatedName = req.query["name"];
    }
    return next();
};
validate.reqName = (req: Request, res: Response, next: NextFunction) => {
    if (!req.query["name"]) {
        return res
            .status(400)
            .json(ApiResponse.error("name is a required parameter"));
    }

    if (typeof req.query["name"] !== "string") {
        return res.status(400).json(ApiResponse.error("name must be a string"));
    }

    req.validatedName = req.query["name"];
    return next();
};

validate.optPoints = (req: Request, res: Response, next: NextFunction) => {
    if (req.query["points"]) {
        let parsedNum = Number(req.query["points"]);

        // check for failed parse
        if (!parsedNum) {
            return res
                .status(400)
                .json(ApiResponse.error("points must be a number"));
        }

        req.validatedPoints = parsedNum;
    }
    return next();
};
validate.reqPoints = (req: Request, res: Response, next: NextFunction) => {
    if (!req.query["points"]) {
        return res
            .status(400)
            .json(ApiResponse.error("points is a required parameter"));
    }

    let parsedNum = Number(req.query["points"]);

    // check for failed parse
    if (!parsedNum) {
        return res
            .status(400)
            .json(ApiResponse.error("points must be a number"));
    }

    req.validatedPoints = parsedNum;
    return next();
};

export default validate;
