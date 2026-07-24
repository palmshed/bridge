export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-serif mb-4" style={{ color: "var(--text)" }}>
        Bridge
      </h1>
      <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
        Reusable native integrations for web applications.
      </p>
      <div
        className="rounded-lg p-6 max-w-md w-full"
        style={{
          border: "1px solid var(--border)",
          background: "var(--bg)",
        }}
      >
        <h2
          className="text-xl font-serif mb-4"
          style={{ color: "var(--text)" }}
        >
          Example App
        </h2>
        <p className="mb-4" style={{ color: "var(--muted)" }}>
          This is a development playground for testing Bridge plugins. Install
          plugins from <code className="font-mono text-sm">packages/</code> and
          use them here.
        </p>
        <div className="flex gap-3">
          <a
            href="https://github.com/palmshed/bridge"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded text-sm font-medium"
            style={{
              background: "var(--accent)",
              color: "#fff",
            }}
          >
            GitHub
          </a>
          <a
            href="https://github.com/palmshed/bridge/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded text-sm font-medium"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          >
            Contributing
          </a>
        </div>
      </div>
    </main>
  );
}
