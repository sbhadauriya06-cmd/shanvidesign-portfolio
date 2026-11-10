import Hero from "../hero/Hero";
import Work from "../sections/Work";
import OtherThings from "../sections/OtherThings";
import About from "../sections/About";
import Contact from "../sections/Contact";

/** The Figma page leaves a 200px band between some sections on desktop. */
const Gap = () => <div className="fig-gap" aria-hidden="true" />;

export default function Home() {
  return (
    <>
      <Hero />
      <Gap />
      <Work />
      <Gap />
      <OtherThings />
      <Gap />
      <About />
      <Contact />
    </>
  );
}
