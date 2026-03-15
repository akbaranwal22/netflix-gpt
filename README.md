# Netflix GPT - Movie Recommendation App

A modern Netflix-inspired web application with movie recommendations using TMDB API, built with React, Redux, Firebase, and OpenAI for search functionality.

## 🎬 Live Demo

**🚀 Check out the live application:** [https://moviegpt-hub.netlify.app/](https://moviegpt-hub.netlify.app/)

## ✨ Features

### 🔐 Authentication System
- **User Registration & Login** with Firebase Authentication
- **Form Validation** with real-time error handling
- **Persistent Sessions** with Redux state management
- **Secure Sign Out** functionality

### 🎥 Movie Browsing Experience
- **Dynamic Movie Categories**:
  - 🔥 Trending Now
  - ⭐ Top Rated Movies
  - 🎬 Popular Movies
  - 📅 Upcoming Releases
  - 🌸 Anime Movies
  - 📺 Anime Series
  - 😱 Horror & Thriller
  - 🎭 Drama
  - 😂 Comedy
  - 🚀 Action & Adventure

### 🔍 Smart Search System
- **Movie Recommendations** using OpenAI GPT for natural language search
- **Natural Language Queries** - "Show me action movies like John Wick"
- **Fallback System** - Uses TMDB API genre-based filtering when GPT is unavailable
- **TMDB Integration** - Direct API calls for movie data and metadata
- **Error Handling** - Graceful degradation with user-friendly messages

### 🎨 Premium UI/UX
- **Netflix-Inspired Design** with modern aesthetics
- **Gradient Titles** with unique color schemes for each category
- **Smooth Animations** and hover effects
- **Horizontal Scroll** with arrow navigation
- **Responsive Design** - Works perfectly on all devices
- **Enhanced Movie Cards** with scale effects

### 🎵 Video Features
- **Auto-playing Trailers** with sound support
- **Smart Audio Control** - Browser-compliant autoplay with user interaction detection
- **YouTube Integration** for seamless video playback

### 🎛️ Interactive Elements
- **Scroll Indicators** with smooth navigation
- **Hover Effects** on all interactive components
- **Loading States** for better user feedback
- **Error Messages** with clear visual feedback

## 🛠️ Technology Stack

### Frontend
- **React 19.1.0** - Modern UI framework
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

### Backend & Services
- **Firebase Authentication** - User authentication
- **TMDB API** - Movie database and metadata
- **OpenAI GPT API** - AI-powered recommendations
- **YouTube API** - Video trailer integration

### Development Tools
- **React Scripts** - Build and development server
- **ESLint** - Code linting
- **Web Vitals** - Performance monitoring

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Firebase account
- TMDB API key
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/akbaranwal22/netflix-gpt.git
   cd netflix-gpt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key
   REACT_APP_OPENAI_API_KEY=your_openai_api_key
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
netflix-gpt/
├── public/
├── src/
│   ├── components/          # React components
│   │   ├── Browse.js       # Main browse page
│   │   ├── GptSearch.js    # GPT search functionality
│   │   ├── Header.js       # Navigation header
│   │   ├── Login.js        # Authentication page
│   │   ├── MovieList.js    # Movie list component
│   │   ├── VideoBackGround.js # Video background
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   │   ├── useAnimeMovies.js
│   │   ├── useAnimeSeries.js
│   │   ├── useNowPlayingMovies.js
│   │   ├── usePopularMovies.js
│   │   ├── useTopRatedMovies.js
│   │   └── useUpComingMovies.js
│   ├── utils/              # Utility functions
│   │   ├── appStore.js     # Redux store
│   │   ├── constant.js     # Application constants
│   │   ├── firebase.js     # Firebase configuration
│   │   ├── gptSlice.js     # GPT state management
│   │   ├── languageConstants.js
│   │   ├── moviesSlice.js  # Movies state management
│   │   ├── openAI.js       # OpenAI configuration
│   │   ├── userSlice.js    # User state management
│   │   └── validate.js     # Form validation
│   ├── App.js              # Main App component
│   └── index.js            # Application entry point
├── package.json
└── README.md
```

## 🔧 Configuration

### TMDB API Setup
1. Visit [TMDB](https://www.themoviedb.org/)
2. Create an account and get your API key
3. Add the API key to your environment variables

### OpenAI API Setup
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account and get your API key
3. Add the API key to your environment variables

### Firebase Setup
1. Create a new project in [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Configure your web app
4. Add Firebase configuration to your environment variables

## 🎯 Key Features Explained

### Search System
The search feature uses natural language processing with OpenAI GPT to understand user queries and provide personalized movie recommendations. It includes:

- **Smart Query Processing**: Understands complex requests like "action movies with strong female leads"
- **TMDB API Integration**: All movie data fetched directly from TMDB database
- **Fallback Mechanism**: Provides genre-based recommendations using TMDB filters when GPT is unavailable
- **Error Handling**: Graceful error messages and alternative suggestions

### Movie Categories
The app dynamically fetches movies across various categories using TMDB API:

- **Real-time Data**: Always up-to-date movie information from TMDB
- **Anime Content**: Dedicated anime movies and series using TMDB genre filtering
- **Genre-based Organization**: Intelligent categorization using TMDB metadata

### Responsive Design
- **Mobile-First Approach**: Optimized for all screen sizes
- **Touch-Friendly**: Large tap targets and smooth scrolling
- **Performance Optimized**: Lazy loading and efficient rendering

## 🌟 Highlights

- **Modern Tech Stack**: Latest React features and best practices
- **TMDB Integration**: Comprehensive movie database with real-time data
- **Beautiful UI**: Netflix-inspired design with attention to detail
- **Production Ready**: Error handling, loading states, and performance optimization
- **Extensible**: Easy to add new features and movie categories

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TMDB** for providing the amazing movie database API
- **OpenAI** for the powerful GPT technology
- **Firebase** for the authentication backend
- **Netflix** for the design inspiration

---

**🎬 Made with ❤️ for movie lovers everywhere!**

**📧 For any queries or collaborations, feel free to reach out!**
