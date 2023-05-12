# Students

- [Get multiple students](#get-multiple-students)
- [Add student](#add-student)
- [Get student](#get-student)
- [Replace student](#replace-student)
- [Update student](#update-student)
- [Remove student](#remove-student)
- [Get student events](#get-student-events)
- [Add student event](#add-student-event)
- [Remove student event](#remove-student-event)
- [Clear student events](#clear-student-events)

|                                        | GET | POST | PUT | PATCH | DELETE |
|----------------------------------------|-----|------|-----|-------|--------|
| `/students.json`                       | ✓   | ✦    |     |       |        |
| `/students/<id>.json`                  | ✓   |      | ✦   | ✦     | ✦      |
| `/students/<id>/completed_events.json` | ✓   | ✦    |     | ✦     | ✦      |

## Get multiple students

```sh
curl --request GET \
  --url http://localhost:8000/v1/students.json
```

### Query Parameters

- `first_name`
- `last_name`
- `grade_lvl`

### Successful Response

...

## Add student ✦

```sh
curl --request POST \
  --url http://localhost:8000/v1/students.json?first_name=Charlie&last_name=Spring&grade_lvl=10
```

### Query Parameters

- `first_name` (required)
- `last_name` (required)
- `grade_lvl` (required)

### Successful Response

...

## Get student

```sh
curl --request GET \
  --url http://localhost:8000/v1/students/1.json
```

### Successful Response

...

## Replace student ✦

```sh
curl --request PUT \
  --url http://localhost:8000/v1/students/1.json?first_name=Charlie&last_name=Spring&grade_lvl=10
```

### Query Parameters

- `first_name` (required)
- `last_name` (required)
- `grade_lvl` (required)

### Successful Response

...

## Update student ✦

```sh
curl --request PATCH \
  --url http://localhost:8000/v1/students/1.json?first_name=Charlie&last_name=Spring&grade_lvl=10
```

```sh
curl --request PATCH \
  --url http://localhost:8000/v1/students/1.json?grade_lvl=10
```

### Query Parameters

- `first_name`
- `last_name`
- `grade_lvl`

### Successful Response

...

## Remove student ✦

```sh
curl --request DELETE \
  --url http://localhost:8000/v1/students/1.json
```

### Successful Response

...

## Get student events

```sh
curl --request GET \
  --url http://localhost:8000/v1/students/1/completed_events.json
```

### Successful Response

...

## Add student event ✦

```sh
curl --request POST \
  --url http://localhost:8000/v1/students/1/completed_events.json?event_id=1
```

### Query Parameters

- `event_id` (required)

### Successful Response

...

## Remove student event ✦

```sh
curl --request PATCH \
  --url http://localhost:8000/v1/students/1/completed_events.json?event_id=1
```

### Query Parameters

- `event_id` (required)

### Successful Response

...

## Clear student events ✦

```sh
curl --request DELETE \
  --url http://localhost:8000/v1/students/1/completed_events.json
```

### Successful Response

...
