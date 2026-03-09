'use client';

/**
 * Client-side JSON-LD component
 * This component must be client-side to use JSX in the jsonld utilities
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      suppressHydrationWarning
    />
  );
}
