# EdTech Learning Task Manager - TODO List

## Backend Fixes
- [x] Fix authorization in server/routes/taskRoutes.js for PUT and DELETE: Teachers can only edit/delete their own tasks, not students'.

## Frontend Setup
- [x] Update client/package.json: Add React, React DOM, TypeScript types, Axios, React Router DOM.
- [x] Install dependencies for client.
- [x] Transform client/src/main.ts into React entry point.
- [x] Create App.tsx with routing (Signup, Login, Dashboard).
- [x] Create components: Signup.tsx, Login.tsx, Dashboard.tsx, TaskList.tsx, TaskForm.tsx, etc.
- [x] Implement auth context for token and user state.
- [x] Build Dashboard: Fetch tasks, display list, filters, add/edit/delete tasks.
- [x] Handle API calls with Axios, include JWT in headers.
- [x] Display user role and teacher info for students.
- [x] Add logout functionality.
- [x] Basic styling and responsiveness.

## Testing and Finalization
- [ ] Test backend APIs with Postman or similar.
- [ ] Test frontend integration.
- [ ] Ensure role-based access works.
- [x] Create README with setup instructions, role explanation, AI disclosure.
- [ ] Prepare for video walkthrough.
