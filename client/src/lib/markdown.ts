/**
 * Minimal, dependency-free Markdown -> semantic HTML renderer for the authored
 * content in content.ts. Emits real <h2>/<h3>, <ul>/<ol>/<li>, <p> and <strong>
 * (not <br>-joined text), which both reads better and is far more extractable by
 * answer engines than the previous inline formatter.
 *
 * Supported subset: #/##/### headings, "- " bullets, "1. " numbered lists,
 * **bold**, [text](url) links, and blank-line-separated paragraphs.
 */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    );
}

export function renderMarkdown(md: string, opts: { dropH1?: boolean } = {}): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let para: string[] = [];

  const closeList = () => {
    if (listType) {
      out.push(`</${listType}>`);
      listType = null;
    }
  };
  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${inline(para.join(" "))}</p>`);
      para = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      closeList();
      continue;
    }
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      flushPara();
      closeList();
      const level = h[1].length;
      if (level === 1) {
        if (!opts.dropH1) out.push(`<h1>${inline(h[2])}</h1>`);
      } else {
        out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      }
      continue;
    }
    const ul = line.match(/^[-*]\s+(.*)$/);
    if (ul) {
      flushPara();
      if (listType !== "ul") {
        closeList();
        out.push("<ul>");
        listType = "ul";
      }
      out.push(`<li>${inline(ul[1])}</li>`);
      continue;
    }
    const ol = line.match(/^\d+\.\s+(.*)$/);
    if (ol) {
      flushPara();
      if (listType !== "ol") {
        closeList();
        out.push("<ol>");
        listType = "ol";
      }
      out.push(`<li>${inline(ol[1])}</li>`);
      continue;
    }
    closeList();
    para.push(line);
  }
  flushPara();
  closeList();
  return out.join("\n");
}

/** Plain-text word count of authored Markdown, for reading-time estimates. */
export function wordCount(md: string): number {
  return md.replace(/[#*\-\[\]()]/g, " ").split(/\s+/).filter(Boolean).length;
}
