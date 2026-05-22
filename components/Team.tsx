import Image from "next/image";

type Member = {
  name: string;
  title: string;
  photo: string;
  badge?: string;
  contact?: string;
  contactHref?: string;
  /** Optional CSS filter for per-photo color correction. */
  imgFilter?: string;
};

const TEAM: Member[] = [
  {
    name: "Adam Starr",
    title: "Owner",
    photo: "/team/adam-starr.jpg",
    badge: "01",
  },
  {
    name: "Allen Dionne",
    title: "Owner",
    photo: "/team/allen-dionne.jpg",
    badge: "02",
  },
  {
    name: "Nick Thomson",
    title: "Senior Business Development",
    photo: "/team/nick-thomson.png?v=3",
    badge: "03",
    contact: "(561) 777-4958",
    contactHref: "tel:+15617774958",
    imgFilter: "brightness(1.18) contrast(1.05)",
  },
];

export function Team() {
  return (
    <section
      id="team"
      className="section"
      style={{
        background: "var(--color-paper-0)",
        color: "var(--color-ink-1)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            flexWrap: "wrap",
            gap: "var(--space-6)",
            marginBottom: "var(--space-12)",
          }}
        >
          <div>
            <p
              className="label-mono-accent"
              style={{ marginBottom: "var(--space-3)" }}
            >
              05 / Meet the team
            </p>
            <h2
              className="display-head"
              style={{
                fontSize: "clamp(2rem, 3.6vw, 3rem)",
                lineHeight: 1.05,
                maxWidth: "22ch",
                margin: 0,
                color: "var(--color-ink-0)",
              }}
            >
              Real people on the other end of the form.
            </h2>
          </div>
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-ink-3)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.04em",
              maxWidth: "28ch",
              textAlign: "right",
              margin: 0,
            }}
            className="team-meta"
          >
            Three names. Three numbers. No call-center.
          </p>
        </div>

        <ul className="team-grid">
          {TEAM.map((member) => (
            <li key={member.name} className="team-card">
              <div className="team-photo-wrap">
                <span className="team-badge">{member.badge}</span>
                <div className="team-photo-circle">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={400}
                    height={400}
                    sizes="(max-width: 768px) 70vw, 220px"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: member.imgFilter,
                    }}
                  />
                </div>
              </div>

              <div className="team-meta-row">
                <div>
                  <div className="team-name">{member.name}</div>
                  <div className="team-title">{member.title}</div>
                </div>
                {member.contact && (
                  <a href={member.contactHref} className="team-contact">
                    {member.contact}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .team-grid {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--space-8);
        }
        .team-card {
          background: var(--color-paper-dark);
          color: var(--color-ink-on-dark);
          border-radius: var(--radius-sm);
          padding: var(--space-8) var(--space-6) var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
          transition: transform var(--dur-base) var(--ease-out),
                      box-shadow var(--dur-base) var(--ease-out);
          box-shadow: 0 12px 28px rgba(7, 21, 77, 0.18),
                      0 4px 8px rgba(7, 21, 77, 0.08);
        }
        .team-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(7, 21, 77, 0.24),
                      0 6px 12px rgba(7, 21, 77, 0.12);
        }
        .team-photo-wrap {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .team-badge {
          position: absolute;
          top: 0;
          left: 0;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--color-ink-on-dark-soft);
        }
        .team-photo-circle {
          width: 180px;
          height: 180px;
          border-radius: 9999px;
          overflow: hidden;
          background: var(--color-paper-3);
          position: relative;
          isolation: isolate;
          box-shadow: 0 0 0 7px var(--color-ink-on-dark);
          transition: box-shadow var(--dur-base) var(--ease-out);
        }
        .team-card:hover .team-photo-circle {
          box-shadow: 0 0 0 9px var(--color-ink-on-dark);
        }
        /* Photos render in natural color — no grayscale, no tint overlay */
        .team-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--space-4);
          padding-top: var(--space-5);
          border-top: 1px solid var(--color-rule-on-dark);
        }
        .team-name {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 600;
          color: var(--color-ink-on-dark);
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .team-title {
          margin-top: 2px;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-ink-on-dark-soft);
          white-space: nowrap;
        }
        .team-contact {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--color-accent);
          text-decoration: none;
          white-space: nowrap;
          transition: color var(--dur-fast) var(--ease-out);
        }
        .team-contact:hover {
          color: var(--color-accent-hover);
        }
        @media (max-width: 900px) {
          .team-grid {
            grid-template-columns: 1fr;
            gap: var(--space-5);
            max-width: 28rem;
            margin-inline: auto;
          }
          .team-meta { text-align: left !important; }
        }
      `}</style>
    </section>
  );
}
