"use client";

import React, { useState } from "react";
import Image from "next/image";
import { NotebookSpine } from "@/components/NotebookSpine";
import { CraftNavbar } from "@/components/CraftNavbar";
import { DashedThreadScroll } from "@/components/DashedThreadScroll";

export default function HomePage() {
  const [formData, setFormData] = useState({
    companyName: "",
    phone: "",
    wilaya: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: formData.companyName,
          contactName: formData.companyName,
          email: `${formData.phone.replace(/[^0-9]/g, "")}@toufiltex.dz`,
          phone: formData.phone,
          projectType: `Wilaya: ${formData.wilaya}`,
          deadline: "Urgent",
          notes: `Bon de commande reçu depuis la page d'accueil. Wilaya : ${formData.wilaya}`,
          items: [],
        }),
      });
      const data = await res.json();
      setReference(data.referenceNumber || `TF-${new Date().getFullYear()}-DZ`);
      setSubmitted(true);
    } catch {
      setReference(`TF-${new Date().getFullYear()}-DEMANDE`);
      setSubmitted(true);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "var(--bg-light)" }}>
      {/* 1. NOTEBOOK SPIRAL SPINE (Anneaux de carnet sur la marge gauche) */}
      <NotebookSpine />

      {/* 2. ANIMATION DU TRAIT POINTILLÉ QUI BOUGE AU SCROLL */}
      <DashedThreadScroll />

      {/* Content wrapper indenté pour la reliure carnet */}
      <div style={{ paddingLeft: "48px" }}>
        {/* 3. NAVBAR : LOGO + PRÉSENTATION + À PROPOS DE NOUS + CATALOGUE + CONTACT */}
        <CraftNavbar />

        {/* ========================================================= */}
        {/* SECTION 1 : HERO / PRÉSENTATION                           */}
        {/* ========================================================= */}
        <section id="presentation" className="bg-light" style={{ paddingTop: "3.5rem" }}>
          {/* SVG Ligne S1 avec classe animated-thread-path */}
          <svg className="svg-dashed-line" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              className="animated-thread-path"
              d="M 20 0 Q 30 50, 40 100"
              fill="none"
              stroke="#8c8273"
              strokeWidth="0.25"
              strokeDasharray="1 1"
            />
          </svg>

          <div className="container hero-grid">
            <div>
              {/* Badge B2B Algérie */}
              <div style={{ marginBottom: "1.2rem" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "6px",
                    border: "1px solid #c9baa5",
                    background: "rgba(0, 0, 0, 0.03)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#4a453e",
                    letterSpacing: "0.04em",
                  }}
                >
                  B2B ALGÉRIE — استيراد الخيوط
                </span>
              </div>

              <h1 className="hero-title">
                Toufiltex :<br />
                L&apos;excellence du fil<br />
                importé pour les<br />
                <span className="highlight-group">
                  <span className="highlight-text-hand">textiles d&apos;exception</span>
                  <span className="highlight-crossed">
                    standards
                    <svg
                      style={{ position: "absolute", width: "120%", height: "30px", top: "30%", left: "-10%" }}
                      viewBox="0 0 100 30"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,15 Q50,5 100,15"
                        fill="none"
                        stroke="var(--red-scribble)"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </span>
                <br />
                professionnels.
              </h1>

              <div className="arabic-box">
                بيع واستيراد الخيوط النسيجية - جميع<br />
                الأنواع مباشرة من المصنع إلى ورشاتكم<br />
                ومصانعكم في الجزائر.
              </div>

              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem", maxWidth: "400px" }}>
                Basée à Tlemcen, Toufiltex est votre partenaire direct pour l&apos;approvisionnement régulier de tous types de fils
                textiles de qualité industrielle.
              </p>

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <a href="#devis" className="btn btn-blue">
                  Demander mon devis gratuit
                </a>
                <a
                  href="https://wa.me/213561219466"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  WhatsApp Direct
                </a>
              </div>

              <div style={{ display: "flex", gap: "1.2rem", marginTop: "1.2rem", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                <span>✓ Arrivages réguliers toute l&apos;année</span>
                <span>✓ Direct d&apos;usine sans intermédiaire</span>
              </div>
            </div>

            {/* Polaroid 1 : VRAIES BOBINES DE FIL (et non pas des jeans) */}
            <div className="polaroid" style={{ transform: "rotate(3deg)", marginTop: "1.5rem" }}>
              <img
                src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80"
                alt="Bobines de fil industriel Toufiltex"
              />
              <div className="polaroid-caption handwritten">
                Échantillons de notre dernier arrivage direct d&apos;usine
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2 : ENGAGEMENT / À PROPOS DE NOUS                  */}
        {/* ========================================================= */}
        <section id="engagement" className="bg-dark">
          {/* SVG Ligne S2 avec classe animated-thread-path */}
          <svg className="svg-dashed-line" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              className="animated-thread-path"
              d="M 40 0 Q 10 50, 30 100"
              fill="none"
              stroke="#8c8273"
              strokeWidth="0.25"
              strokeDasharray="1 1"
            />
          </svg>

          <div className="container">
            <div className="engagement-card">
              <div className="engagement-arabic">شريككم الموثوق في توريد الخيوط في الجزائر</div>
              <h2>Notre engagement envers les professionnels de la confection</h2>
              <p style={{ fontSize: "0.9rem", marginBottom: "1rem", color: "var(--text-dark)" }}>
                Toufiltex répond à une problématique simple mais cruciale des manufactures de textile en Algérie :{" "}
                <strong>obtenir un approvisionnement fiable, constant et au prix le plus juste.</strong>
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                Grâce à nos canaux d&apos;importation directe sans intermédiaires, nous couvrons l&apos;intégralité de vos besoins en fils
                de coton, polyester, laine et fils techniques spéciaux. Notre implantation stratégique à Tlemcen nous permet d&apos;assurer
                une proximité de service et une réactivité maximale.
              </p>

              <div className="engagement-annotation handwritten">
                Disponibilité garantie toute<br />
                l&apos;année et conseil de<br />
                spécialistes !
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3 : CATALOGUE & BANNIERE                          */}
        {/* ========================================================= */}
        <section id="catalogue" className="bg-light">
          {/* SVG Ligne S3 avec classe animated-thread-path */}
          <svg className="svg-dashed-line" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              className="animated-thread-path"
              d="M 30 0 Q 90 50, 70 100"
              fill="none"
              stroke="#8c8273"
              strokeWidth="0.25"
              strokeDasharray="1 1"
            />
          </svg>

          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
              <h2 className="catalog-title" style={{ margin: 0 }}>
                L&apos;Échantillonneur Toufiltex
              </h2>
              <div style={{ direction: "rtl", fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
                عينات الخيوط المتوفرة
              </div>
            </div>

            <div className="grid-3">
              <div className="card">
                <span className="card-tag">INDUSTRIEL</span>
                <img
                  src="/images/bobines-fil-industriel.jpg"
                  alt="Fils Industriels & Techniques"
                />
                <h3>Fils Industriels & Techniques</h3>
                <p>Fils à haute résistance conçus pour les cadences élevées.</p>
              </div>

              <div className="card">
                <span className="card-tag">POLYESTER</span>
                <img
                  src="/images/fils-polyester.jpg"
                  alt="Fils en Polyester"
                />
                <h3>Fils en Polyester</h3>
                <p>Fils polyester haute ténacité pour tissage et couture sans rupture.</p>
              </div>

              <div className="card">
                <span className="card-tag">CONFECTION</span>
                <img
                  src="/images/fils-confection.jpg"
                  alt="Fils de Confection"
                />
                <h3>Fils de Confection</h3>
                <p>Nuancier riche et fils résistants pour ateliers de prêt-à-porter et couture.</p>
              </div>
            </div>

            <div className="red-banner">
              <h3>Besoin d&apos;un fil spécifique ?</h3>
              <p>
                Polyester, Coton, Acrylique, Laine, Fils Elastiques... Nous importons toutes les spécifications sur demande.
                Contactez-nous !
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4 : CONFIANCE                                     */}
        {/* ========================================================= */}
        <section className="bg-dark">
          {/* SVG Ligne S4 avec classe animated-thread-path */}
          <svg className="svg-dashed-line" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              className="animated-thread-path"
              d="M 70 0 Q -10 50, 40 100"
              fill="none"
              stroke="#8c8273"
              strokeWidth="0.25"
              strokeDasharray="1 1"
            />
          </svg>

          <div className="container trust-grid">
            <div>
              <div style={{ direction: "rtl", fontSize: "0.8rem", color: "var(--red-banner)", fontWeight: 700, marginBottom: "0.4rem" }}>
                لماذا تختار توفيلتكس ؟
              </div>
              <h2 className="trust-title">
                Pourquoi nous faire<br />
                confiance ?
              </h2>
              <div className="trust-list">
                <div className="trust-item">
                  <div className="checkbox-icon">✓</div>
                  <div>
                    <h4>Importation Directe d&apos;Usine</h4>
                    <p>
                      Aucun intermédiaire. Nous négocions directement auprès des meilleures filatures mondiales pour vous
                      garantir des tarifs de gros ultra-compétitifs.
                    </p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="checkbox-icon">✓</div>
                  <div>
                    <h4>Régularité et Stabilité des Approvisionnements</h4>
                    <p>
                      Évitez les ruptures de stock critiques qui paralysent votre production. Nous planifions des arrivages
                      constants tout au long de l&apos;année.
                    </p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="checkbox-icon">✓</div>
                  <div>
                    <h4>Proximité & Accompagnement à Tlemcen</h4>
                    <p>
                      Un interlocuteur unique basé à Tlemcen, prêt à évaluer vos besoins techniques exacts et à vous fournir des
                      échantillons physiques.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Polaroid 2 */}
            <div className="polaroid" style={{ transform: "rotate(-2deg)", margin: "0 auto", maxWidth: "350px" }}>
              <img
                src="/images/fils-industriels-cones.jpg"
                alt="Fils textiles de qualité supérieure Toufiltex"
              />
              <div className="polaroid-caption handwritten" style={{ fontSize: "1.1rem" }}>
                Qualité de fil constante contrôlée à chaque lot
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5 : DEVIS & CONTACT                               */}
        {/* ========================================================= */}
        <section id="devis" className="bg-light">
          {/* SVG Ligne S5 avec classe animated-thread-path */}
          <svg className="svg-dashed-line" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              className="animated-thread-path"
              d="M 40 0 Q 80 30, 90 100"
              fill="none"
              stroke="#8c8273"
              strokeWidth="0.25"
              strokeDasharray="1 1"
            />
          </svg>

          <div className="container devis-grid">
            <div className="form-container">
              <div style={{ direction: "rtl", fontWeight: 700, fontSize: "0.8rem", color: "var(--primary-blue)", marginBottom: "0.5rem" }}>
                طلب تسعيرة مجانية — بون الطلبية
              </div>
              <h2>Votre Bon de Commande / Devis</h2>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                Complétez ce formulaire pour recevoir votre devis personnalisé gratuit sous 24h.
              </p>

              {submitted ? (
                <div style={{ background: "#fdfbf7", border: "1.5px solid var(--primary-blue)", padding: "1.5rem", borderRadius: "6px", textAlign: "center" }}>
                  <div className="handwritten" style={{ fontSize: "2rem", color: "var(--primary-blue)", marginBottom: "0.5rem" }}>
                    Merci pour votre demande !
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-dark)", marginBottom: "0.8rem" }}>
                    Votre référence : <strong>{reference}</strong>
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    Notre équipe commerciale à Tlemcen vous recontactera directement sous 24h.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn btn-outline"
                    style={{ marginTop: "1rem", fontSize: "0.8rem" }}
                  >
                    Faire une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Nom de votre entreprise / Atelier</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ex: Atelier Confection Tlemcen"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Numéro de téléphone (Algérie)</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="+213 Ex: 561219466"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Votre Wilaya (Algérie)</label>
                    <select
                      className="form-control"
                      required
                      value={formData.wilaya}
                      onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                    >
                      <option value="">Sélectionnez votre région</option>
                      <option value="Tlemcen">13 - Tlemcen</option>
                      <option value="Oran">31 - Oran</option>
                      <option value="Alger">16 - Alger</option>
                      <option value="Constantine">25 - Constantine</option>
                      <option value="Sétif">19 - Sétif</option>
                      <option value="Blida">09 - Blida</option>
                      <option value="Béjaïa">06 - Béjaïa</option>
                      <option value="Sidi Bel Abbès">22 - Sidi Bel Abbès</option>
                      <option value="Mostaganem">27 - Mostaganem</option>
                      <option value="Autre Wilaya">Autre Wilaya (Livraison 58 Wilayas)</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-blue" style={{ width: "100%", marginTop: "1rem" }}>
                    Envoyer ma demande de devis
                  </button>
                </form>
              )}
            </div>

            <div className="contact-info">
              <div className="contact-card">
                <h4>Discutez en direct</h4>
                <p>+213 561 21 94 66</p>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Notre canal WhatsApp est disponible.</span>
              </div>
              <div className="contact-card">
                <h4>Contact Email</h4>
                <p>salaheddinesaid101@gmail.com</p>
              </div>
              <div className="contact-card">
                <h4>Siège de l&apos;entreprise</h4>
                <p>Tlemcen, Algérie</p>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Importateur direct, expédition nationale.</span>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-dark">
          {/* SVG Ligne Footer */}
          <svg className="svg-dashed-line" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              className="animated-thread-path"
              d="M 90 0 Q 50 60, 10 100"
              fill="none"
              stroke="#8c8273"
              strokeWidth="0.25"
              strokeDasharray="1 1"
            />
          </svg>
          <div className="handwritten footer-logo">Toufiltex Tlemcen</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            &copy; {new Date().getFullYear()} Toufiltex — Tous droits réservés. Tlemcen, Algérie.
          </div>
        </footer>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/213561219466"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-whatsapp"
          title="WhatsApp Direct +213 561 21 94 66"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.071.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.579 4.183 1.589 5.926l-1.589 5.8 5.975-1.567c1.705.952 3.67 1.491 5.76 1.491 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
