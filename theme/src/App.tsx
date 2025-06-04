/**
 *
 * App layout
 */

// Modules
import { createBrowserRouter, RouterProvider } from "react-router-dom" // Changed import
import "bootstrap/dist/js/bootstrap.bundle.min.js"

// Layouts
import MainLayout from "@layout/MainLayout"
import LandingLayout from "@layout/LandingLayout"
import AuthLayout from "@layout/AuthLayout"
import MusicLayout from "@layout/MusicLayout"

// Components
import Home from "@page/Home"
import About from "@page/About"
import Contact from "@page/Contact"
import Blog from "@page/Blog"
import NotFound from "@page/NotFound"
import BlogPost from "@page/BlogPost"
import Login from "@page/auth/Login"
import Register from "@page/auth/Register"
import Forgot from "@page/auth/Forgot"
import Music from "@page/music"
import Genres from "@page/music/Genres"
import GenreDetails from "@page/music/GenreDetails"
import Tracks from "@page/music/Tracks"
import TrackDetails from "@page/music/TrackDetails"
import Albums from "@page/music/Albums"
import Artists from "@page/music/Artists"
import ArtistDetails from "@page/music/ArtistDetails"
import Stations from "@page/music/Stations"
import Analytics from "@page/music/Analytics"
import History from "@page/music/History"
import Events from "@page/music/Events"
import EventDetails from "@page/music/EventDetails"
import CreateEvent from "@page/music/CreateEvent"
import AddTrack from "@page/music/AddTrack"
import Playlist from "@page/music/Playlist"
import PlaylistDetails from "@page/music/PlaylistDetails"
import Profile from "@page/music/Profile"
import Favorites from "@page/music/Favorites"
import Settings from "@page/music/Settings"
import Plan from "@page/music/Plan"

// Utilities
import "./core/i18n"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <LandingLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "blog",
            element: <Blog />,
          },
          {
            path: "blog/:id",
            element: <BlogPost />,
          },
        ],
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Login />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "forgot",
            element: <Forgot />,
          },
        ],
      },
      {
        path: "/music",
        element: <MusicLayout />,
        children: [
          {
            index: true,
            element: <Music />,
          },
          {
            path: "genres",
            element: <Genres />,
          },
          {
            path: "genre/:id",
            element: <GenreDetails />,
          },
          {
            path: "tracks",
            element: <Tracks />,
          },
          {
            path: "track/:id",
            element: <TrackDetails />,
          },
          {
            path: "albums",
            element: <Albums />,
          },
          {
            path: "album/:id",
            element: <Profile />, // Assuming this is correct as per original, might be AlbumDetails
          },
          {
            path: "artists",
            element: <Artists />,
          },
          {
            path: "artist/:id",
            element: <ArtistDetails />,
          },
          {
            path: "stations",
            element: <Stations />,
          },
          {
            path: "analytics",
            element: <Analytics />,
          },
          {
            path: "history",
            element: <History />,
          },
          {
            path: "events",
            element: <Events />,
          },
          {
            path: "event/:id",
            element: <EventDetails />,
          },
          {
            path: "playlists",
            element: <Playlist />,
          },
          {
            path: "playlist/:id",
            element: <PlaylistDetails />,
          },
          {
            path: "create-event",
            element: <CreateEvent />,
          },
          {
            path: "add-track",
            element: <AddTrack />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "favorites",
            element: <Favorites />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "plan",
            element: <Plan />,
          },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
