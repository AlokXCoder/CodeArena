import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import CodingWorkspace from './components/CodingWorkspace';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import ProblemsetPage from './pages/ProblemsetPage';
import ContestsPage from './pages/ContestsPage';
import CompanyDashboard from './pages/CompanyDashboard';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[var(--color-dark-bg)] text-white font-sans overflow-hidden">
        <Navbar />
        <main className="flex-1 flex flex-col h-[calc(100vh-[auto])] overflow-hidden">
          <Routes>
            <Route path="/" element={<ProblemsetPage />} />
            <Route path="/problemset" element={<ProblemsetPage />} />
            <Route path="/contests" element={<ContestsPage />} />
            <Route path="/company/dashboard" element={<CompanyDashboard />} />
            <Route path="/workspace/practice/:problemId" element={<CodingWorkspace />} />
            <Route path="/workspace/contest/:contestId/:problemId" element={<CodingWorkspace />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
