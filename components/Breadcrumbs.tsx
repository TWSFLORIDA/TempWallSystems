import Link from "next/link";

export interface Crumb {
  name: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="container-wide"
      style={{ paddingTop: "var(--space-4)", paddingBottom: "var(--space-2)" }}
    >
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "var(--space-2)",
          listStyle: "none",
          padding: 0,
          margin: 0,
          fontSize: "var(--text-xs)",
          color: "var(--color-ink-4)",
        }}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.name} style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              {item.href && !isLast ? (
                <Link href={item.href} style={{ color: "var(--color-ink-3)" }}>
                  {item.name}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} style={{ color: "var(--color-ink-3)" }}>
                  {item.name}
                </span>
              )}
              {!isLast && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
