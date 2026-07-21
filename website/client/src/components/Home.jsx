//Percy

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

//How far the cover swings: from nearly-closed to fully open (degrees)
const CLOSED = -8;
const OPEN = -162;

function Home() {
  const areaRef = useRef(null);
  const coverRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const area = areaRef.current;
    const cover = coverRef.current;
    if (!area || !cover) return;

    //Respect reduced-motion: show the book open and skip the scroll effect
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      cover.style.transform = `rotateY(${OPEN}deg)`;
      if (hintRef.current) hintRef.current.style.opacity = "0";
      return;
    }

    let ticking = false;
    const apply = () => {
      ticking = false;
      const rect = area.getBoundingClientRect();
      //Distance we can scroll through this section while it's pinned
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const progress = total > 0 ? scrolled / total : 0;
      cover.style.transform = `rotateY(${CLOSED + progress * (OPEN - CLOSED)}deg)`;
      if (hintRef.current) {
        hintRef.current.style.opacity = progress > 0.04 ? "0" : "1";
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className={styles.wrap} ref={areaRef}>
      <div className={styles.stage}>
        {/* Soft shadow so the book looks like it's resting on the table */}
        <div className={styles.tableShadow} aria-hidden="true" />
        <div className={styles.bookWrap}>
          {/* Inside / right page — revealed as the cover opens */}
          <div className={styles.page}>
            <p className={styles.welcomeScript}>You&apos;re invited</p>
            <img
              src="/sticker10.jpg"
              alt="Elliott and Percy"
              className={styles.photo}
            />
            <p className={styles.welcome}>
              We&apos;re so happy you&apos;re here. Come celebrate with us!
            </p>
            <p className={styles.dates}>18 September 2027</p>
            <p className={styles.location}>Cork, Ireland</p>
            <Link to="/rsvp" className={styles.cta}>
              RSVP
            </Link>
          </div>

          {/* Front cover — hinged on the left, swings open on scroll */}
          <div className={styles.book}>
            <div className={styles.cover} ref={coverRef}>
              <div className={styles.coverFront}>
                <div className={styles.coverFrame} />
                <h1 className={styles.names}>
                  Elliott <span className={styles.amp}>&amp;</span> Percy
                </h1>
                <p className={styles.subtitle}>A Wedding Story</p>
              </div>
              <div className={styles.coverBack} />
            </div>
          </div>
        </div>

        <p className={styles.hint} ref={hintRef}>
          scroll to open
        </p>
      </div>
    </section>
  );
}

export default Home;
