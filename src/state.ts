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

    // reset to sample data
    resetData() {
        const students = [
            {
                id: 1,
                first_name: "Charlie",
                last_name: "Spring",
                grade_lvl: 10,
                completed_events: [],
            },
            {
                id: 2,
                first_name: "Nick",
                last_name: "Nelson",
                grade_lvl: 11,
                completed_events: [],
            },
            {
                id: 3,
                first_name: "Tori",
                last_name: "Spring",
                grade_lvl: 12,
                completed_events: [],
            },
            {
                id: 4,
                first_name: "Elle",
                last_name: "Argent",
                grade_lvl: 9,
                completed_events: [],
            },
            {
                id: 5,
                first_name: "Tara",
                last_name: "Jones",
                grade_lvl: 11,
                completed_events: [],
            },
            {
                id: 6,
                first_name: "Darcy",
                last_name: "Olsson",
                grade_lvl: 11,
                completed_events: [],
            },
            {
                id: 7,
                first_name: "Aled",
                last_name: "Last",
                grade_lvl: 10,
                completed_events: [],
            },
            {
                id: 8,
                first_name: "Ben",
                last_name: "Hope",
                grade_lvl: 12,
                completed_events: [],
            },
            {
                id: 9,
                first_name: "Michael",
                last_name: "Holden",
                grade_lvl: 12,
                completed_events: [],
            },
            {
                id: 10,
                first_name: "Tao",
                last_name: "Xu",
                grade_lvl: 10,
                completed_events: [],
            },
            {
                id: 11,
                first_name: "Isacc",
                last_name: "Henderson",
                grade_lvl: 9,
                completed_events: [],
            },
            {
                id: 12,
                first_name: "Imogen",
                last_name: "Heaney",
                grade_lvl: 9,
                completed_events: [],
            },
        ];
        const events = [
            {
                id: 1,
                name: "Rugby Game",
                points: 20,
            },
            {
                id: 2,
                name: "Basketball Game",
                points: 5,
            },
            {
                id: 3,
                name: "Vollyball Game",
                points: 10,
            },
            {
                id: 4,
                name: "Football Game",
                points: 5,
            },
            {
                id: 5,
                name: "Tennis Match",
                points: 5,
            },
            {
                id: 6,
                name: "Band Concert",
                points: 20,
            },
            {
                id: 7,
                name: "Choir Concert",
                points: 10,
            },
            {
                id: 8,
                name: "Theater Production",
                points: 5,
            },
            {
                id: 9,
                name: "Movie Night",
                points: 5,
            },
            {
                id: 10,
                name: "Graduation Ceremony",
                points: 5,
            },
        ];
        fs.writeFileSync("data/students.json", JSON.stringify(students));
        fs.writeFileSync("data/events.json", JSON.stringify(events));
        this.readData();
        this.lastStudentId = 12;
        this.lastEventId = 10;
    }

    // interacting with json data
    private readData() {
        if (!fs.existsSync("data")) {
            fs.mkdirSync("data");
        }

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

    // static new(): this | undefined {
    //     // check for & create data files
    //     try {
    //         if (!fs.existsSync("data/")) {
    //             fs.mkdirSync("data/");
    //         }

    //         if (!fs.existsSync("data/students.json")) {
    //             fs.writeFileSync("data/students.json", "[]");
    //         }

    //         if (!fs.existsSync("data/events.json")) {
    //             fs.writeFileSync("data/events.json", "[]");
    //         }
    //     } catch (e) {
    //         console.error(`unable to read filesystem: ${e}`);
    //         return undefined;
    //     }

    //     // read data from files
    //     let parsedStudentsJson = JSON.parse(
    //         fs.readFileSync("data/students.json").toString()
    //     );
    //     let parsedEventsJson = JSON.parse(
    //         fs.readFileSync("data/events.json").toString()
    //     );

    //     // check & sanatize data
    //     for (const studentJson of parsedStudentsJson) {
    //         if (typeof studentJson.id !== "number") {
    //             console.error("invalid data");
    //             return undefined;
    //         }

    //         if (typeof studentJson.first_name !== "string") {
    //             console.error("invalid data");
    //             return undefined;
    //         }

    //         if (typeof studentJson.last_name !== "string") {
    //             console.error("invalid data");
    //             return undefined;
    //         }

    //         if (studentJson.grade_lvl !== 9 && studentJson.grade_lvl !== 10 && studentJson.grade_lvl !== 11 && studentJson.grade_lvl !== 12) {
    //             console.error("invalid data");
    //             return undefined;
    //         }



    //         let tempStudent: JsonStudent = 
    //     }
    // }

    // construct instance
    constructor() {
        // ensure files exist
        if (!fs.existsSync("data")) {
            fs.mkdirSync("data");
        }
        if (!fs.existsSync("data/students.json")) {
            fs.writeFileSync("data/students.json", "[]");
        }
        if (!fs.existsSync("data/events.json")) {
            fs.writeFileSync("data/events.json", "[]");
        }
        
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

// function sanitizeStudentArr(input: any): JsonStudent[] | undefined {
//     const cleanArr: JsonStudent[] = [];

//     // check & sanatize data
//     for (const item of input) {

//         // check top-level types
//         if (typeof item.id !== "number") {
//             return undefined;
//         }
//         if (typeof item.first_name !== "string") {
//             return undefined;
//         }
//         if (typeof item.last_name !== "string") {
//             return undefined;
//         }
//         if (item.grade_lvl !== 9 && item.grade_lvl !== 10 && item.grade_lvl !== 11 && item.grade_lvl !== 12) {
//             return undefined;
//         }

//         // check completed events arr
//         const cleanCompletedEvents: number[] = [];
//         for (const event of item.completed_events) {
//             if (typeof event !== "number") {
//                 return undefined;
//             }

//             cleanCompletedEvents.push(event);
//         }

//         cleanArr.push({
//             id: item.id,
//             first_name: item.first_name,
//             last_name: item.last_name,
//             grade_lvl: item.grade_lvl,
//             completed_events: cleanCompletedEvents
//         });
//     }

//     return cleanArr;
// }
