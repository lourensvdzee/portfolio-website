export default function Footer() {
  return (
    <footer className="relative z-[80] border-t border-card-border bg-bg py-8">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-6 text-sm text-muted sm:flex-row sm:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
          <span className="font-semibold text-text">Lourens van der Zee</span>
          <a
            href="mailto:connect@lourensvanderzee.com"
            className="transition-colors hover:text-text"
          >
            connect@lourensvanderzee.com
          </a>
          <a
            href="https://linkedin.com/in/lourens-van-der-zee"
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
