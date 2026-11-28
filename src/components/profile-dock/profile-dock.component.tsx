import Image from "next/image";

import { PROFILE_DOCK_CONFIG as config } from "./profile-dock.config";

export function ProfileDock() {
  const { className } = config;
  return (
    <nav aria-label={config.navLabel} className={className.nav}>
      <Image
        src={config.portrait.src}
        alt={config.portrait.alt}
        width={config.portrait.size}
        height={config.portrait.size}
        unoptimized={config.portrait.unoptimized}
        className={className.portrait}
      />
      <div className={className.identity}>
        <b className={className.name}>{config.name}</b>
        <span className={className.handle}>{config.handle}</span>
      </div>
      <i aria-hidden className={className.divider} />
      {config.links.map((link) => (
        <a
          key={link.id}
          href={link.href}
          target={config.linkTarget}
          rel={config.linkRel}
          aria-label={link.label}
          className={className.link}
        >
          <svg viewBox={link.viewBox} aria-hidden className={className.icon}>
            <path d={link.path} />
          </svg>
        </a>
      ))}
    </nav>
  );
}
