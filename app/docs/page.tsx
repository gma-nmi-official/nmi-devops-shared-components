import { Suspense } from "react";
import { DocsFrame } from "./docs-frame";

export const metadata = {
  title: "Interactive component documentation | NMI DevOps Shared Components",
  description: "Interactive Storybook documentation for the shared component package.",
};

export default function DocsPage() {
  return (
    <Suspense fallback={<main style={{ minHeight: "100vh" }} />}>
      <DocsFrame basePath={process.env.NEXT_PUBLIC_BASE_PATH ?? ""} />
    </Suspense>
  );
}
