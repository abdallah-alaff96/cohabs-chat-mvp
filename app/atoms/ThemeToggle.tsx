"use client";

import { useEffect, useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center gap-2">
      <label
        className="text-sm text-gray-600 dark:text-gray-400"
        htmlFor="theme-toggle"
      >
        {isDark ? "Dark" : "Light"}
      </label>
      <Switch.Root
        id="theme-toggle"
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className="relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-200 transition-colors data-[state=checked]:bg-brand dark:bg-gray-700"
        aria-label="Toggle theme"
      >
        <Switch.Thumb className="block h-5 w-5 translate-x-0 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-5 dark:bg-gray-100" />
      </Switch.Root>
    </div>
  );
}
