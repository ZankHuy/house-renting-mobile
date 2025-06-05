# 🏠 House Renting Mobile App

A modern React Native mobile application for house renting built with Expo, featuring authentication, property browsing, and management capabilities.

## ✨ Features

- 🔐 **Authentication** - User registration, login/logout with JWT
- 🏡 **Property Management** - Browse, search, and manage property listings
- 📱 **Modern UI** - Clean, responsive interface with tab navigation
- 📞 **Contact Integration** - Direct phone calls and map integration
- 💬 **Feedback System** - User reviews and feedback collection

## 🛠️ Technical Stack

- **React Native** 0.79.3 + **Expo** ~53.0.10
- **TypeScript** ~5.8.3 for type safety
- **Expo Router** ~5.0.7 for navigation
- **Node.js/Express/Prisma/PostgreSQL** backend
- **JWT** authentication

## 📂 Project Structure

```
house-renting-mobile/
├── app/                     # App screens and navigation
│   ├── (tabs)/             # Tab navigation screens
│   ├── auth/               # Authentication screens
│   └── property/           # Property detail screens
├── components/             # Reusable UI components
├── contexts/               # React contexts (AuthContext)
├── services/               # API integration
└── assets/                 # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g @expo/cli`
- iOS Simulator or Android Studio

### Installation

```bash
# Install dependencies
npm install

# Configure API endpoint in services/api.ts
# Replace 192.168.1.101:3000 with your backend URL

# Start development server
npm start

# Run on device
npm run ios    # iOS
npm run android # Android
```

## 📱 App Structure

- **Home** - Featured properties overview
- **Search** - Property search with filters  
- **My Listing** - Manage property listings (requires login)
- **Profile** - User profile and settings

## 🔧 Development Scripts

```bash
npm start       # Start Expo server
npm run android # Run on Android
npm run ios     # Run on iOS  
npm run lint    # Code quality check
```

## 👥 Team

**Group 6 - HUST Web and App Programming Course**

- **Nguyễn Quang Anh** (20213564) - [anh.nq213564@sis.hust.edu.vn](mailto:anh.nq213564@sis.hust.edu.vn)
- **Nguyễn Danh Huy** (20213571) - [huy.nd213571@sis.hust.edu.vn](mailto:huy.nd213571@sis.hust.edu.vn)
- **Nguyễn Đỗ Hoàng Minh** (20210591) - [minh.ndh210591@sis.hust.edu.vn](mailto:minh.ndh210591@sis.hust.edu.vn)
- **Nguyễn Hữu Phong** (20210668) - [phong.nh210668@sis.hust.edu.vn](mailto:phong.nh210668@sis.hust.edu.vn)

## 📞 Contact

For questions, suggestions, or support, please contact any team member above or create an issue in this repository.

## 📄 License

This project is created for educational purposes as part of the Web and App Programming course at Hanoi University of Science and Technology (HUST).

---

**Built with ❤️ by Group 6**
