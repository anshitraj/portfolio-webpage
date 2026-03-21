import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 dark:bg-black">
      <Card className="mx-4 w-full max-w-md border-zinc-200/80 bg-white dark:border-white/10 dark:bg-zinc-950">
        <CardContent className="pt-6">
          <div className="mb-4 flex gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
