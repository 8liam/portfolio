export const metadata = {
  title: "404 | Liam Grant",
};

export default function NotFound() {
  return (
    <div className="cli-root">
      <div
        className="cli-col"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "3rem", fontWeight: 600, marginBottom: "1rem" }}>
          404
        </div>
        <div className="cli-dim" style={{ marginBottom: "2rem" }}>
          this page could not be found.
        </div>
        <a href="/" style={{ color: "var(--cli-alt)" }}>
          ← back to home
        </a>
      </div>
    </div>
  );
}
