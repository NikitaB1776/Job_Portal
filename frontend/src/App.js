import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages//Auth/Login";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <div style={{ position: 'relative' }}>
      {/* Navbar appears on top of everything */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <Navbar />
      </div>
      
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;