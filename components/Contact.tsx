"use client";
import { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";

// ── EmailJS credentials ──────────────────
const EMAILJS_SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE!;
const EMAILJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE!;
const EMAILJS_PUBLIC = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC!;
// ────────────────────────────────────────────────────────────────

const COMMANDS: Record<string, { t: string; v: string }[]> = {
  help: [
    { t: "amber", v: "Available commands:" },
    { t: "", v: "  whoami     — learn about George Edwin" },
    { t: "", v: "  skills     — list technical skills" },
    { t: "", v: "  projects   — view featured projects" },
    { t: "", v: "  contact    — get contact info" },
    { t: "", v: "  hire       — why you should hire me" },
    { t: "", v: "  education  — academic background" },
    { t: "", v: "  clear      — clear terminal" },
  ],
  whoami: [
    { t: "green", v: "George Mochama Edwin — aka Cap_Mojay{dev}" },
    { t: "", v: "BSc Computer Science · Moringa DS & ML Grad" },
    { t: "", v: "ICT Tutor @ Eastlands College of Technology" },
    { t: "blue", v: "Nairobi, Kenya 🇰🇪 · Available for work & freelance" },
  ],
  skills: [
    { t: "amber", v: "[ Languages ]" },
    { t: "", v: "  Python · SQL · HTML/CSS · JavaScript" },
    { t: "amber", v: "[ Data Science & ML ]" },
    { t: "", v: "  Pandas · NumPy · Scikit-learn · TensorFlow" },
    { t: "amber", v: "[ Dev & Tools ]" },
    { t: "", v: "  Next.js · FastAPI · Git · Jupyter · Excel" },
    { t: "amber", v: "[ Soft Skills ]" },
    { t: "", v: "  CBET Teaching · Curriculum Design · Problem-solving" },
  ],
  projects: [
    {
      t: "green",
      v: "→ Nairobi Housing Price Predictor  [Python, Scikit-learn]",
    },
    {
      t: "green",
      v: "→ Swahili Sentiment Analyser       [HuggingFace, FastAPI]",
    },
    {
      t: "green",
      v: "→ County Health Dashboard          [Next.js, D3.js, SQL]",
    },
    {
      t: "green",
      v: "→ CBET Lesson Plan Generator       [Python, OpenAI API]",
    },
    {
      t: "blue",
      v: "Scroll up or visit the Projects section for full details.",
    },
  ],
  contact: [
    { t: "amber", v: "Reach me at:" },
    { t: "", v: "  Email:    edwingeorge521@gmail.com" },
    { t: "", v: "  Phone:    0792413847" },
    { t: "", v: "  GitHub:   github.com/mojay6111" },
    { t: "", v: "  LinkedIn: linkedin.com/in/george-edwin-ke" },
  ],
  hire: [
    { t: "green", v: "✓ Full-stack + ML skill set" },
    { t: "green", v: "✓ Real classroom and project delivery experience" },
    {
      t: "green",
      v: "✓ Strong communicator — I teach complex tech to beginners",
    },
    { t: "green", v: "✓ Detail-oriented, curious, structured thinker" },
    {
      t: "green",
      v: "✓ Immediately available · Nairobi-based · Open to remote",
    },
    { t: "amber", v: "Let's build something great together." },
  ],
  education: [
    {
      t: "blue",
      v: "Moringa School          — Data Science, AI & ML  (2024–2025)",
    },
    {
      t: "blue",
      v: "Kenya School of TVET    — Diploma Tech Trainer Ed (2023–2025)",
    },
    {
      t: "blue",
      v: "Garissa University      — BSc Computer Science    (2018–2022)",
    },
  ],
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("visible", e.isIntersecting),
        ),
      { threshold: 0.1 },
    );
    sectionRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addLine = (cls: string, text: string) => {
    const d = document.createElement("div");
    d.className =
      "font-mono text-xs leading-relaxed" + (cls ? ` text-[${cls}]` : "");
    d.style.color =
      cls === "green"
        ? "var(--green)"
        : cls === "amber"
          ? "var(--amber)"
          : cls === "blue"
            ? "var(--blue)"
            : cls === "red"
              ? "var(--red)"
              : "var(--muted)";
    d.textContent = text;
    outputRef.current?.appendChild(d);
    if (outputRef.current)
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
  };

  const handleCmd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !inputRef.current) return;
    const cmd = inputRef.current.value.trim().toLowerCase();
    inputRef.current.value = "";
    addLine("", `~/contact $ ${cmd}`);
    if (!cmd) return;

    if (cmd === "clear") {
      if (outputRef.current) outputRef.current.innerHTML = "";
      addLine("green", "Terminal cleared.");
      return;
    }

    const result = COMMANDS[cmd] ?? [
      { t: "red", v: `command not found: ${cmd}. Type 'help' for options.` },
    ];
    result.forEach((r) => addLine(r.t, r.v));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name: form.name,
          reply_to: form.email,
          subject: form.subject,
          message: form.message,
        },
        EMAILJS_PUBLIC,
      );
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative z-10">
      <div className="section-wrap">
        <div className="section-header reveal">
          <span className="section-prompt">./contact.sh --open</span>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-line" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left — info + mini terminal */}
          <div className="reveal">
            <p
              className="font-mono text-sm leading-relaxed mb-6"
              style={{ color: "var(--muted)" }}
            >
              Whether you have a project, a role to fill, or just want to talk
              tech — my inbox is always open. Let's build something great
              together.
            </p>

            {/* Contact links */}
            <div className="space-y-3 mb-6">
              {[
                {
                  icon: "GH",
                  label: "github.com/mojay6111",
                  href: "https://github.com/mojay6111",
                },
                {
                  icon: "LI",
                  label: "linkedin.com/in/george-edwin-ke",
                  href: "#",
                },
                { icon: "TW", label: "@Cap_Mojay", href: "#" },
                {
                  icon: "✉",
                  label: "edwingeorge521@gmail.com",
                  href: "mailto:edwingeorge521@gmail.com",
                },
                { icon: "📞", label: "0792413847", href: "tel:+254792413847" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-mono text-sm no-underline transition-colors"
                  style={{ color: "var(--muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--green)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--muted)")
                  }
                >
                  <span
                    className="w-8 h-8 flex items-center justify-center rounded-md text-xs border flex-shrink-0"
                    style={{
                      background: "var(--bg3)",
                      borderColor: "var(--border)",
                      color: "var(--green)",
                    }}
                  >
                    {l.icon}
                  </span>
                  {l.label}
                </a>
              ))}
            </div>

            {/* Mini terminal */}
            <div className="terminal-card">
              <div className="terminal-bar">
                <span className="t-dot" style={{ background: "#ff5f57" }} />
                <span className="t-dot" style={{ background: "#febc2e" }} />
                <span className="t-dot" style={{ background: "#28c840" }} />
                <span className="ml-2">try it — type &apos;help&apos;</span>
              </div>
              <div
                ref={outputRef}
                className="p-4 min-h-[120px] max-h-[180px] overflow-y-auto space-y-0.5"
              >
                <div
                  className="font-mono text-xs"
                  style={{ color: "var(--green)" }}
                >
                  Cap_Mojay terminal v1.0.0
                </div>
                <div
                  className="font-mono text-xs"
                  style={{ color: "var(--muted)" }}
                >
                  Type <span style={{ color: "var(--amber)" }}>help</span> to
                  see available commands.
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 pb-3 font-mono text-xs">
                <span style={{ color: "var(--green-dim)" }}>~/contact $</span>
                <input
                  ref={inputRef}
                  onKeyDown={handleCmd}
                  className="flex-1 bg-transparent border-none outline-none font-mono text-xs"
                  style={{ color: "var(--text)" }}
                  placeholder="enter command..."
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>

          {/* Right — EmailJS form */}
          <div className="reveal" style={{ transitionDelay: "0.15s" }}>
            <div className="terminal-card">
              <div className="terminal-bar">
                <span
                  className="t-dot"
                  style={{ background: "var(--green)" }}
                />
                <span>send_message.sh</span>
              </div>
              <div className="p-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    {
                      label: "// your name",
                      key: "name",
                      type: "text",
                      ph: "John Doe",
                    },
                    {
                      label: "// your email",
                      key: "email",
                      type: "email",
                      ph: "john@example.com",
                    },
                    {
                      label: "// subject",
                      key: "subject",
                      type: "text",
                      ph: "Let's work together",
                    },
                  ].map((f) => (
                    <div key={f.key}>
                      <label
                        className="block font-mono text-xs mb-1"
                        style={{ color: "var(--muted)" }}
                      >
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        placeholder={f.ph}
                        className="form-input"
                        value={(form as any)[f.key]}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            [f.key]: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      className="block font-mono text-xs mb-1"
                      style={{ color: "var(--muted)" }}
                    >
                      // message
                    </label>
                    <textarea
                      className="form-textarea"
                      placeholder="Tell me about your project or opportunity..."
                      value={form.message}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full justify-center"
                    disabled={status === "sending"}
                  >
                    {status === "idle" && "$ send --message"}
                    {status === "sending" && "$ sending..."}
                    {status === "sent" && "✓ message sent!"}
                    {status === "error" && "✕ error — try email directly"}
                  </button>

                  {status === "sent" && (
                    <p
                      className="font-mono text-xs text-center"
                      style={{ color: "var(--green)" }}
                    >
                      Got it! I&apos;ll reply to {form.email || "you"} shortly.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
