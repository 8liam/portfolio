"use client";
import { useEffect, useState } from "react";
import journeyData from "../../data/journey.json";
import projectData from "../../data/projects.json";

const L = (text = "", cls = "") => ({ text, cls });
const P = (text) => ({ text, cls: "cli-wrap" });
const GAP = L("");

export const BANNER = [
  " ██╗     ██╗ █████╗ ███╗   ███╗",
  " ██║     ██║██╔══██╗████╗ ████║",
  " ██║     ██║███████║██╔████╔██║",
  " ██║     ██║██╔══██║██║╚██╔╝██║",
  " ███████╗██║██║  ██║██║ ╚═╝ ██║",
  " ╚══════╝╚═╝╚═╝  ╚═╝╚═╝     ╚═╝",
].map((t) => L(t, "cli-acc"));

/* ── github activity ───────────────────────────────────────── */

const MONTHS = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];

function useContributions() {
  const [state, setState] = useState({ status: "loading" });
  useEffect(() => {
    fetch("/api/github/contributions")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setState({ status: "ok", data }))
      .catch(() => setState({ status: "error" }));
  }, []);
  return state;
}

/* stats and a bar per month — no calendar grid */
function GraphStats({ data }) {
  const days = data.contributions;

  let longest = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }

  let i = days.length - 1;
  if (days[i]?.count === 0) i--; // today may just not have happened yet
  let current = 0;
  for (; i >= 0 && days[i].count > 0; i--) current++;

  const best = days.reduce((a, b) => (b.count > a.count ? b : a), days[0]);
  const perWeek = (data.totalContributions / (days.length / 7)).toFixed(1);

  const months = [];
  for (const d of days) {
    const key = d.date.slice(0, 7);
    const last = months[months.length - 1];
    if (last?.key === key) last.total += d.count;
    else months.push({ key, total: d.count });
  }
  const max = Math.max(...months.map((m) => m.total), 1);
  const WIDTH = 24; // fits a 320px screen without folding

  const stat = (k, v) => (
    <div key={k}>
      <span className="cli-dim">{k.padEnd(16)}</span>
      {v}
    </div>
  );

  return (
    <>
      {stat("total", `${data.totalContributions} commits`)}
      {stat("average", `${perWeek} / week`)}
      {stat("current streak", `${current} day${current === 1 ? "" : "s"}`)}
      {stat("longest streak", `${longest} day${longest === 1 ? "" : "s"}`)}
      {stat("busiest day", `${best.count} on ${best.date}`)}
      <div> </div>
      {months.map((m) => {
        const fill = Math.round((m.total / max) * WIDTH);
        return (
          <div key={m.key}>
            <span className="cli-dim">
              {(MONTHS[Number(m.key.slice(5)) - 1] + " " + m.key.slice(2, 4)).padEnd(8)}
            </span>
            <span className="cli-acc">{"█".repeat(fill)}</span>
            <span style={{ color: "var(--cli-line)" }}>{"█".repeat(WIDTH - fill)}</span>
            <span className="cli-dim">{"  " + m.total}</span>
          </div>
        );
      })}
    </>
  );
}

function Contributions() {
  const state = useContributions();
  if (state.status !== "ok")
    return (
      <div className="cli-dim">
        {state.status === "loading"
          ? "fetching github activity…"
          : "github unreachable."}
      </div>
    );

  return (
    <div>
      <GraphStats data={state.data} />
      <div className="cli-dim" style={{ marginTop: "0.75rem" }}>
        {state.data.totalContributions} contributions in the last year ·{" "}
        <a href="https://github.com/8liam" target="_blank" rel="noreferrer">
          @{state.data.username}
        </a>
      </div>
    </div>
  );
}

/* ── sections ──────────────────────────────────────────────── */

const about = () => [
  L("Liam Grant", "cli-b"),
  L("Gold Coast, QLD, Australia"),
  GAP,
  P("full stack engineer. big ai guy"),
];

const entries = (education) =>
  journeyData.experiences
    .filter((e) => !!e.education === education)
    .flatMap((e, i) => [
      ...(i ? [GAP] : []),
      L(
        `${e.current ? "●" : "○"} ${e.company} — ${e.position}`,
        e.current ? "cli-acc cli-b" : "cli-b",
      ),
      L(`  ${e.duration}${e.current ? "   [current]" : ""}`, "cli-dim"),
      ...e.points.map((p) => P(`  • ${p}`)),
    ]);

const projects = () =>
  projectData.projects.flatMap((p, i) => [
    ...(i ? [GAP] : []),
    L(`● ${p.name}`, "cli-acc cli-b"),
    L(`  ${p.tagline}`, "cli-dim"),
    L(`  ${p.languages.join(" / ")}`, "cli-blu"),
    P(`  ${p.description}`),
    ...(p.url ? [L(`  ${p.urlTitle.padEnd(18)} ${p.url}`)] : []),
    ...(p.githubURL
      ? [L(`  ${p.githubURLTitle.padEnd(18)} ${p.githubURL}`)]
      : []),
  ]);

// the joke is the list, so it lives here rather than in languages.json
const stack = () =>
  ["Claude Code", "TypeScript", "Everything else"].map((n) => L(`  ${n}`));

const contact = () => [
  L("  email      liamgrantdev@gmail.com"),
  L("  github     https://github.com/8liam"),
  L("  linkedin   https://linkedin.com/in/liamgrantdev"),
];

export const sections = () => [
  { id: "about", label: "about", lines: about() },
  { id: "work", label: "work", lines: entries(false) },
  { id: "education", label: "education", lines: entries(true) },
  { id: "projects", label: "projects", lines: projects() },
  { id: "stack", label: "stack", lines: stack() },
  { id: "github", label: "github", lines: [{ node: <Contributions /> }] },
  { id: "contact", label: "contact", lines: contact() },
];
