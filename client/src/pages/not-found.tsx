import { Link } from "wouter";
import { TrailPage } from "@/components/trail/Parts";

export default function NotFound() {
  return (
    <TrailPage>
      <section className="notfound">
        <div className="w">
          <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-.03em" }}>This trail doesn't go anywhere.</h1>
          <p style={{ margin: "14px auto 26px", color: "var(--ink-2)", maxWidth: "44ch" }}>
            The page may have moved in the redesign. Start from the home page or jump to a city.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="btn go" href="/">Home</Link>
            <Link className="btn alt" href="/neighborhoods">Neighborhoods</Link>
          </div>
        </div>
      </section>
    </TrailPage>
  );
}
