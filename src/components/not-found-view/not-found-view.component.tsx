import Link from "next/link";

import { NOT_FOUND_VIEW_CONFIG as config } from "./not-found-view.config";

export function NotFoundView() {
  const { className } = config;
  return (
    <div className={className.root}>
      <h1 className={className.code}>{config.code}</h1>
      <p className={className.message}>{config.message}</p>
      <Link href={config.backHref} className={className.back}>
        {config.backLabel}
      </Link>
    </div>
  );
}
