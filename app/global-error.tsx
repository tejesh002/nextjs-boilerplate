"use client";

import { useEffect } from "react";
import { formatError } from "../utils/formatError";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("Global app error:", formatError(error));
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main>
          <h1>Unexpected error</h1>
          <p>Something went wrong while rendering the application.</p>
          <button type="button" onClick={reset}>
            Reload app
          </button>
        </main>
      </body>
    </html>
  );
}

