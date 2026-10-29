import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function DocumentationShell({ children }: { children: ReactNode }) {
  return (
    <div className="docs-site">
      <a className="docs-skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="docs-header">
        <div className="docs-header__inner">
          <Link
            aria-label="NMI DevOps Shared Components home"
            className="docs-brand"
            href="/"
          >
            <Image
              alt=""
              className="docs-brand__logo"
              height={41}
              priority
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/nmi-logo-dark-bg.svg`}
              width={88}
            />
            <span className="docs-brand__copy">
              <strong>Shared Components</strong>
              <small>Developer documentation</small>
            </span>
          </Link>
          <nav aria-label="Primary navigation" className="docs-navigation">
            <Link href="/catalog">Component guides</Link>
            <Link href="/docs">Storybook</Link>
            <Link href="/docs/?path=/docs/releases-changelog--latest">
              Releases
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="docs-footer">
        <div>
          <strong>NMI DevOps Shared Components</strong>
          <span>Accessible building blocks for GNO portal teams.</span>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/catalog">Guides</Link>
          <Link href="/docs">Storybook</Link>
        </nav>
      </footer>
    </div>
  );
}
