# Live Session Implementation Guide

This dashboard section powers the tutor live-session flow:

- Tutors create a course.
- Tutors toggle the course live from `/dashboard/courses`.
- Students discover the live course list at `/attend`.
- Students join a session from `/attend/[courseId]`.
- Students land in `/learn/[courseId]` and can submit live questions.
- Tutors see joined students and live questions in the course detail page.

## Data Flow

### 1. Tutor creates a course

The course is stored in `TutorCourse` through the existing server actions in:

- [`app/actions/courses.ts`](D:/cyberforevery/app/actions/courses.ts)

Lessons and quiz questions are saved alongside the course.

### 2. Tutor activates the session

The `isLive` flag is the source of truth for whether a course is joinable.

- The course list page toggles the flag.
- The detail page shows a live badge when `isLive = true`.
- `/attend` reads from the backend and only shows live courses.

### 3. Student joins

The join flow uses:

- [`app/(student)/attend/[courseId]/page.tsx`](D:/cyberforevery/app/(student)/attend/[courseId]/page.tsx)
- [`app/actions/student.ts`](D:/cyberforevery/app/actions/student.ts)

When a student joins, the app creates a `CourseStudent` row and stores the student id in a cookie named `student_<courseId>`.

### 4. Student studies and submits quiz answers

The learn flow uses:

- [`app/(student)/learn/[courseId]/page.tsx`](D:/cyberforevery/app/(student)/learn/[courseId]/page.tsx)
- [`app/(student)/learn/[courseId]/learn-client.tsx`](D:/cyberforevery/app/(student)/learn/[courseId]/learn-client.tsx)

Quiz answers are auto-graded and saved in `Submission` and `Answer`.

### 5. Student asks a live question

Live questions are saved in the new `SessionQuestion` model.

The student client posts to:

- `POST /api/course-roster/[courseId]`

The request uses the student cookie to identify the learner, then writes the question to the backend.

### 6. Tutor monitors the session

Tutor live monitoring uses:

- [`app/(dashboard)/dashboard/courses/[id]/page.tsx`](D:/cyberforevery/app/(dashboard)/dashboard/courses/[id]/page.tsx)
- [`app/(dashboard)/dashboard/courses/[id]/live-roster.tsx`](D:/cyberforevery/app/(dashboard)/dashboard/courses/[id]/live-roster.tsx)
- [`app/api/course-roster/[courseId]/route.ts`](D:/cyberforevery/app/api/course-roster/[courseId]/route.ts)

The roster endpoint returns:

- Joined students
- Quiz submission state
- Recent live questions
- Resolve buttons for marking questions as answered

## Backend Endpoints

### `GET /api/live-courses`

Returns only courses with `isLive = true`.

Used by `/attend`.

### `GET /api/course-roster/[courseId]`

Returns the live roster for the tutor view and the student question feed.

### `POST /api/course-roster/[courseId]`

Creates a new live question for the signed-in student session.

## Database Changes

The live question feature adds one Prisma model:

- `SessionQuestion`

It links:

- `TutorCourse`
- `CourseStudent`

The migration lives in:

- [`prisma/migrations/20260504000000_live_session_questions/migration.sql`](D:/cyberforevery/prisma/migrations/20260504000000_live_session_questions/migration.sql)

## What To Check When Deploying

1. Run Prisma migrations.
2. Regenerate the Prisma client.
3. Confirm the `DATABASE_URL` points at the same database used by the app.
4. Open a tutor course, set it live, then verify it appears on `/attend`.
5. Join as a student and verify the tutor detail page updates with the student and the question feed.

## Recommended Verification Path

1. Create a course in `/dashboard/courses/new`.
2. Toggle it live in `/dashboard/courses`.
3. Open `/attend` in a student browser.
4. Join the session from `/attend/[courseId]`.
5. Open the tutor course detail page and confirm the student appears.
6. Submit a live question from `/learn/[courseId]` and confirm it shows up in the tutor roster.

