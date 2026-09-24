// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import UserProfile from "./pages/UserProfile";
import RepoDetail from "./pages/RepoDetail";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/user/:username" element={<UserProfile />} />
        <Route path="/user/:username/repo/:repoName" element={<RepoDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;