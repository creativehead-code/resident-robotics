"use client";

import { Component, type ReactNode } from "react";

/** Catches render errors in a subtree (e.g. the WebGL canvas) so a single
 *  failing component can never blank the whole page. Shows `fallback`. */
export default class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error("[Hero canvas] failed, showing fallback:", error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}
