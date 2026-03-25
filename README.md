# Spendly — Personal Budget Tracker

A full-stack web application to track personal income and expenses with a clean and minimal interface.

🔗 **Live demo:** https://budget-app-front-red.vercel.app

---

## Features

- User authentication (register & login with JWT)
- Add income and expenses with predefined categories
- Real-time balance summary
- Delete transactions
- Responsive design

## Tech Stack

**Frontend**
- React
- Tailwind CSS
- Axios
- React Router

**Backend**
- Node.js
- Express
- MySQL
- JWT & bcryptjs

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: Filess

## Getting Started

### Prerequisites
- Node.js
- MySQL

### Backend setup
```bash
git clone https://github.com/tu-usuario/budget-app-backend
cd budget-app-backend
npm install
```

Create a `.env` file:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=budget_app
JWT_SECRET=yoursecretkey
```

Run the database schema:
```bash
mysql -u root -p budget_app < schema.sql
```

Start the server:
```bash
node index.js
```

### Frontend setup
```bash
git clone https://github.com/tu-usuario/budget-app-frontend
cd budget-app-frontend
npm install
npm start
```

## Screenshots

> Add screenshots here

## License

MIT
