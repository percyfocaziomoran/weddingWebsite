import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import OurStoryPage from "./pages/OurStoryPage";
import SchedulePage from "./pages/SchedulePage";
import RSVPPage from "./pages/RSVPPage";
import "./App.css";
import PhotoGalleryPage from "./pages/PhotoGallery";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/rsvp" element={<RSVPPage />} />
        <Route path="/photogallery" element={<PhotoGalleryPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
