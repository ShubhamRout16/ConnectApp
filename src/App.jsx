import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* routes which are public all users can see */}
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>

        {/* routes which are private and only logged in users can see */}
        <Route 
          path="/"
          element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
        />

        {/* more protected routes */}
        {/* create Post page route */}
        {/* profile page route */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
