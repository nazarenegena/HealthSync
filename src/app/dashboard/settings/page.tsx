// `app/page.tsx` is the UI for the `/` URL
"use client";

import { useAuth } from "@/contexts/AuthenticationContext";

export default function Page() {
  const { user } = useAuth();
  return (
    <h1>
      Settings Page
      {/* anthropometrics */}
      <div className="flex justify-between gap-8 my-6 border border-muted-foreground/10 w-full px-3 py-4 rounded-md">
        <div>
          <p className="text-sm font-medium">65kg</p>
          <p className="text-sm text-muted-foreground/75 mt-1">Weight</p>
        </div>
        <div>
          <p className="text-sm font-medium">170cm</p>
          <p className="text-sm text-muted-foreground/75 mt-1">height</p>
        </div>
        <div>
          <p className="text-sm font-medium">25</p>
          <p className="text-sm text-muted-foreground/75 mt-1">Age</p>
        </div>
      </div>
    </h1>
  );
}
