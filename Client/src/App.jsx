import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import { useSelector } from "react-redux";

function App() {
  const authUser = useSelector((state) => state.auth.user);
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/home"
          element={authUser ? <HomePage /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
