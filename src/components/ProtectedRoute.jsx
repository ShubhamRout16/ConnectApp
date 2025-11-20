// what is the use of the Protected Routes ?
// this blocks the unauthorized access , it means it blocks all the users which are not logged in the app
// only logged in users can access feed , profile , create-post and etc
// also preventing the logged in users from seeing login and signup page

import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

export default function ProtectedRoute({children}) {
  // accessing the data from the global context
  const { user , loading } = useAuth();

  if(loading){
    return(
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white"> 
        <p className="text-xl animate-pulse">Loading...</p>
      </div>
    );
  }

  if(!user){
    return <Navigate to="/login" replace/>
  }

  return children;
}