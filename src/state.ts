import fs from "fs";
import type { JsonStudent, JsonEvent, GradeLvl } from "./types";

export default class State {
    // instance vars
    private studentsArr: JsonStudent[];
    private eventsArr: JsonEvent[];

    private lastStudentId: number;
    private lastEventId: number;

    //
    // student methods
    //

    // getter methods
    getStudentsArr(
        first_name?: string,
        last_name?: string,
        grade_lvl?: GradeLvl
    ) {
        let arr = this.studentsArr;

        if (grade_lvl) {
            arr = arr.filter((student) => {
                return student.grade_lvl === grade_lvl;
            });
        }

        if (first_name) {
            arr = arr.filter((student) => {
                return student.first_name === first_name;
            });
        }

        if (last_name) {
            arr = arr.filter((student) => {
                return student.last_name === last_name;
            });
        }

        return arr;
    }
    getStudent(id: number) {
        for (const student of this.studentsArr) {
            if (student.id === id) {
                return student;
            }
        }
        return undefined;
    }

    // adder methods
    addStudent(first_name: string, last_name: string, grade_lvl: GradeLvl) {
        this.studentsArr.push({
            id: this.nextStudentId(),
            first_name: first_name,
            last_name: last_name,
            grade_lvl: grade_lvl,
            completed_events: [],
        });
        this.writeData();
    }

    // updater methods
    updateStudent(
        student: JsonStudent,
        first_name?: string,
        last_name?: string,
        grade_lvl?: GradeLvl
    ) {
        if (first_name) {
            student.first_name = first_name;
        }
        if (last_name) {
            student.last_name = last_name;
        }
        if (grade_lvl) {
            student.grade_lvl = grade_lvl;
        }
        this.writeData();
    }

    // replacer methods
    replaceStudent(
        id: number,
        first_name: string,
        last_name: string,
        grade_lvl: GradeLvl
    ) {
        this.deleteStudent(id);
        this.studentsArr.push({
            id: id,
            first_name: first_name,
            last_name: last_name,
            grade_lvl: grade_lvl,
            completed_events: [],
        });
        this.writeData();
    }

    // deleter methods
    deleteStudent(id: number): boolean {
        for (let i = 0; i < this.studentsArr.length; i++) {
            if (this.studentsArr[i]?.id === id) {
                this.studentsArr.splice(i, 1);
                this.writeData();
                return true;
            }
        }
        return false;
    }

    // completed event methods
    addEventIdToStudent(student: JsonStudent, event_id: number): boolean {
        // check for duplicate
        for (const existingId of student.completed_events) {
            if (existingId === event_id) {
                return false;
            }
        }

        // check event exists
        for (const event of this.eventsArr) {
            if (event.id === event_id) {
                student.completed_events.push(event_id);
                this.writeData();
                return true;
            }
        }
        return false;
    }
    removeEventIdFromStudent(student: JsonStudent, event_id: number): boolean {
        for (let i = 0; i < student.completed_events.length; i++) {
            if (student.completed_events[i] === event_id) {
                student.completed_events.splice(i, 1);
                this.writeData();
                return true;
            }
        }
        return false;
    }

    //
    // event methods
    //

    // getter methods
    getEventsArr(name?: string, points?: number) {
        let arr = this.eventsArr;

        if (name) {
            arr = arr.filter((event) => {
                return event.name === name;
            });
        }

        if (points) {
            arr = arr.filter((event) => {
                return event.points === points;
            });
        }

        return arr;
    }
    getEvent(id: number) {
        for (const event of this.eventsArr) {
            if (event.id === id) {
                return event;
            }
        }
        return undefined;
    }

    // adder methods
    addEvent(name: string, points: number) {
        this.eventsArr.push({
            id: this.nextEventId(),
            name: name,
            points: points,
        });
        this.writeData();
    }

    // replacer methods
    replaceEvent(id: number, name: string, points: number) {
        this.deleteEvent(id);
        this.eventsArr.push({
            id: id,
            name: name,
            points: points,
        });
        this.writeData();
    }

    // updater methods
    updateEvent(event: JsonEvent, name?: string, points?: number) {
        if (name) {
            event.name = name;
        }
        if (points) {
            event.points = points;
        }
        this.writeData();
    }

    // deleter methods
    deleteEvent(id: number): boolean {
        for (let i = 0; i < this.eventsArr.length; i++) {
            if (this.eventsArr[i]?.id === id) {
                this.eventsArr.splice(i, 1);
                this.writeData();
                return true;
            }
        }
        return false;
    }

    //
    // helper methods
    //

    // interacting with json data
    private readData() {
        this.studentsArr = JSON.parse(
            fs.readFileSync("data/students.json").toString()
        );
        this.eventsArr = JSON.parse(
            fs.readFileSync("data/events.json").toString()
        );
    }
    private writeData() {
        fs.writeFileSync(
            "data/students.json",
            JSON.stringify(this.studentsArr)
        );
        fs.writeFileSync("data/events.json", JSON.stringify(this.eventsArr));
    }

    // getting next id
    private nextStudentId() {
        this.lastStudentId++;
        return this.lastStudentId;
    }
    private nextEventId() {
        this.lastEventId++;
        return this.lastEventId;
    }

    //
    // constructors
    //

    // construct instance
    constructor() {
        // arrays
        this.studentsArr = [];
        this.eventsArr = [];
        this.readData();

        // get last ids
        let greatestStudentId = 0;
        for (const student of this.studentsArr) {
            if (student.id > greatestStudentId) {
                greatestStudentId = student.id;
            }
        }
        this.lastStudentId = greatestStudentId;

        let greatestEventId = 0;
        for (const event of this.eventsArr) {
            if (event.id > greatestEventId) {
                greatestEventId = event.id;
            }
        }
        this.lastEventId = greatestEventId;
    }
}
