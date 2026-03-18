"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative z-10 min-h-screen flex items-center"
      style={{ paddingTop: "52px" }}
    >
      <div className="section-wrap w-full py-0 flex items-center min-h-screen">
        <motion.div
          className="w-full"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div
            className="terminal-card"
            variants={item}
            style={{ position: "relative", overflow: "hidden" }}
          >
            {/* ── Terminal title bar ── */}
            <div className="terminal-bar">
              <span className="t-dot" style={{ background: "#ff5f57" }} />
              <span className="t-dot" style={{ background: "#febc2e" }} />
              <span className="t-dot" style={{ background: "#28c840" }} />
              <span
                className="mx-auto"
                style={{ color: "var(--muted)", fontSize: "0.75rem" }}
              >
                bash — george_edwin — portfolio.sh
              </span>
            </div>

            {/* ── Body: text left | photo right ── */}
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                position: "relative",
              }}
            >
              {/* LEFT — text content */}
              <div
                style={{ flex: 1, padding: "2.5rem", zIndex: 2, minWidth: 0 }}
              >
                {/* Prompt */}
                <motion.div
                  variants={item}
                  className="flex gap-2 items-center font-mono text-sm mb-5"
                >
                  <span style={{ color: "var(--green-dim)" }}>~/portfolio</span>
                  <span style={{ color: "var(--muted)" }}>$</span>
                  <span style={{ color: "var(--text)" }}>
                    ./init.sh --user=george_edwin
                  </span>
                </motion.div>

                {/* Name */}
                <motion.h1
                  variants={item}
                  className="typewriter font-mono font-bold mb-5"
                  style={{
                    fontSize: "clamp(2.4rem, 5vw, 4rem)",
                    lineHeight: 1.05,
                  }}
                >
                  <span
                    style={{
                      color: "var(--green)",
                      textShadow: "0 0 30px rgba(0,255,136,0.4)",
                    }}
                  >
                    Cap_
                  </span>
                  <span style={{ color: "var(--text)" }}>Mojay</span>
                  <span
                    style={{
                      color: "var(--amber)",
                      textShadow: "0 0 30px rgba(245,158,11,0.35)",
                    }}
                  >
                    {"{dev}"}
                  </span>
                </motion.h1>

                {/* Role */}
                <motion.p
                  variants={item}
                  className="font-mono text-base mb-4"
                  style={{ color: "var(--blue)" }}
                >
                  Developer
                  <span style={{ color: "var(--muted)", margin: "0 10px" }}>
                    ·
                  </span>
                  Data Scientist
                  <span style={{ color: "var(--muted)", margin: "0 10px" }}>
                    ·
                  </span>
                  Educator
                </motion.p>

                {/* Bio */}
                <motion.p
                  variants={item}
                  className="font-mono text-sm mb-6 leading-relaxed"
                  style={{ color: "var(--muted)", maxWidth: "520px" }}
                >
                  Versatile technologist with a BSc in Computer Science and a{" "}
                  <span style={{ color: "var(--green)" }}>
                    Moringa School Data Science & ML certification
                  </span>
                  . I build intelligent systems, teach next-gen coders, and turn
                  messy data into{" "}
                  <span style={{ color: "var(--amber)" }}>clean decisions</span>
                  . Based in{" "}
                  <span style={{ color: "var(--blue)" }}>
                    Nairobi, Kenya 🇰🇪
                  </span>
                  .
                </motion.p>

                {/* CTAs */}
                <motion.div
                  variants={item}
                  className="flex gap-3 flex-wrap mb-6"
                >
                  <a href="#projects" className="btn btn-primary">
                    $ view projects
                  </a>
                  <a href="#contact" className="btn btn-outline">
                    $ get in touch
                  </a>
                  <a
                    href="/cv.pdf"
                    download="George_Edwin_CV.pdf"
                    className="btn btn-outline"
                    style={{
                      borderColor: "var(--amber)",
                      color: "var(--amber)",
                    }}
                  >
                    ↓ download CV
                  </a>
                </motion.div>

                {/* Status */}
                <motion.div
                  variants={item}
                  className="font-mono text-xs"
                  style={{ color: "var(--muted)" }}
                >
                  <span style={{ color: "var(--green-dim)" }}>~/portfolio</span>
                  {" $ "}
                  status: <span style={{ color: "var(--green)" }}>online</span>
                  {" · "}location:{" "}
                  <span style={{ color: "var(--amber)" }}>Nairobi, KE</span>
                  {" · "}mode:{" "}
                  <span style={{ color: "var(--blue)" }}>
                    building + teaching
                  </span>
                </motion.div>

                {/* Cursor */}
                <motion.div
                  variants={item}
                  className="font-mono text-xs mt-1"
                  style={{ color: "var(--muted)" }}
                >
                  <span style={{ color: "var(--green-dim)" }}>~/portfolio</span>
                  {" $"}
                  <span
                    style={{
                      color: "var(--green)",
                      borderRight: "2px solid var(--green)",
                      paddingRight: 2,
                      marginLeft: 6,
                      animation: "blink-caret 0.75s step-end infinite",
                    }}
                  >
                    _
                  </span>
                </motion.div>
              </div>

              {/* RIGHT — photo */}
              <motion.div
                variants={item}
                style={{
                  position: "relative",
                  width: "clamp(180px, 26%, 300px)",
                  flexShrink: 0,
                  alignSelf: "stretch",
                  overflow: "hidden",
                }}
              >
                {/* Photo fills entire right column */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    minHeight: "400px",
                  }}
                >
                  <Image
                    src="/avatar.png"
                    alt="George Mochama Edwin"
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 10%",
                      filter: "contrast(1.04) brightness(1.03)",
                    }}
                    priority
                  />

                  {/* Green gradient fade — bottom edge, dissolves photo into card */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "40%",
                      background:
                        "linear-gradient(to top, var(--bg2) 0%, rgba(22,27,34,0.7) 50%, transparent 100%)",
                      zIndex: 2,
                    }}
                  />

                  {/* Green tint wash at very bottom — the accent glow */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "18%",
                      background:
                        "linear-gradient(to top, rgba(0,255,136,0.08) 0%, transparent 100%)",
                      zIndex: 3,
                    }}
                  />

                  {/* Left edge fade — blends into text column */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      width: "45%",
                      background:
                        "linear-gradient(to right, var(--bg2) 0%, transparent 100%)",
                      zIndex: 2,
                    }}
                  />

                  {/* Right edge subtle green line */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bottom: 0,
                      width: "2px",
                      background:
                        "linear-gradient(to bottom, transparent 0%, rgba(0,255,136,0.25) 50%, transparent 100%)",
                      zIndex: 3,
                    }}
                  />

                  {/* Terminal filename label */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "12px",
                      zIndex: 4,
                      fontFamily: "Fira Code, monospace",
                      fontSize: "0.62rem",
                      color: "rgba(0,255,136,0.5)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    // george_edwin.jpg
                  </div>
                </div>
              </motion.div>
            </div>
            {/* end flex row */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
