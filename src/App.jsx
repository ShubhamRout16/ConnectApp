import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layout/AppLayout";
import CreatePost from "./pages/CreatePost";
import ProfilePage from "./pages/ProfilePage";
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
              <AppLayout>
                <Home/>
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* more protected routes */}
        {/* create Post page route */}
        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <AppLayout>
                <CreatePost/>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        {/* profile page route */}
        <Route 
          path="/profile/me"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ProfilePage isMe/>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/profile/:userId"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ProfilePage/>
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
