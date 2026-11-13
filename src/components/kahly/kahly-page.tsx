import Link from "next/link";
import { FiArrowRight, FiCheck, FiFileText, FiGlobe, FiLayers } from "react-icons/fi";
import { SmartQuoteForm } from "@/components/smart-quote-form";
import { KAHLY_COPY } from "@/data/kahly";
import { getLocalizedPath, type Locale } from "@/lib/locales";
import styles from "./kahly.module.css";

export function KahlyPage({ locale }: { locale: Locale }) {
  const c = KAHLY_COPY[locale];
  const icons = [FiFileText, FiGlobe, FiLayers];
  const structuredData = {
    "@context": "https://schema.org", "@type": "Service", name: "KAHLY",
    description: c.description, url: `https://kah-digital.ch${getLocalizedPath("/kahly", locale)}`,
    provider: { "@type": "Organization", name: "KAH Digital Studio", url: "https://kah-digital.ch" },
    serviceType: c.headline,
  };
  return (
    <div className={styles.root}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <div className={styles.wrap}>
        <section className={styles.hero} aria-labelledby="kahly-title">
          <div>
            <div className={styles.identity}><span className={styles.mark} aria-hidden="true">k</span><div><span className={styles.name}>KAHLY</span><Link className={styles.by} href={getLocalizedPath("/", locale)}>{c.by}</Link></div></div>
            <h1 id="kahly-title">{c.headline}</h1><p className={styles.intro}>{c.intro}</p>
            <div className={styles.actions}><a href="#demo" className={styles.button}>{c.demo}<FiArrowRight aria-hidden="true" /></a><a href="#offres-kahly" className={styles.secondary}>{c.quote}</a></div>
            <p className={styles.note}>{c.note}</p>
          </div>
          <div className={styles.example} aria-label={c.example}>
            <div className={styles.exampleHead}><b>KAHLY</b><span>{c.example}</span></div>
            <p className={styles.request}>{c.request}</p>
            <ul className={styles.steps}>{c.steps.map(step => <li key={step}><FiCheck aria-hidden="true" />{step}</li>)}</ul>
            <div className={styles.output}><b>{c.result}</b><p>{c.output}</p></div>
          </div>
        </section>
        <section className={styles.section} aria-labelledby="kahly-capabilities">
          <h2 id="kahly-capabilities">{c.capabilitiesTitle}</h2>
          <div className={styles.capabilities}>{c.capabilities.map((item, i) => { const Icon = icons[i]; return <article className={styles.capability} key={item.title}><Icon aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div>
        </section>
        <section id="offres-kahly" className={styles.section} aria-labelledby="kahly-offers">
          <h2 id="kahly-offers">{c.offersTitle}</h2><p className={styles.lead}>{c.offersIntro}</p>
          <div className={styles.offers}>{c.offers.map(offer => <article className={styles.offer} key={offer.name}><h3>{offer.name}</h3><p>{offer.audience}</p><span className={styles.quote}>{c.quote}</span><ul>{offer.includes.map(item => <li key={item}><FiCheck aria-hidden="true" />{item}</li>)}</ul><a href="#demo" className={styles.button}>{c.demo}<FiArrowRight aria-hidden="true" /></a></article>)}</div>
        </section>
        <section className={styles.section} aria-labelledby="kahly-process"><h2 id="kahly-process">{c.processTitle}</h2><div className={styles.process}>{c.process.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
        <section className={styles.section} aria-labelledby="kahly-faq"><h2 id="kahly-faq">{c.faqTitle}</h2><div className={styles.faq}>{c.faq.map(item => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></section>
        <section id="demo" className={`${styles.section} ${styles.demo}`} aria-labelledby="kahly-demo"><div className={styles.demoIntro}><h2 id="kahly-demo">{c.demoTitle}</h2><p className={styles.lead}>{c.demoText}</p></div><div className={styles.form}><SmartQuoteForm locale={locale} fixedService="kahly" /></div><p className={styles.email}>{c.email} <a href={`mailto:kahdigital42@gmail.com?subject=${encodeURIComponent("KAHLY — " + c.demo)}`}>kahdigital42@gmail.com</a></p></section>
      </div>
    </div>
  );
}
