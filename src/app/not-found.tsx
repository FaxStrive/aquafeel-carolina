import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)]">
      <div className="text-center px-4">
        <h1
          className="font-heading font-extrabold text-[var(--color-primary)] mb-4"
          style={{ fontSize: "var(--text-hero)" }}
        >
          404
        </h1>
        <p className="font-heading text-xl text-[var(--color-text-secondary)] mb-8">
          Page not found
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-semibold hover:bg-[var(--color-accent)] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
