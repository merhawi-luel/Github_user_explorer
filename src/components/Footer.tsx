function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-6">
      <p className="font-mono text-sm text-muted text-center">
        data from{" "}
        <a
          href="https://docs.github.com/en/rest"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-accent transition-colors"
        >
          api.github.com
        </a>
        <span className="text-white/20 mx-2">|</span>
        unauthenticated · 60 req/hr
      </p>
    </footer>
  );
}

export default Footer;