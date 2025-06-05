# 🏠 House Renting Mobile App

A modern React Native mobile application for house renting built with Expo, featuring complete authentication, property browsing, and management capabilities.

## 📱 Features

### 🔐 Authentication System
- **User Registration** - Create new accounts with email validation
- **Login/Logout** - Secure JWT-based authentication
- **Session Management** - Automatic token handling and persistence
- **Profile Management** - View and manage user information

### 🏡 Property Management
- **Property Browsing** - Browse all available properties
- **Property Search** - Search with filters (price, bedrooms, location, etc.)
- **Property Details** - Detailed property view with image carousel
- **My Listings** - Manage your own property listings
- **CRUD Operations** - Create, read, update, delete properties

### 📱 User Interface
- **Tab Navigation** - Home, Search, My Listings, Profile
- **Responsive Design** - Optimized for mobile devices
- **Modern UI** - Clean, professional interface with TailwindCSS styling
- **Safe Area Support** - Proper handling for different device sizes
- **Loading States** - User-friendly loading indicators

### 📞 Additional Features
- **Contact Owner** - Direct phone call functionality
- **Map Integration** - Google Maps integration for property locations
- **Comments & Ratings** - Property review system
- **Feedback System** - User feedback collection
- **About Section** - Team and app information

## 🛠️ Technical Stack

### Frontend (Mobile)
- **React Native** 0.79.3 - Cross-platform mobile framework
- **Expo** ~53.0.10 - Development platform and tools
- **Expo Router** ~5.0.7 - File-based navigation system
- **TypeScript** ~5.8.3 - Type safety and developer experience
- **React** 19.0.0 - UI library

### Backend Integration
- **Node.js** - Backend server
- **Express** - Web framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication tokens

### Key Libraries
- **@expo/vector-icons** - Icon system
- **expo-image** - Optimized image handling
- **react-native-safe-area-context** - Safe area management
- **@react-native-async-storage/async-storage** - Local storage

## 📂 Project Structure

```
house-renting-mobile/
├── app/                          # App screens and navigation
│   ├── (tabs)/                   # Tab-based screens
│   │   ├── index.tsx             # Home screen
│   │   ├── search.tsx            # Search screen
│   │   ├── my-listing.tsx        # My listings screen
│   │   └── profile.tsx           # Profile screen
│   ├── auth/                     # Authentication screens
│   │   ├── login.tsx             # Login screen
│   │   └── signup.tsx            # Signup screen
│   ├── property/                 # Property screens
│   │   └── [id].tsx              # Property detail screen
│   ├── about.tsx                 # About screen
│   ├── feedback.tsx              # Feedback screen
│   └── _layout.tsx               # Root layout
├── components/                   # Reusable components
│   ├── ui/                       # UI components
│   ├── PropertyCard.tsx          # Property card component
│   ├── ThemedView.tsx            # Themed view component
│   └── ThemedText.tsx            # Themed text component
├── contexts/                     # React contexts
│   └── AuthContext.tsx           # Authentication context
├── services/                     # API services
│   └── api.ts                    # API integration
├── constants/                    # App constants
├── hooks/                        # Custom hooks
└── assets/                       # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Expo CLI installed globally: `npm install -g @expo/cli`
- iOS Simulator (for iOS development) or Android Studio (for Android)
- Backend server running (see backend setup instructions)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/house-renting-mobile.git
   cd house-renting-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoints**
   - Update the API base URL in `services/api.ts`
   - Replace `192.168.1.101:3000` with your backend server URL

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device/simulator**
   - For iOS: `npm run ios`
   - For Android: `npm run android`
   - For web: `npm run web`

### Backend Setup
Ensure your backend server is running with the following endpoints:
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `GET /api/posts` - Get all properties
- `GET /api/posts/:id` - Get property by ID
- `DELETE /api/posts/:id` - Delete property

## 📱 App Navigation

### Tab Structure
1. **Home** - Featured properties and app overview
2. **Search** - Property search with filters
3. **My Listing** - Manage your property listings (requires login)
4. **Profile** - User profile and app settings

### Authentication Flow
- Non-authenticated users can browse properties
- Login required for property management and profile access
- Secure token storage with automatic logout on token expiry

## 🔧 Development

### Scripts
- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint for code quality

### Code Quality
- ESLint configuration for code consistency
- TypeScript for type safety
- Proper error handling and loading states
- Clean component architecture

## 🎨 UI/UX Features

- **Modern Design** - Clean, professional interface
- **Responsive Layout** - Adapts to different screen sizes
- **Touch-Friendly** - Optimized for mobile interaction
- **Visual Feedback** - Loading states and animations
- **Accessibility** - Proper contrast and touch targets

## 🔒 Security

- JWT token-based authentication
- Secure token storage using AsyncStorage
- Input validation and sanitization
- Error handling without exposing sensitive data

## 🚀 Deployment

### Building for Production

1. **Update app configuration**
   ```bash
   # Update app.json with production settings
   ```

2. **Build for platforms**
   ```bash
   # For iOS
   expo build:ios
   
   # For Android
   expo build:android
   ```

3. **Submit to app stores**
   ```bash
   expo submit
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
