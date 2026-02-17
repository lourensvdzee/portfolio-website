export default function Footer() {
  return (
    <footer className="relative z-[80] border-t border-card-border bg-bg py-8">
      <div className="mx-auto flex max-w-1200 flex-col items-center gap-4 px-6 text-sm text-muted sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-text">Your Name</span>
          <a
            href="mailto:hello@example.com"
            className="transition-colors hover:text-text"
          >
            hello@example.com
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-text"
          >
            LinkedIn
          </a>
        </div>
        <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
      </div>
    </footer>
  )
}
