const EMAIL = "b.shanvi@iitg.ac.in";
const LINKS = [
  { label: "BEHANCE",   href: "https://www.behance.net/shanvibhadaur1" },
  { label: "LINKEDIN",  href: "https://www.linkedin.com/in/bhadauriyashanvi/" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/ohshoodles" },
];

export default function Contact() {
  return (
    <section id="contact" className="fig-section">
      <div className="contact">
        <h2 className="contact-title">Have something messy?</h2>
        <p className="contact-sub">I&rsquo;d probably like it.</p>
        <p className="contact-links">
          <a href={`mailto:${EMAIL}`} className="contact-email">{EMAIL}</a>
          {LINKS.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">{l.label} &gt;</a>
          ))}
        </p>
      </div>
    </section>
  );
}
