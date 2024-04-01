import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
