import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AssessmentForm from "./pages/AssessmentForm";
import Results from "./pages/Results";
import History from "./pages/History";

function App() {

  return (
    <Router>

      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/assessment" element={<AssessmentForm />} />

        <Route path="/results" element={<Results />} />

        <Route path="/history" element={<History />} />

      </Routes>

    </Router>
  );
}

export default App;