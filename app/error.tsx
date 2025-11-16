"use client";

import { useEffect } from "react";
import { formatError } from "../utils/formatError";

export default function GlobalRouteError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
     
    console.error("Route error:", formatError(error));
  }, [error]);

  return (
    <div role="alert">
      <h2>Something went wrong.</h2>
      <p>We couldn&apos;t load this page. You can try again.</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}

