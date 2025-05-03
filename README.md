# KUMBH-TS (YATRA-ROUTE-CONTROL-HUB)

A comprehensive traffic management and journey control web application for large-scale events, built with React (Vite, TypeScript) and Django (REST API).

## Features
- User registration and authentication
- Journey selection and management
- Admin dashboard for traffic and user control
- Responsive, modern UI (React, Tailwind CSS)
- RESTful API backend (Django, DRF)

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn-ui
- **Backend:** Django, Django REST Framework, MySQL

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Python 3.10+
- MySQL (or compatible database)

---

## Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:8080](http://localhost:8080)

---

## Backend Setup

1. **Create and activate a virtual environment:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
3. **Configure environment variables:**
   - Create a `.env` file in the `backend/` directory with your database and secret key settings:
     ```env
     DJANGO_SECRET_KEY=your-secret-key
     DB_NAME=your_db_name
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_HOST=localhost
     DB_PORT=3306
     ```
4. **Apply migrations:**
   ```bash
   python manage.py migrate
   ```
5. **Create a superuser (admin):**
   ```bash
   python manage.py createsuperuser
   ```
6. **Run the backend server:**
   ```bash
   python manage.py runserver
   ```
   The API will be available at [http://localhost:8000](http://localhost:8000)

---

## Project Structure
- `src/` - React frontend source code
- `backend/` - Django backend project
- `public/` - Static assets and public files

## License
This project is licensed under the MIT License.
