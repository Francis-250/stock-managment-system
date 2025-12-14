<div align="center">
  <img src="image.png" alt="Stock Management System Banner" width="100%">
  
  # 📦 Stock Management System
  
  ### A Modern, Full-Stack Inventory Management Solution
  
  [![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-6.19.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![MySQL](https://img.shields.io/badge/MySQL-Latest-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.18-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

  <p align="center">
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-api-documentation">API</a> •
    <a href="#-deployment">Deployment</a>
  </p>
</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

**Stock Management System** is a comprehensive inventory management solution designed to streamline stock tracking, product management, and reporting for businesses of all sizes. Built with modern web technologies, it offers a robust, scalable, and user-friendly platform for managing your inventory operations.

### Key Highlights

✨ **Real-time tracking** of stock movements and inventory levels  
🔐 **Multi-tenant architecture** with role-based access control  
📊 **Advanced analytics** and detailed reporting  
🎨 **Modern UI** with dark mode support  
📱 **Responsive design** for seamless mobile experience  
☁️ **Cloud storage** integration for product images

---

## ✨ Features

### 🏪 Inventory Management

- **Product Management**: Create, update, and organize products with categories
- **Stock Tracking**: Real-time monitoring of stock levels with low-stock alerts
- **Stock Movements**: Track all stock in/out operations with complete audit trails
- **Batch Operations**: Handle multiple items efficiently with bulk operations

### 👥 User & Access Control

- **Multi-tenant Support**: Isolated data per organization
- **Role-based Access**: Admin, Manager, and User roles with granular permissions
- **User Management**: Complete user lifecycle management
- **Secure Authentication**: JWT-based authentication with OTP verification

### 📊 Analytics & Reporting

- **Dashboard Analytics**: Visual insights with charts and statistics
- **Stock Reports**: Comprehensive reports on inventory status
- **Movement History**: Complete audit trail of all stock movements
- **Activity Tracking**: Monitor recent activities and changes

### 🎨 User Experience

- **Modern Interface**: Clean, intuitive design built with TailwindCSS
- **Dark Mode**: Eye-friendly theme switching
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Instant feedback on all operations
- **Advanced Filtering**: Powerful search and filter capabilities

### 🔒 Security Features

- **Encrypted Passwords**: Bcrypt password hashing
- **JWT Tokens**: Secure token-based authentication
- **Email Verification**: OTP-based email verification
- **Cookie-based Sessions**: Secure HTTP-only cookies
- **CORS Protection**: Configured cross-origin resource sharing

---

## 🛠️ Tech Stack

### Frontend

| Technology                                                                                                             | Purpose            |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------ |
| ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)                      | UI Framework       |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)                         | Build Tool         |
| ![TailwindCSS](https://img.shields.io/badge/-Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)       | Styling            |
| ![React Router](https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) | Routing            |
| ![Axios](https://img.shields.io/badge/-Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)                      | HTTP Client        |
| ![Recharts](https://img.shields.io/badge/-Recharts-FF6384?style=flat-square)                                           | Data Visualization |
| ![Lucide Icons](https://img.shields.io/badge/-Lucide-F56565?style=flat-square)                                         | Icon Library       |

### Backend

| Technology                                                                                                       | Purpose        |
| ---------------------------------------------------------------------------------------------------------------- | -------------- |
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)          | Runtime        |
| ![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white)          | Web Framework  |
| ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)             | ORM            |
| ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)                | Database       |
| ![JWT](https://img.shields.io/badge/-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)            | Authentication |
| ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white) | Image Storage  |
| ![Nodemailer](https://img.shields.io/badge/-Nodemailer-0078D4?style=flat-square)                                 | Email Service  |

---

## 📁 Project Structure

```
sms/
├── backend/                    # Backend API Server
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   ├── seed.js            # Database seeder
│   │   └── migrations/        # Database migrations
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── middleware/        # Express middleware
│   │   ├── routes/            # API routes
│   │   ├── utils/             # Utility functions
│   │   └── app.js             # Application entry point
│   └── package.json
│
├── frontend/                   # Frontend React App
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── form/         # Form components
│   │   │   └── table/        # Table components
│   │   ├── context/          # React context providers
│   │   ├── pages/            # Page components
│   │   │   └── admin/        # Admin pages
│   │   ├── lib/              # Libraries & configs
│   │   ├── utils/            # Helper functions
│   │   ├── App.jsx           # Root component
│   │   └── main.jsx          # Entry point
│   ├── public/               # Static assets
│   └── package.json
│
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v8 or higher) - [Download](https://www.mysql.com/)
- **npm** or **yarn** - Comes with Node.js

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/stock-management-system.git
cd stock-management-system
```

2. **Set up the Backend**

```bash
cd backend

# Install dependencies
npm install

# Create .env file (see Environment Variables section)
cp .env.example .env

# Configure your database connection in .env
# Edit the DATABASE_URL and other required variables

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npm run seed

# Start the development server
npm run dev
```

The backend server will start at `http://localhost:8000`

3. **Set up the Frontend**

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure API URL in .env
# VITE_API_BASE_URL=http://localhost:8000/api

# Start the development server
npm run dev
```

The frontend will start at `http://localhost:5173`

4. **Access the Application**

Open your browser and navigate to `http://localhost:5173`

**Default Admin Credentials:**

- Email: `admin@example.com`
- Password: `admin123` (Change after first login)

---

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/stock_management"

# Server
PORT=8000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api
```

### 📧 Setting up Email (Gmail)

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
4. Use the generated password in `EMAIL_PASS`

### ☁️ Setting up Cloudinary

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your credentials from the dashboard
3. Add them to your `.env` file

---

## 📡 API Documentation

### Base URL

```
http://localhost:8000/api
```

### Authentication Endpoints

| Method | Endpoint             | Description             | Auth Required |
| ------ | -------------------- | ----------------------- | ------------- |
| POST   | `/auth/register`     | Register new user       | ❌            |
| POST   | `/auth/login`        | User login              | ❌            |
| POST   | `/auth/logout`       | User logout             | ✅            |
| POST   | `/auth/verify-email` | Verify email with OTP   | ❌            |
| POST   | `/auth/resend-otp`   | Resend verification OTP | ❌            |
| GET    | `/auth/me`           | Get current user        | ✅            |

### User Management

| Method | Endpoint    | Description    | Auth Required | Role  |
| ------ | ----------- | -------------- | ------------- | ----- |
| GET    | `/user`     | Get all users  | ✅            | Admin |
| GET    | `/user/:id` | Get user by ID | ✅            | Admin |
| PUT    | `/user/:id` | Update user    | ✅            | Admin |
| DELETE | `/user/:id` | Delete user    | ✅            | Admin |

### Category Management

| Method | Endpoint          | Description        | Auth Required |
| ------ | ----------------- | ------------------ | ------------- |
| GET    | `/categories`     | Get all categories | ✅            |
| GET    | `/categories/:id` | Get category by ID | ✅            |
| POST   | `/categories`     | Create category    | ✅            |
| PUT    | `/categories/:id` | Update category    | ✅            |
| DELETE | `/categories/:id` | Delete category    | ✅            |

### Product Management

| Method | Endpoint        | Description       | Auth Required |
| ------ | --------------- | ----------------- | ------------- |
| GET    | `/products`     | Get all products  | ✅            |
| GET    | `/products/:id` | Get product by ID | ✅            |
| POST   | `/products`     | Create product    | ✅            |
| PUT    | `/products/:id` | Update product    | ✅            |
| DELETE | `/products/:id` | Delete product    | ✅            |

### Stock Management

| Method | Endpoint           | Description           | Auth Required |
| ------ | ------------------ | --------------------- | ------------- |
| GET    | `/stocks`          | Get all stock items   | ✅            |
| GET    | `/stocks/:id`      | Get stock by ID       | ✅            |
| GET    | `/stock-ins`       | Get stock in records  | ✅            |
| POST   | `/stock-ins`       | Record stock in       | ✅            |
| GET    | `/stock-outs`      | Get stock out records | ✅            |
| POST   | `/stock-outs`      | Record stock out      | ✅            |
| GET    | `/stock-movements` | Get movement history  | ✅            |

### Reports & Analytics

| Method | Endpoint   | Description              | Auth Required |
| ------ | ---------- | ------------------------ | ------------- |
| GET    | `/reports` | Get reports              | ✅            |
| GET    | `/stats`   | Get dashboard statistics | ✅            |

### Request/Response Examples

**POST /auth/login**

Request:

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "clx123...",
    "email": "admin@example.com",
    "firstName": "Admin",
    "role": "ADMIN"
  }
}
```

**POST /products**

Request:

```json
{
  "name": "Laptop",
  "description": "Dell Latitude 5420",
  "sku": "LAP-001",
  "categoryId": "cat123...",
  "price": 899.99,
  "image": "base64_encoded_image_or_file"
}
```

---

## 📸 Screenshots

### Dashboard

> ![Dashboard](image.png) > _Real-time analytics and key metrics at a glance_

### Product Management

> ![Products](image.png) > _Comprehensive product catalog with search and filters_

### Stock Tracking

> ![Stock](image.png) > _Live inventory levels with alerts_

### Reports

> ![Reports](image.png) > _Detailed reports and analytics_

---

## 🚢 Deployment

### Backend Deployment (Railway/Render)

1. **Prepare for deployment:**

```bash
# Add production script to package.json
"scripts": {
  "start": "npx prisma generate && npx prisma migrate deploy && node src/app.js"
}
```

2. **Set environment variables** on your hosting platform

3. **Deploy:**
   - Connect your GitHub repository
   - Configure build command: `npm install`
   - Configure start command: `npm start`

### Frontend Deployment (Vercel/Netlify)

1. **Build the project:**

```bash
npm run build
```

2. **Deploy to Vercel:**

```bash
npm i -g vercel
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

3. **Set environment variables:**
   - `VITE_API_BASE_URL` = Your backend URL

### Database Deployment

**Recommended Services:**

- [PlanetScale](https://planetscale.com/) - Free MySQL hosting
- [Railway](https://railway.app/) - MySQL with free tier
- [AWS RDS](https://aws.amazon.com/rds/) - Production-grade MySQL

### Environment Configuration

Update your production environment variables:

**Backend:**

- ✅ Use strong `JWT_SECRET`
- ✅ Configure production `DATABASE_URL`
- ✅ Update CORS origins to your frontend URL
- ✅ Set `NODE_ENV=production`

**Frontend:**

- ✅ Update `VITE_API_BASE_URL` to your backend URL

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📝 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Express](https://expressjs.com/) - Backend framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [TailwindCSS](https://tailwindcss.com/) - Styling framework
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [Recharts](https://recharts.org/) - Charting library

---

## 📞 Support

If you have any questions or need help, please:

- 🐛 [Open an Issue](https://github.com/yourusername/stock-management-system/issues)
- 💬 [Start a Discussion](https://github.com/yourusername/stock-management-system/discussions)
- 📧 Email: support@example.com

---

<div align="center">
  <p>Made with ❤️ by <strong>Your Name</strong></p>
  <p>⭐ Star this repository if you find it helpful!</p>
  
  [![GitHub stars](https://img.shields.io/github/stars/yourusername/stock-management-system?style=social)](https://github.com/yourusername/stock-management-system/stargazers)
  [![GitHub forks](https://img.shields.io/github/forks/yourusername/stock-management-system?style=social)](https://github.com/yourusername/stock-management-system/network/members)
  
  [⬆ Back to Top](#-stock-management-system)
</div>
