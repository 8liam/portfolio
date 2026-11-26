export const HOME_INTRO_CONFIG = {
  headline: "I work with agents.",
  srPrefix: "Liam Grant: ",
  tagline: "Software engineer, Gold Coast.",
  email: "liamgrantdev@gmail.com",
  className: {
    root: "flex flex-col items-center px-5 pb-28 pt-8 text-center desktop-fit:pb-24 desktop-fit:pt-5",
    headline:
      "text-[clamp(34px,6vw,56px)] font-semibold leading-[1.05] tracking-[-0.035em] text-[#ededed] desktop-fit:text-[clamp(28px,4.4vh,48px)]",
    row: "mt-5 flex flex-col items-center gap-3 desktop-fit:mt-2.5 desktop-fit:flex-row desktop-fit:items-baseline desktop-fit:gap-[18px]",
    tagline: "text-base text-[#8c8c8c]",
    email:
      "border-b border-[#8c8c8c] pb-0.5 font-mono text-sm text-[#ededed] hover:border-[#ededed]",
  },
} as const;
