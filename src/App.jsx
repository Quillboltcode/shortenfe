import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from './pages/Register';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import AuthProvider and useAuth

const AppContent = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth(); // Access authentication state from context

  return (
    <>
      {/* Show Navbar on all pages except /login and /register */}
      {location.pathname !== "/login" && location.pathname !== "/register" && <Navbar />}

      <Routes>
        {/* Allow access to Home page for both authenticated and unauthenticated users */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* Show Footer on all pages except /login and /register */}
      {location.pathname !== "/login" && location.pathname !== "/register" && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      {/* Wrap the app with AuthProvider to provide authentication context */}
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;