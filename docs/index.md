# API Docs

|                                        | GET | POST | PUT | PATCH | DELETE |
|----------------------------------------|-----|------|-----|-------|--------|
| `/students.json`                       | ✓   | ✦    |     |       |        |
| `/students/<id>.json`                  | ✓   |      | ✦   | ✦     | ✦      |
| `/students/<id>/completed_events.json` | ✓   | ✦    |     | ✦     | ✦      |
| `/events.json`                         | ✓   | ✦    |     |       |        |
| `/events/<id>.json`                    | ✓   |      | ✦   | ✦     | ✦      |

## Overview

the basics (api call, json response, query params)...

### Access tokens & authorization

### URIs, IDs, and other terminology

### Response types & error codes

## Reference

- [Students](./students.md)
    - Get multiple students
    - Add student
    - Get student
    - Replace student
    - Update student
    - Remove student
    - Get student events
    - Add student event
    - Remove student event
    - Clear student events
- [Events](./events.md)
    - Get multiple events
    - Add event
    - Get event
    - Replace event
    - Update event
    - Remove event
