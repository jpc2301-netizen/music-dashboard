# Music Dashboard 🎵

A React music app that allows users to search songs, preview tracks, save favourites, view recent searches, and see top artists statistics.

## 🚀 Live Demo
👉 (https://music-dashbord.netlify.app/)
## ✨ Features
- Search songs using the iTunes API
- Play 30-second previews
- Save favourites (stored in localStorage)
- Recent searches list
- Top artists stats view
- Multi-view dashboard layout

## 🛠 Tech Stack
- React (Vite)
- JavaScript
- CSS Grid & Flexbox
- iTunes Search API
- Netlify (CI/CD via GitHub)

## 📚 What I Learned
This project demonstrates React state management, API integration, component layout structuring, and local storage handling in a real-world dashboard interface.

## ⚙️ Challenges & Solutions

**Challenge:** Handling asynchronous API calls without blocking UI  
**Solution:** Used `useEffect` with proper async function handling and loading states

**Challenge:** Persisting user favourites between sessions  
**Solution:** Integrated `localStorage` with state synchronisation

**Challenge:** Managing multiple views within a single-page app  
**Solution:** Implemented view-based conditional rendering


## 🧠 Technical Highlights

- Implemented dynamic search with external API integration (iTunes API)
- Managed application state using React Hooks (`useState`, `useEffect`, `useMemo`)
- Implemented persistent user data using `localStorage`
- Designed multi-view dashboard layout with component-based structure
- Built responsive UI using CSS Grid and Flexbox
- Handled asynchronous operations and loading states
- Deployed production build using Netlify CI/CD pipeline
## 🧠 Technical Highlights

- Implemented dynamic search functionality using the iTunes REST API
- Managed complex UI state using React Hooks (`useState`, `useEffect`, `useMemo`)
- Designed multi-view dashboard structure with conditional rendering
- Integrated persistent user data using browser `localStorage`
- Handled asynchronous API requests with proper loading and error states
- Built responsive layout using CSS Grid and Flexbox
- Structured application using component-based architecture principles
- Deployed production build using GitHub → Netlify CI/CD pipeline
## ⚙️ Challenges & Solutions

**Challenge:** Managing asynchronous API calls without blocking the interface  
**Solution:** Used React Hooks with loading states to ensure smooth UI updates

**Challenge:** Persisting favourites between sessions  
**Solution:** Synced React state with `localStorage`

**Challenge:** Handling multiple dashboard views  
**Solution:** Implemented conditional rendering and structured state management
