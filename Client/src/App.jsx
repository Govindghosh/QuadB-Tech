import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
