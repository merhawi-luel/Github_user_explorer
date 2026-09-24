import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RateLimitProvider } from "./hooks/useRateLimit";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";
import UserProfile from "./pages/UserProfile";
import RepoDetail from "./pages/RepoDetail";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

function App() {
  return (
    <RateLimitProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="/user/:username/repo/:repoName" element={<RepoDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </RateLimitProvider>
  );
}

export default App;