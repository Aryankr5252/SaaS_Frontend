# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# SaaS Notes Frontend

A modern SaaS Notes application frontend built with React, Vite, and Tailwind CSS. This app allows users to register, login, create notes, and upgrade their tenant to "Pro" for additional features. Admins have access to special routes and controls.

## Features
- **User Authentication:** Login, signup, and logout flows using JWT tokens stored in localStorage.
- **Role-based Access:** Admin and Member roles with protected routes.
- **Notes Management:** Create, edit, delete, and view notes. Members can only create up to 3 notes unless upgraded.
- **Upgrade Flow:** Admins can upgrade their tenant to "Pro" to allow more notes.
- **Admin Dashboard:** Demo dashboard for admin users.
- **Responsive UI:** Styled with Tailwind CSS for a modern look.

## Folder Structure
```
public/           # Static assets
src/
  api/            # Axios API setup
  assets/         # Images and icons
  components/     # Reusable UI components
  context/        # Auth context provider
  pages/          # Main app pages (Login, Signup, Notes, Logout)
App.jsx           # Main app entry
index.html        # Vite HTML entry
vite.config.js    # Vite configuration
postcss.config.js # PostCSS config
eslint.config.js  # ESLint config
tailwind.config.js# Tailwind CSS config
```

## API Endpoints Used
- `POST /users/login` — Login user
- `POST /users/register` — Register user
- `GET /users/profile` — Get current user profile
- `GET /users/logout` — Logout user
- `GET /notes/getAll` — Get all notes
- `GET /notes/getOne/:userId` — Get notes for a user
- `POST /notes/create` — Create a new note
- `PUT /notes/update/:id` — Update a note
- `DELETE /notes/delete/:id` — Delete a note
- `POST /tenant/:tenantSlug/upgrade` — Upgrade tenant to Pro

## How It Works
- **AuthContext** manages user state and token, provides login/logout helpers.
- **Navbar** shows links based on user role and login state.
- **LoginPage** authenticates users and stores token/user info in localStorage.
- **SingUp** allows new users to register with role and tenant slug.
- **NotesPage** displays notes, allows CRUD operations, and shows upgrade prompt if limit reached.
- **UpgradeButton** lets Admins upgrade their tenant; Members see a prompt to ask Admin.
- **UserLogout** logs out user and clears localStorage/token.
- **App.jsx** sets up routes and role-based protection.

## Getting Started
1. **Install dependencies:**
	```powershell
	npm install
	```
2. **Set environment variables:**
	- Create a `.env` file with:
	  ```env
	  VITE_API_BASE=http://your-backend-url
	  ```
3. **Run the app:**
	```powershell
	npm run dev
	```
4. **Open in browser:**
	- Visit `http://localhost:5173` (default Vite port)

## Customization
- **Styling:** Modify Tailwind classes in components for custom look.
- **API Base URL:** Change `VITE_API_BASE` in `.env` to match your backend.
- **Roles & Permissions:** Adjust logic in `AuthContext` and `App.jsx` for more roles or features.

## License
MIT

---
**Note:** This is a frontend-only project. You need a compatible backend for full functionality.
