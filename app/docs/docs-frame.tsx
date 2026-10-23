"use client";

import { useSearchParams } from "next/navigation";

export function DocsFrame({ basePath }: { basePath: string }) {
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  return (
    <main style={{ minHeight: "100vh" }}>
      <iframe
        title="NMI DevOps Shared Components interactive documentation"
        src={`${basePath}/storybook/index.html${query ? `?${query}` : ""}`}
        style={{ border: 0, display: "block", height: "100vh", width: "100%" }}
      />
    </main>
  );
}
