import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Signup from "./pages/Signup";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
