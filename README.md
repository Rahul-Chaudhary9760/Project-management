
# Project Management Dashboard

A modern React-Redux project management dashboard featuring role-based access, rich text editing, and a clean, component-driven UI.

---

## Tech Stack

- **React**: v19
- **Redux Toolkit**: State management
- **Node.js**: v20+
- **Shadcn/UI**: Modern component library for beautiful, accessible UI
- **Quill Editor**: Rich text editing for project descriptions

---

## Getting Started

### Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:Rahul-Chaudhary9760/Project-management.git
   cd Project-management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Visit [http://localhost:5173](http://localhost:5173) in your browser.**

---

## Project Structure

```
src/
  features/
    projects/      # Project management logic, UI, and state (details, list, form, slice)
    teams/         # Team member logic, slice
    tasks/         # Task management: list, chart, form, slice
  components/
    ui/            # Custom Shadcn-based UI components (card, button, dialog, input, etc.)
  pages/           # App pages: CreateProject, Dashboard
  app/
    Routes.jsx     # Application routes (react-router)
    store.js       # Redux store configuration
  App.jsx          # Main app layout
  main.jsx         # Entry point
```

### Folder Descriptions

- **features/projects/**:  
  Project-related components and Redux slice. Contains detail view, list, and creation form.

- **features/teams/**:  
  Team member-related Redux slice and logic.

- **features/tasks/**:  
  Task management components (list, chart, form) and state.

- **components/ui/**:  
  Reusable UI components based on Shadcn/UI (buttons, dialogs, inputs, etc.).

- **pages/**:  
  Main application pages, such as Dashboard and Create Project.

- **app/**:  
  App-level logic: routing and Redux store setup.

---

## UI & Framework Notes

- **Shadcn/UI**:  
  Used throughout for a clean, accessible, and modern component design.

- **React v19** and **Node 20+**:  
  Leverage the latest React features and Node compatibility.

---

## Acknowledgements

- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Quill Editor](https://quilljs.com/)
- [Shadcn/UI](https://ui.shadcn.com/)

---

