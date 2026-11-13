import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import type { Locale } from "@/lib/locales";
import { getLocalizedPath } from "@/lib/locales";
import { KAHLY_COPY } from "@/data/kahly";
import styles from "./kahly.module.css";

export function KahlyBand({ locale = "fr" }: { locale?: Locale }) {
  const c = KAHLY_COPY[locale];
  return (
    <section className={styles.band} aria-labelledby="kahly-band-title">
      <div className={styles.bandInner}>
        <div className={styles.bandBrand}>KAHLY</div>
        <div><h2 id="kahly-band-title" className={styles.bandTitle}>{c.bandTitle}</h2><p className={styles.bandText}>{c.bandText}</p></div>
        <Link href={getLocalizedPath("/kahly", locale)} className={styles.button}>{c.discover}<FiArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
