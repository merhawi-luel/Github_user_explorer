import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="border-b border-white/10 px-6 py-5">
      <Link to="/" className="font-mono text-lg text-fg hover:text-link transition-colors">
        ExploreGithub
       
      </Link>
    </header>
  );
}

export default Header;