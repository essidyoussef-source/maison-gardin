/* GARDIN — GALERIE OBSCURE : une séquence éditoriale noire et minérale où la collection pilote chaque décision de mise en page. */
import { useEffect, useState } from "react";

const assets = {
  campaign: "/manus-storage/gardin-campaign-collectif-restaure_698b36c7.png",
  blackCouple: "/manus-storage/gardin-tout-est-en-toi-noir-restaure_22184f3d.png",
  hoodieBack: "/manus-storage/gardin-hoodie-noir-dos-restaure_ab29febf.png",
  hoodieDual: "/manus-storage/gardin-hoodie-recto-verso-restaure_c2ca68f7.png",
  manifesto: "/manus-storage/gardin-manifeste-broderie-restaure_3f2d7710.png",
  creamCouple: "/manus-storage/gardin-tout-est-en-toi-ecru-restaure_f52b57c5.png",
  architecture: "/manus-storage/gardin-architecture-ombre_ba7c5970.jpg",
  material: "/manus-storage/gardin-material-noir_b23d7c2e.jpg",
  thread: "/manus-storage/gardin-thread-macro_15114b9e.jpg",
  visionher: "/manus-storage/visionher-logo_4d7aecb6.png",
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 22);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.13, rootMargin: "0px 0px -6% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setAccessGranted(window.sessionStorage.getItem("gardin-visionher-access") === "granted");
    setAccessChecked(true);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const acceptAccess = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!visitorName.trim() || !hasAcceptedTerms) return;
    window.sessionStorage.setItem("gardin-visionher-access", "granted");
    setAccessGranted(true);
  };

  return (
    <div className="gardin-page">
      {(!accessChecked || !accessGranted) && (
        <section className="visionher-gate" aria-label="Accès confidentiel Visionher">
          <div className="visionher-gate-shell">
            <aside className="visionher-gate-aside">
              <img src={assets.visionher} alt="Visionher Agency" className="visionher-logo" />
              <div className="visionher-aside-meta"><span>Accès confidentiel</span><span>Maquette GARDIN / 2026</span></div>
            </aside>
            <div className="visionher-gate-main">
              <div className="visionher-gate-intro">
                <p className="gate-index">01 / Visionher Agency</p>
                <h1>Avant<br />d’entrer.</h1>
                <p className="gate-lead">Cette maquette est partagée à titre personnel, dans le cadre de la présentation du projet GARDIN.</p>
              </div>
              <div className="gate-statement">
                <p>Les éléments de direction artistique, contenus, images et développements présentés ici sont confidentiels. Toute reproduction, diffusion ou adaptation nécessite un accord préalable de Visionher Agency.</p>
              </div>
              <form className="visionher-form" onSubmit={acceptAccess}>
                <div className="visionher-fields">
                  <label>
                    <span>Nom et prénom</span>
                    <input value={visitorName} onChange={(event) => setVisitorName(event.target.value)} required autoComplete="name" />
                  </label>
                  <label>
                    <span>E-mail <em>(facultatif)</em></span>
                    <input type="email" autoComplete="email" />
                  </label>
                </div>
                <label className="gate-consent">
                  <input type="checkbox" checked={hasAcceptedTerms} onChange={(event) => setHasAcceptedTerms(event.target.checked)} />
                  <span>J’ai lu et j’accepte les conditions de confidentialité.</span>
                </label>
                <button type="submit" className="gate-submit" disabled={!visitorName.trim() || !hasAcceptedTerms}>J’accepte <span>↘</span></button>
              </form>
              <div className="visionher-gate-footer"><span>Aucune information n’est enregistrée dans cette maquette.</span><span>Visionher Agency</span></div>
            </div>
          </div>
        </section>
      )}
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <nav className="header-links" aria-label="Navigation principale">
          <a className="header-link" href="#collection">Collection</a>
          <a className="header-link" href="#manifeste">Manifeste</a>
        </nav>
        <a href="#top" className="header-logo" aria-label="GARDIN — retour en haut">GARDIN</a>
        <nav className="header-links right" aria-label="Navigation secondaire">
          <a className="header-link" href="#points-de-vente">Points de vente</a>
          <a className="header-link" href="#contact">Contact</a>
        </nav>
        <button className="menu-trigger" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? "Fermer" : "Menu"}
        </button>
      </header>

      <nav id="mobile-nav" className={`mobile-panel ${menuOpen ? "open" : ""}`} aria-label="Navigation mobile">
        <a href="#collection" onClick={closeMenu}>Collection</a>
        <a href="#manifeste" onClick={closeMenu}>Manifeste</a>
        <a href="#points-de-vente" onClick={closeMenu}>Points de vente</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
      </nav>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero-image" src={assets.campaign} alt="La collection GARDIN réunie dans un intérieur minéral." />
          <div className="hero-content">
            <p className="collection-index">01 / Collection permanente</p>
            <div className="hero-copy">
              <p className="eyebrow">GARDIN COLLECTION / 2026</p>
              <h1 id="hero-title">Une ligne.<br />Une présence.</h1>
              <div className="hero-bottom">
                <p className="hero-summary">Un vestiaire d’essentiels choisis pour leur tenue, leur silence et ce qu’ils permettent d’affirmer.</p>
                <a className="text-action" href="#collection">Découvrir la collection <span>↘</span></a>
              </div>
            </div>
          </div>
        </section>

        <section className="quote-marquee" aria-label="Ce n’est pas une question de chance, c’est une question de décision.">
          <div className="quote-track">
            <p>Ce n’est pas une question de chance, c’est une question de décision <span>//</span></p>
            <p aria-hidden="true">Ce n’est pas une question de chance, c’est une question de décision <span>//</span></p>
            <p aria-hidden="true">Ce n’est pas une question de chance, c’est une question de décision <span>//</span></p>
          </div>
        </section>

        <section id="manifeste" className="manifesto" aria-labelledby="manifesto-title">
          <div className="manifesto-visual" data-reveal="image">
            <img src={assets.blackCouple} alt="Deux silhouettes GARDIN portant le manifeste Tout est en toi." loading="lazy" />
          </div>
          <div className="manifesto-copy reveal-delay-1" data-reveal="up">
            <p className="section-no">02 / Le manifeste</p>
            <div>
              <h2 id="manifesto-title">Tout est<br />en toi.</h2>
              <p>GARDIN est un langage de coupe et de matière. Des volumes familiers, conçus pour accompagner ce qui ne demande pas à être expliqué.</p>
              <a className="text-action" href="#collection">Voir les silhouettes <span>↘</span></a>
            </div>
            <p className="quote-mark">Ce n’est pas une question de chance, c’est une question de décision.</p>
          </div>
        </section>

        <section id="collection" className="collection" aria-labelledby="collection-title">
          <div className="section-head" data-reveal="up">
            <div><p className="section-index">03 / Les silhouettes</p><h2 id="collection-title">Collection<br />permanente</h2></div>
            <p>Une sélection d’essentiels premium, étudiés dans des teintes à vivre et des détails qui résistent au temps.</p>
          </div>
          <div className="looks-grid">
            <article className="look-card plate-black" data-reveal="image">
              <span className="plate-number">Planche 01 / Noir couture</span>
              <div className="look-image"><img src={assets.hoodieDual} alt="Hoodie GARDIN noir, vues face et dos." loading="lazy" /></div>
              <div className="look-caption"><span>01 / Logo fleece</span><span>noir profond</span></div>
            </article>
            <article className="look-card offset plate-taupe reveal-delay-2" data-reveal="image">
              <span className="plate-number">Planche 02 / Ton sur ton</span>
              <div className="look-image"><img src={assets.hoodieBack} alt="Vue dos d’un hoodie GARDIN noir avec signature ton sur ton." loading="lazy" /></div>
              <div className="look-caption"><span>02 / Ton sur ton</span><span>geste discret</span></div>
            </article>
          </div>
        </section>

        <section className="architectural" aria-labelledby="architecture-title">
          <img src={assets.architecture} alt="Architecture minérale et ombre graphique, univers de collection GARDIN." loading="lazy" />
          <p className="architectural-index">04 / Ligne et volume</p>
          <div className="architectural-copy" data-reveal="up">
            <p className="eyebrow">Ligne / Matière / Attitude</p>
            <h2 id="architecture-title">Rien de plus.<br />Rien de moins.</h2>
            <p>Une collection construite avec la même rigueur qu’un espace : matière, proportion, lumière.</p>
          </div>
        </section>

        <section className="details" aria-labelledby="details-title">
          <div className="details-grid">
            <div className="detail-texture" data-reveal="image"><img src={assets.material} alt="Étude de matière noire et couture ton sur ton." loading="lazy" /></div>
            <div className="detail-copy reveal-delay-1" data-reveal="up">
              <p className="section-no">03 / Le détail</p>
              <h2 id="details-title">La matière a<br />le dernier mot.</h2>
              <p>Des textures choisies au toucher, des finitions qui ne cherchent pas l’effet. Elles dessinent une allure au plus près.</p>
            </div>
          </div>
          <div className="material-story" id="points-de-vente">
            <img src={assets.creamCouple} alt="Les pièces écrues GARDIN portées dans une lumière douce." loading="lazy" data-reveal="image" />
            <div className="material-label reveal-delay-1" data-reveal="up">
              <h3>Porter<br />l’essentiel.</h3>
              <div className="material-meta"><span>GARDIN<br />Collection</span><span>Disponible prochainement<br />chez les maisons du groupe</span></div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <img className="contact-image" src={assets.manifesto} alt="Manifeste brodé GARDIN sur une pièce noire." loading="lazy" />
          <div className="contact-content" data-reveal="up">
            <p className="contact-index">05 / L’accès</p>
            <div>
              <p className="eyebrow">GARDIN / Sélection 2026</p>
              <h2 id="contact-title">Restez au plus<br />près de la ligne.</h2>
            </div>
            <div className="contact-bottom">
              <p>Ce qui est en toi mérite d’être porté. La collection GARDIN s’adresse à celles et ceux qui choisissent leur propre direction.</p>
              <a className="text-action" href="mailto:contact@groupefrenois.com">Entrer dans la ligne <span>↘</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" data-reveal="up">
        <div className="footer-topline"><span>GARDIN / Collection permanente</span><span>01 — 2026</span></div>
        <div className="footer-main">
          <div className="footer-mark">GARDIN</div>
          <div className="footer-column">
            <p className="footer-label">Navigation</p>
            <a href="#collection">Collection</a>
            <a href="#manifeste">Le manifeste</a>
            <a href="#points-de-vente">Points de vente</a>
          </div>
          <div className="footer-column">
            <p className="footer-label">Contact</p>
            <a href="mailto:contact@groupefrenois.com">Nous contacter</a>
            <a href="https://www.instagram.com/gardin.paris/" target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href="https://www.groupefrenois.com/" target="_blank" rel="noreferrer">Groupe Frénois ↗</a>
            <a href="#top">Retour en haut ↗</a>
          </div>
        </div>
        <div className="footer-bottom"><span>© GARDIN 2026</span><span>Une ligne. Une présence.</span><a href="https://www.groupefrenois.com/" target="_blank" rel="noreferrer">Groupe Frénois ↗</a></div>
      </footer>
    </div>
  );
}
