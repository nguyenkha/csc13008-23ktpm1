# Online Courses API

REST interface backed by Supabase for managing courses, instructors, and levels.

## Base URL
`https://yryeegjazuzurmepnkbg.supabase.co/rest/v1`

## Authentication
- Header `apikey` must be present on every request.
- `Content-Type: application/json` for write operations.

## Resources

### Courses

**List Courses**

- `GET {{url}}/courses?select=*,instructors(*),levels(*)`
- Optional pagination via `limit` and `offset` parameters

Sample request
```
GET {{url}}/courses?select=*,instructors(*),levels(*)&limit=5&offset=0
apikey: <SERVICE_KEY>
```

Sample response
```json
[
  {
    "course_id": 1,
    "title": "Quantum Canvas Sprint 2025",
    "description": "Hands-on labs blending NotebookLM, Gemini prompts, and custom datasets to architect research canvases.",
    "image_url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    "instructor_id": 1,
    "level_id": 1,
    "rating": 4.6,
    "total_reviews": 524,
    "total_hours": 5,
    "total_lectures": 48,
    "current_price": 199000,
    "original_price": 499000,
    "is_bestseller": true,
    "created_at": "2025-11-19T09:36:44.595057",
    "instructors": {
      "bio": "Expert in AI-powered research and document analysis",
      "name": "Yash Thakker",
      "created_at": "2025-11-19T09:36:44.595057",
      "instructor_id": 1,
      "total_students": null
    },
    "levels": {
      "name": "All Levels",
      "level_id": 1,
      "created_at": "2025-11-19T09:36:44.595057"
    }
  }
]
```

**Count Courses**

- `GET {{url}}/courses?select=course_id.count()`

Sample request
```
GET {{url}}/courses?select=course_id.count()
```

Sample response
```json
[{ "count": 27 }]
```

**Create Course**

- `POST {{url}}/courses`
- Body must include title, description, level/instructor IDs, pricing, etc.

Sample request
```
POST {{url}}/courses
apikey: <SERVICE KEY>
Content-Type: application/json
```
```json
{
  "title": "NotebookLM Deep Dive",
  "description": "Intensive workshop...",
  "image_url": "https://images.unsplash.com/sample.jpg",
  "instructor_id": 1,
  "level_id": 2,
  "rating": 4.6,
  "total_reviews": 524,
  "total_hours": 5.0,
  "total_lectures": 48,
  "current_price": 199000,
  "original_price": 499000,
  "is_bestseller": true
}
```

Sample response: empty response with **201** header

### Instructors

**List Instructors**

- `GET {{url}}/instructors`
- Supports standard Supabase filters (e.g., `select`, `order`, `eq`).

Sample request
```
GET {{url}}/instructors
apikey: <SERVICE_KEY>
```

Sample response
```json
[
  {
    "instructor_id": 1,
    "name": "Yash Thakker",
    "total_students": null,
    "bio": "Expert in AI-powered research and document analysis",
    "created_at": "2024-11-15T10:00:00Z"
  }
]
```

### Levels

**List Levels**

- `GET {{url}}/levels`
- Used to populate difficulty filter options for courses.

Sample request
```
GET {{url}}/levels
apikey: <SERVICE_KEY>
```

Sample response
```json
[
  { "level_id": 1, "name": "All Levels", "created_at": "2024-11-15T10:00:00Z" },
  { "level_id": 2, "name": "Beginner", "created_at": "2024-11-15T10:00:00Z" },
  { "level_id": 3, "name": "Intermediate", "created_at": "2024-11-15T10:00:00Z" },
  { "level_id": 4, "name": "Advanced", "created_at": "2024-11-15T10:00:00Z" }
]
```

## Error Handling

Supabase returns standard HTTP status codes:
- `200 OK` for successful reads.
- `201 Created` for inserts.
- `4xx` for validation/auth failures.
- `5xx` for server issues.

Each response body contains either the requested data or an error object such as:
```json
{ "code": "PGRST301", "message": "Row violates row-level security" }
```