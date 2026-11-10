const INTERESTS = ["Products", "People", "Behaviors", "Systems", "Culture", "Technology"];
const EXPERIENCE = ["Reframe India | UI UX Intern", "Design Aspirants | UI UX Intern", "iQUANTA | Visual Intern"];
const EDUCATION = ["IIT Guwahati ‘ 27", "Delhi Public School Bhopal ‘ 22"];

const List = ({ title, items }: { title: string; items: string[] }) => (
  <div className="about-list">
    <h3>{title}</h3>
    {items.map(i => <p key={i}>{i}</p>)}
  </div>
);

export default function About() {
  return (
    <section id="about" className="fig-section">
      <div className="about">
        <img className="about-mat" src="/site/cuttingmat.webp" alt="" loading="lazy" />
        <div className="section-head is-dark"><h2>About Me</h2><span>2005-26</span></div>

        <div className="about-text">
          <h2 className="about-hi">Hi, I&apos;m<br />Shanvi.</h2>
          <div className="about-intro">
            <p>I&apos;m a product designer who likes figuring out why things work the way they do and what happens when they don&apos;t.</p>
            <p>I make digital products, service systems, and the occasional zine. I care about research, craft, and the moment a user says &quot;oh, I get it now.&quot;</p>
          </div>
          <div className="about-lists">
            <List title="INTERESTED IN" items={INTERESTS} />
            <div className="about-lists-right">
              <List title="EXPERIENCE" items={EXPERIENCE} />
              <List title="EDUCATION" items={EDUCATION} />
            </div>
          </div>
        </div>

        <img className="about-photo" src="/site/about-photo.webp" width={790} height={1082} alt="Shanvi standing on a hillside above a lake" loading="lazy" />
        <img className="about-clips" src="/site/paperclips.webp" alt="" loading="lazy" />
      </div>
    </section>
  );
}
