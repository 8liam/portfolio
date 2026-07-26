"use client";
import { sections, BANNER } from "./content";

const LINK = /(https?:\/\/\S+|[\w.+-]+@[\w-]+\.[\w.]+)/g;

function Line({ line }) {
  if (line.node) return <div>{line.node}</div>;
  const parts = line.text.split(LINK);
  return (
    <div className={line.cls || ""}>
      {parts.map((part, i) =>
        i % 2 ? (
          <a
            key={i}
            href={part.includes("@") ? `mailto:${part}` : part}
            target="_blank"
            rel="noreferrer"
          >
            {part}
          </a>
        ) : (
          part
        ),
      )}
      {line.text === "" ? " " : null}
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="cli-root">
      <div className="cli-col">
        <div className="cli-banner">
          {BANNER.map((line, i) => (
            <Line key={i} line={line} />
          ))}
        </div>
        <div className="cli-dim cli-block" style={{ marginTop: "1rem" }}>
          {"makes computers do things · gold coast, australia"}
        </div>
        {sections().map((s) => (
          <section key={s.id} id={s.id} className="cli-block">
            <h2 className="cli-rule">
              <span className="cli-acc">✻</span>
              {s.label}
            </h2>
            {s.lines.map((line, i) => (
              <Line key={i} line={line} />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
