/* GARDIN — GALERIE OBSCURE : une séquence éditoriale noire et minérale où la collection pilote chaque décision de mise en page. */
import { useEffect, useState } from "react";

const assets = {
  campaign: "https://files.manuscdn.com/user_upload_by_module/session_file/98960062/bcqsEHPQHPoTdtmn.png",
  blackCouple: "https://files.manuscdn.com/user_upload_by_module/session_file/98960062/JOgjvAwlSOnJydux.png",
  hoodieBack: "https://files.manuscdn.com/user_upload_by_module/session_file/98960062/MGfkRaPfygkPOlDd.png",
  hoodieDual: "https://files.manuscdn.com/user_upload_by_module/session_file/98960062/fFmeqLjgessSUVgX.png",
  manifesto: "https://files.manuscdn.com/user_upload_by_module/session_file/98960062/lIOaOjstGwJBkkvN.png",
  creamCouple: "https://files.manuscdn.com/user_upload_by_module/session_file/98960062/qeABvVddlJQZTysO.png",
  architecture: "https://files.manuscdn.com/user_upload_by_module/session_file/98960062/bfjRupQPgjgFfqAf.jpg",
  material: "https://files.manuscdn.com/user_upload_by_module/session_file/98960062/gEmdUInizgvElxap.jpg",
  thread: "https://files.manuscdn.com/user_upload_by_module/session_file/98960062/uEmdRDHNwpbrBBnV.jpg",
  visionher: "https://files.manuscdn.com/user_upload_by_module/session_file/98960062/wHPOKFCeoujnNiMk.png",
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);

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
  const acceptAccess = () => {
    window.sessionStorage.setItem("gardin-visionher-access", "granted");
    setAccessGranted(true);
  };

  return (
    <div className="gardin-page">
      {(!accessChecked || !accessGranted) && (
        <section className="visionher-gate" aria-label="Accès confidentiel Visionher">
          <div className="visionher-popover" role="dialog" aria-modal="true" aria-labelledby="visionher-title">
            <img src={assets.visionher} alt="Visionher Agency" className="visionher-logo" />
            <p className="gate-index">Visionher Agency / Accès confidentiel</p>
            <h1 id="visionher-title">Avant<br />d’entrer.</h1>
            <p className="gate-lead">Cette maquette est partagée à titre personnel, dans le cadre de la présentation du projet GARDIN.</p>
            <div className="gate-statement">
              <p>Les éléments de direction artistique, contenus, images et développements présentés ici sont confidentiels. Toute reproduction, diffusion ou adaptation nécessite un accord préalable de Visionher Agency.</p>
            </div>
            <button type="button" className="gate-submit" onClick={acceptAccess}>J’accepte <span>↘</span></button>
            <div className="visionher-gate-footer">
              <p>Aucune information n’est collectée par cette maquette.</p>
              <p>© 2026 Visionher Agency — Tous droits réservés.</p>
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
