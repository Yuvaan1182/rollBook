import type { JSX, LazyExoticComponent } from "react";

export interface AppRoute {
  path: string;
  element: LazyExoticComponent<() => JSX.Element> | (() => JSX.Element);
  layout?: React.ComponentType<{ children: React.ReactNode }>;
  isPrivate?: boolean;
  roles?: string[];
}

