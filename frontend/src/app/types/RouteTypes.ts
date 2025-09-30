import type { JSX, LazyExoticComponent } from "react";

export interface AppRoute {
  path: string;
  element: LazyExoticComponent<() => JSX.Element> | (() => JSX.Element);
  layout?: React.ComponentType<{ children: React.ReactNode }>;
  isPrivate?: boolean;
  isRestrictedPublic?: boolean; // 👈 blocks logged-in users
  roles?: string[];
}
