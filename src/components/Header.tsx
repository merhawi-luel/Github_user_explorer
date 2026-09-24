import { Link } from "react-router-dom";
import { useRateLimit } from "../hooks/useRateLimit";

function Header() {
  const { remaining, limit } = useRateLimit();

  return (
    <header className="border-b border-white/10 px-6 py-5 flex items-center justify-between">
      <Link to="/" className="font-mono text-lg text-fg hover:text-link transition-colors">
         GitHub User Explorer
      </Link>

      {remaining !== null && limit !== null && (
        <span className="font-mono text-xs text-black font-extrabold w-fit bg-white px-2 py-1 rounded-md mr-40">
          {remaining}/{limit} requests left
        </span>
      )}
    </header>
  );
}

export default Header;