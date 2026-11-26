import { HOME_INTRO_CONFIG as config } from "./home-intro.config";

export function HomeIntro() {
  const { className } = config;
  return (
    <div className={className.root}>
      <h1 className={className.headline}>
        <span className="sr-only">{config.srPrefix}</span>
        {config.headline}
      </h1>
      <div className={className.row}>
        <p className={className.tagline}>{config.tagline}</p>
        <a href={`mailto:${config.email}`} className={className.email}>
          {config.email}
        </a>
      </div>
    </div>
  );
}
