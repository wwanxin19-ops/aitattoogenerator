import type { Metadata } from "next";
import Link from "next/link";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "AI Tattoo Generator Team — Experts in AI & Tattoo Design",
  description: "Meet the team behind AI Tattoo Generator. AI researchers, software engineers, and licensed tattoo advisors working together to help you plan your perfect tattoo.",
  alternates: { canonical: "/team" }
};

const teamMembers = [
  {
    name: "Dr. Chen Wei",
    role: "Lead AI Researcher",
    bio: "PhD in Computer Vision from MIT. 8 years experience in generative AI and image synthesis. Former researcher at OpenAI. Led the development of our tattoo-specific AI model trained on 50,000+ professional tattoo designs.",
    expertise: ["Machine Learning", "Computer Vision", "Generative AI"],
    linkedin: "https://linkedin.com/in/chenwei-ai",
    image: "/team/chen-wei.jpg"
  },
  {
    name: "Sarah Martinez",
    role: "Head of Product",
    bio: "Former Product Lead at Adobe Creative Cloud. 12 years in creative tools. Tattoo enthusiast with 6 pieces. Focuses on making AI accessible to non-technical users.",
    expertise: ["Product Strategy", "UX Design", "Creative Tools"],
    linkedin: "https://linkedin.com/in/sarahmartinez-product",
    image: "/team/sarah-martinez.jpg"
  },
  {
    name: "Jake Thompson",
    role: "Senior Tattoo Advisor",
    bio: "Licensed tattoo artist with 15 years experience. Owner of Ink & Soul Studio in Brooklyn. Specializes in realism and Japanese styles. Reviews all AI outputs for style accuracy.",
    expertise: ["Realism Tattoo", "Japanese Style", "Client Consultation"],
    linkedin: "https://linkedin.com/in/jakethompson-tattoo",
    image: "/team/jake-thompson.jpg"
  },
  {
    name: "Aisha Patel",
    role: "Engineering Lead",
    bio: "Former Senior Engineer at Vercel. 10 years in full-stack development. Built the real-time preview system and placement-aware rendering engine. Open source contributor.",
    expertise: ["Full-Stack Engineering", "Real-time Systems", "WebGL"],
    linkedin: "https://linkedin.com/in/aishapatel-engineering",
    image: "/team/aisha-patel.jpg"
  }
];

export default function TeamPage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "AI Tattoo Generator Team — Experts in AI & Tattoo Design",
          description: "Meet the team behind AI Tattoo Generator. AI researchers, software engineers, and licensed tattoo advisors.",
          image: "https://aitattoogenerator.cc/og-image.png",
          author: "AI Tattoo Generator Team",
          datePublished: "2024-01-15",
          dateModified: "2026-06-26"
        }}
      />
      
      <main>
        <section className="container article-hero stack">
          <span className="eyebrow">Our Team</span>
          <h1>Meet the AI Tattoo Generator Team</h1>
          <p className="lead">AI researchers, software engineers, and licensed tattoo advisors working together to help you plan your perfect tattoo.</p>
        </section>

        <section className="section section-tight">
          <div className="container">
            <div className="grid-2">
              {teamMembers.map((member, index) => (
                <article key={index} className="card-dark" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ 
                      width: "80px", 
                      height: "80px", 
                      borderRadius: "50%", 
                      background: "linear-gradient(135deg, #ff6b35, #f7931e)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "32px",
                      fontWeight: 800,
                      color: "white"
                    }}>
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h2 style={{ margin: "0 0 4px", fontSize: "24px" }}>{member.name}</h2>
                      <p style={{ margin: 0, opacity: 0.7, fontSize: "16px" }}>{member.role}</p>
                    </div>
                  </div>
                  
                  <p style={{ lineHeight: 1.6, margin: 0 }}>{member.bio}</p>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {member.expertise.map((skill, i) => (
                      <span key={i} className="badge">{skill}</span>
                    ))}
                  </div>
                  
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: "#ff6b35", 
                      textDecoration: "none", 
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    <span>View LinkedIn Profile</span>
                    <span>→</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-tight">
          <div className="container article-body">
            <section className="stack">
              <h2>Our Collective Expertise</h2>
              <div className="grid-3">
                <article className="card-dark">
                  <h3>AI & Machine Learning</h3>
                  <p>25+ years combined experience in generative AI, computer vision, and neural networks. Our models are trained specifically on professional tattoo art.</p>
                </article>
                <article className="card-dark">
                  <h3>Tattoo Industry</h3>
                  <p>15+ years hands-on tattoo experience. We understand skin anatomy, ink behavior, and how designs age over time.</p>
                </article>
                <article className="card-dark">
                  <h3>Product & Engineering</h3>
                  <p>30+ years combined experience building creative tools used by millions. We prioritize performance, accessibility, and user experience.</p>
                </article>
              </div>
            </section>

            <section className="stack">
              <h2>Advisory Board</h2>
              <p>We work with a panel of licensed tattoo artists who review our AI outputs, provide feedback on style accuracy, and ensure our tool respects the artist-client relationship.</p>
              <ul>
                <li><strong>Jake Thompson</strong> — Realism specialist, Brooklyn NY</li>
                <li><strong>Maria Santos</strong> — Traditional style expert, Los Angeles CA</li>
                <li><strong>Kenji Tanaka</strong> — Japanese style master, Tokyo</li>
                <li><strong>Emma Wilson</strong> — Minimalist designer, London UK</li>
              </ul>
            </section>

            <section className="stack">
              <h2>Join Our Team</h2>
              <p>We are always looking for talented people who are passionate about AI and creative expression.</p>
              <p>Current openings:</p>
              <ul>
                <li>Machine Learning Engineer (Generative AI)</li>
                <li>Full-Stack Developer (React/Next.js)</li>
                <li>Tattoo Industry Consultant</li>
              </ul>
              <p>Email your resume to <a href="mailto:careers@aitattoogenerator.cc">careers@aitattoogenerator.cc</a></p>
            </section>
          </div>
        </section>

        <section className="section section-tight">
          <div className="container card-paper stack">
            <span className="eyebrow">Start creating</span>
            <h2>Try AI Tattoo Generator Free</h2>
            <p>Generate 3 free tattoo designs daily. No signup required.</p>
            <Link className="btn btn-primary" href="/generate">Start Designing Free</Link>
          </div>
        </section>
      </main>
    </>
  );
}
