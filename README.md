# 🍛 Spice with Hassan – Authentic Pakistani Cuisine

[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

**Spice with Hassan** is a premium, full-stack mobile application designed to bring the authentic flavors of Pakistani cuisine to your fingertips. Built with a focus on high-performance UX/UI and a robust backend, the app offers a seamless experience from browsing a curated menu to reserving tables and managing orders.

---

## ✨ Key Features

### 🛒 Seamless Food Ordering
- **Curated Menu**: Organized categories including Starters, Main Course, BBQ & Grill, and Desserts.
- **Detailed Dish View**: High-quality imagery, spice levels, calorie counts, and preparation time.
- **Smart Cart**: Real-time cart management with price calculations.

### 🪑 Table Reservation System
- **Real-time Availability**: View free, occupied, or reserved tables.
- **Section Selection**: Filter tables by preference (Window, Center, Garden, Rooftop, or Private).
- **Premium Bookings**: Dedicated sections for VIP and premium dining experiences.

### 🔐 Secure Authentication & Profile
- **User Authentication**: Secure Login and Registration system.
- **Order History**: Track past orders and favorite dishes.
- **Profile Management**: Personalize preferences and saved addresses.

### 💳 Integrated Payments
- **Local Payment Gateways**: Native integration with **Easypaisa** and **JazzCash**.
- **Secure Transaction**: Encrypted checkout process for peace of mind.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React Native with Expo
- **UI Architecture**: Custom-built Design System with `react-native-paper`.
- **Animations**: React Native Animated API for premium transitions.

### Backend
- **Framework**: Node.js + Express.js
- **Authentication**: JWT & Bcrypt for secure user sessions
- **Validation**: Joi/Zod for robust API request validation

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Expo Go app

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hxni786/spice-with-hassan.git
   cd spice-with-hassan
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create a .env file with your JWT secret
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npx expo start
   ```

---

## 📂 Project Structure

```text
spice-with-hassan/
├── backend/            # Express.js Server
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   ├── controllers/    # Business logic
│   └── server.js       # Entry point
├── frontend/           # React Native / Expo App
│   ├── assets/         # Static resources
│   ├── components/     # Reusable UI
│   └── App.js          # App logic
└── README.md
```

---

## 📸 Preview

| Splash Screen | Menu View | Table Booking |
| :---: | :---: | :---: |
| ![Splash](https://i.postimg.cc/YSB7xK6v/logo.png) | ![Menu](https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300) | ![Table](https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=300) |

---

## 🤝 Contribution

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License
Distributed under the **0BSD License**. See `LICENSE` for more information.

Developed with ❤️ by **Syed Hassan Dildar**
