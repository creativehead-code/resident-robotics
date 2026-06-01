"use client";

import Magnetic from "@/components/ui/Magnetic";

type Variant = "orange" | "blue" | "yellow" | "light" | "ghost";
type Size = "sm" | "md" | "lg";

export default function Button({
  href = "#",
  children,
  variant = "orange",
  size = "md",
  arrow = true,
  magnetic = false,
  className = "",
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  magnetic?: boolean;
  className?: string;
}) {
  const sizeClass = size === "lg" ? "btn-lg" : size === "sm" ? "btn-sm" : "";
  const el = (
    <a href={href} className={`btn btn-${variant} ${sizeClass} ${className}`}>
      <span>{children}</span>
      {arrow && (
        <span className="btn-arrow" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h9M8.5 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </a>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
