"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function VideoBand() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    const v = videoRef.current;
    if (!v) return;
    v.play();
    setPlaying(true);
  }

  return (
    <section
      className="section"
      style={{ background: "var(--color-paper-2)" }}
    >
      <div className="container-wide">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)",
            gap: "var(--space-12)",
            alignItems: "center",
          }}
          className="vb-grid"
        >
          <div>
            <p
              className="label-mono-accent"
              style={{ marginBottom: "var(--space-4)" }}
            >
              02 / See it in place
            </p>
            <h2
              className="display-head"
              style={{
                fontSize: "clamp(2rem, 3.6vw, 3rem)",
                lineHeight: 1.08,
                color: "var(--color-ink-0)",
                marginBottom: "var(--space-5)",
                maxWidth: "18ch",
              }}
            >
              Watch the installation.
            </h2>
            <p
              style={{
                fontSize: "var(--text-md)",
                color: "var(--color-ink-2)",
                lineHeight: 1.6,
                marginBottom: "var(--space-8)",
                maxWidth: "44ch",
              }}
            >
              See our modular wall system go up — quietly, cleanly, and around
              the work that has to keep moving.
            </p>

            {/* Proof stats — sealed and quiet, verifiable claims */}
            <ul className="vb-stats">
              <li>
                <div className="vb-stat-value">Up to 50%</div>
                <div className="vb-stat-label">Noise reduction</div>
              </li>
              <li>
                <div className="vb-stat-value">100%</div>
                <div className="vb-stat-label">Dust containment</div>
              </li>
            </ul>

            <a href="#contact" className="btn btn-ghost">
              Talk to our team
              <Arrow />
            </a>
          </div>

          {/* Real video player with branded navy poster overlay */}
          <div
            style={{
              position: "relative",
              aspectRatio: "16 / 9",
              background: "var(--color-paper-dark)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-rule-on-dark)",
              overflow: "hidden",
            }}
          >
            <video
              ref={videoRef}
              src="/tws-install.mp4"
              poster="/temporary-wall-installation-video-poster.jpg"
              controls={playing}
              playsInline
              preload="metadata"
              onEnded={() => setPlaying(false)}
              onPause={() => {
                // Show poster again if user pauses near the beginning
                const v = videoRef.current;
                if (v && v.currentTime < 0.5) setPlaying(false);
              }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 1,
              }}
            />

            {/* Branded poster overlay — fades out on play */}
            <button
              type="button"
              onClick={handlePlay}
              aria-label="Play install reel"
              className={`vb-poster ${playing ? "vb-poster--hidden" : ""}`}
            >
              {/* Background gradient */}
              <div aria-hidden className="vb-poster-bg" />
              {/* Faint blueprint grid texture */}
              <div aria-hidden className="vb-poster-grid" />

              {/* Top eyebrow + duration tag */}
              <div className="vb-poster-top">
                <span className="vb-poster-eyebrow">TWS · INSTALL REEL</span>
                <span className="vb-poster-duration">2:44</span>
              </div>

              {/* Center: logo + play */}
              <div className="vb-poster-center">
                <Image
                  src="/tws-logo-white.webp"
                  alt="TWS"
                  width={300}
                  height={143}
                  style={{
                    height: "80px",
                    width: "auto",
                    display: "block",
                    marginBottom: "var(--space-8)",
                  }}
                />
                <div className="vb-play-btn" aria-hidden>
                  <svg
                    width="22"
                    height="24"
                    viewBox="0 0 22 24"
                    fill="currentColor"
                  >
                    <path d="M2 2L20 12L2 22V2Z" />
                  </svg>
                </div>
                <span className="vb-poster-cta">Click to play</span>
              </div>

              {/* Bottom caption */}
              <div className="vb-poster-bottom">
                <span>SEE THE INSTALL · LIVE CORRIDOR · SEALED &amp; QUIET</span>
              </div>
            </button>
          </div>
        </div>

        <style jsx>{`
          /* ── Proof stats row ───────────────────────────────────── */
          .vb-stats {
            list-style: none;
            padding: var(--space-5) 0;
            margin: 0 0 var(--space-8);
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: var(--space-6);
            max-width: 32rem;
            border-top: 1px solid var(--color-rule-strong);
            border-bottom: 1px solid var(--color-rule-strong);
          }
          .vb-stat-value {
            font-family: var(--font-display);
            font-size: var(--text-2xl);
            font-weight: 700;
            color: var(--color-ink-0);
            line-height: 1;
            letter-spacing: -0.02em;
            margin-bottom: 6px;
          }
          .vb-stat-label {
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            font-weight: 500;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--color-ink-3);
          }

          /* ── Poster overlay ────────────────────────────────────── */
          .vb-poster {
            position: absolute;
            inset: 0;
            z-index: 2;
            border: none;
            padding: 0;
            margin: 0;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            transition: opacity 350ms var(--ease-out);
            background: transparent;
            font-family: inherit;
          }
          .vb-poster--hidden {
            opacity: 0;
            pointer-events: none;
          }
          /* Semi-transparent navy gradient — lets the video's first frame
             peek through, especially in the center where the logo + play
             button sit. Darker top + bottom for caption readability. */
          .vb-poster-bg {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              180deg,
              rgba(7, 21, 77, 0.88) 0%,
              rgba(7, 21, 77, 0.55) 30%,
              rgba(7, 21, 77, 0.50) 70%,
              rgba(7, 21, 77, 0.88) 100%
            );
            z-index: 0;
          }
          .vb-poster-grid {
            position: absolute;
            inset: 0;
            z-index: 0;
            opacity: 0.18;
            background-image:
              linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px);
            background-size: 60px 60px;
            mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%);
            -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%);
          }

          /* Top row — eyebrow + duration */
          .vb-poster-top {
            position: relative;
            z-index: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--space-5) var(--space-6);
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.7);
          }
          .vb-poster-eyebrow {
            color: var(--color-accent);
            font-weight: 600;
          }
          .vb-poster-duration {
            border: 1px solid rgba(255, 255, 255, 0.25);
            padding: 4px 8px;
            border-radius: var(--radius-xs);
            color: rgba(255, 255, 255, 0.85);
            font-weight: 500;
          }

          /* Center — logo + play button */
          .vb-poster-center {
            flex: 1;
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var(--space-3);
          }
          .vb-play-btn {
            width: 5rem;
            height: 5rem;
            border-radius: 9999px;
            background: var(--color-accent);
            color: var(--color-accent-ink);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 12px 36px rgba(192, 47, 10, 0.4),
                        0 0 0 8px rgba(192, 47, 10, 0.15);
            transition: transform var(--dur-base) var(--ease-out),
                        box-shadow var(--dur-base) var(--ease-out);
            padding-left: 4px;
          }
          .vb-poster:hover .vb-play-btn {
            transform: scale(1.06);
            box-shadow: 0 16px 48px rgba(192, 47, 10, 0.5),
                        0 0 0 12px rgba(192, 47, 10, 0.18);
          }
          .vb-poster:active .vb-play-btn {
            transform: scale(0.98);
          }
          .vb-poster-cta {
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            font-weight: 600;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.95);
            margin-top: var(--space-1);
            text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
          }

          /* Bottom row — small caption */
          .vb-poster-bottom {
            position: relative;
            z-index: 1;
            padding: var(--space-5) var(--space-6);
            font-family: var(--font-mono);
            font-size: 0.625rem;
            font-weight: 500;
            letter-spacing: 0.1em;
            color: rgba(255, 255, 255, 0.6);
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }

          @media (max-width: 900px) {
            :global(.vb-grid) {
              grid-template-columns: 1fr !important;
              gap: var(--space-8) !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      aria-hidden
    >
      <path
        d="M9 1L13 5L9 9M13 5H1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
