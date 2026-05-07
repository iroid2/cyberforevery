# Implementation Plan Summary

## Overview
Two major features to implement:

### 1. Certificate Email Prompt on Quiz Submission
**What happens:**
- Student completes quiz → Modal appears asking for email → Certificate generated → Email sent → Redirect to results

**Database Changes:**
- Add `CertificateRequest` model to track certificate requests
- Fields: courseId, studentId, submissionId, email, score, issuedAt, certificateUrl, etc.

**Backend Changes:**
- Update `submitQuiz()` in `app/actions/student.ts` to accept email parameter
- Add `requestCertificate()` action to create certificate requests
- Add certificate generation service in `lib/services/certificates.ts`
- Add email queue for certificate delivery

**Frontend Changes:**
- Create `components/CertificatePromptModal.tsx` - Modal for email input
- Update `learn-client.tsx` - Show modal after quiz submit, handle flow

### 2. Finished Sessions Management
**What happens:**
- Tutors can create session instances (e.g., "Monday Session", "Tuesday Session")
- Each instance has separate attendance tracking
- View all finished sessions with statistics per instance

**Database Changes:**
- Add `SessionInstance` model: courseId, date, title, notes, startedAt, completedAt, durationSeconds, isActive
- Add `SessionInstanceAttendance` model: instanceId, studentId, present, joinedAt, leftAt

**Backend Changes:**
- Add `createSessionInstance()` - Create new session instance
- Add `startSessionInstance()` - Start an instance
- Add `endSessionInstance()` - End an instance
- Add `getFinishedSessions()` - List completed sessions
- Add `getSessionInstanceDetails()` - Get detailed instance data

**Frontend Changes:**
- Create `app/(dashboard)/dashboard/courses/[id]/sessions/page.tsx` - List finished sessions
- Create `app/(dashboard)/dashboard/courses/[id]/sessions/[instanceId]/page.tsx` - Session detail with attendance
- Create `app/(dashboard)/dashboard/courses/[id]/sessions/new/page.tsx` - Form to create session instance
- Update sidebar navigation to include "Finished Sessions" link

---

## File Structure

### New Files:
```
components/CertificatePromptModal.tsx
app/(dashboard)/dashboard/courses/[id]/sessions/page.tsx
app/(dashboard)/dashboard/courses/[id]/sessions/[instanceId]/page.tsx
app/(dashboard)/dashboard/courses/[id]/sessions/new/page.tsx
lib/services/certificates.ts (updates)
app/actions/student.ts (updates)
app/actions/sessions.ts (new)
```

### Modified Files:
```
prisma/schema.prisma (add new models)
app/(student)/learn/[courseId]/learn-client.tsx (add certificate prompt)
components/sidebar.tsx (add Finished Sessions link)
```

---

## Key Features

### Certificate Prompt
✅ Modal appears after quiz completion
✅ Email validation
✅ Certificate generated with session title, student name, performance
✅ Email sent with PDF certificate
✅ Optional - student can skip

### Finished Sessions
✅ Create multiple session instances per course
✅ Separate attendance per instance (Monday vs Tuesday)
✅ Track duration per instance
✅ View attendance list with present/absent
✅ See quiz submissions per instance
✅ Statistics: attendance rate, average score, duration

---

## Implementation Steps

### Phase 1: Database (1 hour)
1. Update Prisma schema with new models
2. Run `npx prisma db push`
3. Run `npx prisma generate`

### Phase 2: Backend (2-3 hours)
1. Update `submitQuiz` action
2. Create `requestCertificate` action
3. Create session instance actions
4. Add certificate generation service
5. Add email queue integration

### Phase 3: Frontend Components (3-4 hours)
1. Build CertificatePromptModal
2. Build SessionInstanceCard
3. Build FinishedSessionsPage
4. Build SessionInstanceDetailPage
5. Build NewSessionPage

### Phase 4: Integration (2 hours)
1. Update learn-client.tsx to show modal
2. Update sidebar navigation
3. Wire up all API calls
4. Test complete flows

### Phase 5: Testing (2 hours)
1. Test certificate flow end-to-end
2. Test session instance creation
3. Test attendance tracking
4. Test multiple instances
5. Edge cases and error handling

**Total Estimate: 10-12 hours**

---

## Testing Checklist

- [ ] Certificate prompt appears after quiz submit
- [ ] Email validation works (format, required)
- [ ] Certificate request saved to database
- [ ] Email sent with PDF attachment
- [ ] Session instance creation works
- [ ] Multiple instances can exist for same course
- [ ] Attendance tracked per instance (not per course)
- [ ] Finished sessions page shows all completed instances
- [ ] Session detail shows attendance list
- [ ] Quiz submissions linked to correct instance
- [ ] Statistics calculated correctly per instance
- [ ] Sidebar navigation includes Finished Sessions
- [ ] Certificate includes: session title, student name, score, date
- [ ] Student can skip certificate (optional)
- [ ] Error handling for all API calls
- [ ] Loading states for all async operations