export const NOT_FOUND_VIEW_CONFIG = {
  code: "404",
  message: "this page could not be found.",
  backLabel: "← back to home",
  backHref: "/",
  className: {
    root: "flex min-h-dvh flex-col items-center justify-center bg-[var(--home-ground)] px-5 text-center text-[#ededed]",
    code: "mb-4 text-5xl font-semibold",
    message: "mb-8 font-mono text-sm text-[#8c8c8c]",
    back: "border-b border-[#8c8c8c] pb-0.5 font-mono text-sm hover:border-[#ededed]",
  },
} as const;
