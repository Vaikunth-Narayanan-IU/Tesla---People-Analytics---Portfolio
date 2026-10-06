"use client";

import { useEffect } from "react";
import { AlertCircle, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-6 text-center">
      <Card className="max-w-md w-full border-teslaRed/50 bg-panel/80">
        <CardContent className="pt-6 space-y-6 flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-teslaRed/10 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-teslaRed" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight">Data Connection Error</h2>
            <p className="text-sm text-muted">
              The application encountered a problem communicating with the database.
            </p>
          </div>

          <div className="text-left bg-black/50 p-4 rounded-md w-full overflow-x-auto border border-panelBorder/50">
            <p className="text-xs font-mono text-teslaRed break-all">
              {error.message || "Unknown Prisma or Server Error"}
            </p>
          </div>

          <div className="space-y-4 text-sm text-muted text-left w-full">
            <p className="font-semibold text-white flex items-center gap-2">
              <Database className="h-4 w-4"/> Troubleshooting Steps:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Ensure you have added the <code>DATABASE_URL</code> environment variable in your Vercel project settings.</li>
              <li>Verify that the Supabase connection string is correct and the database is active.</li>
              <li>Make sure you ran <code>npx prisma db push</code> to create the tables in your Supabase database.</li>
              <li>Make sure you ran <code>npx prisma db seed</code> to populate the synthetic data.</li>
            </ol>
          </div>

          <button
            onClick={() => reset()}
            className="w-full bg-panelBorder hover:bg-white/10 text-white font-semibold py-2 rounded transition-colors text-sm"
          >
            Try Again
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
