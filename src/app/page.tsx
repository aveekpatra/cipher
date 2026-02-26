"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import HeroBackground from "@/components/HeroBackground";

/* ── translations ── */
type Lang = "en" | "fr" | "es";

const t = {
  en: {
    nav: { about: "About", services: "Services", process: "Process", contact: "Contact", cta: "Book a meeting" },
    hero: {
      h1: "Hire hospitality professionals you can trust.",
      sub: "Cipher connects restaurants and hotel brands with proven operators, vetted for craft, reliability, and fit.",
    },
    about: {
      label: "The principle",
      h: "In an industry built on people, we believe the most important hire you make is the one you can trust unconditionally.",
      p: "Cipher was founded on a single conviction: that hospitality thrives when the right people are in the right rooms. We know every candidate on our roster personally. We have worked alongside them, broken bread with them, and staked our reputation on their character before a single introduction is ever made.",
    },
    services: {
      label: "What we do",
      emp: {
        label: "For employers",
        h1: "Your next leader,",
        h2: "already verified.",
        p: "We present a curated shortlist of candidates who have been personally assessed for technical mastery, cultural alignment, and the quiet reliability that defines lasting hires. No databases. No algorithms. Only people we would trust in our own establishments.",
        roles: [
          "Executive chefs and sous chefs",
          "General managers and operations directors",
          "Sommeliers, F&B directors, and maître d's",
          "Hotel leadership and front-of-house principals",
        ],
        cta: "Request a shortlist",
      },
      tal: {
        label: "For talent",
        h1: "Your craft deserves",
        h2: "the right stage.",
        p: "We represent professionals who take their work personally. Joining the Cipher roster means gaining a confidential partner who understands your ambitions, protects your privacy, and introduces you only to opportunities worthy of your next chapter.",
        cta: "Join the roster",
      },
    },
    quote: {
      text: "\u201CThe greatest compliment in our industry is not a review or an award. It is when someone trusts you with their team.\u201D",
      attr: "\u2014 Cipher founding principle",
    },
    team: {
      label: "The people",
      h: "Built on relationships, not resumes.",
      members: [
        { name: "Elena Marchetti", role: "Founder & Managing Director", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop" },
        { name: "Thomas Renaud", role: "Head of Talent", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
        { name: "Sofia Alvarez", role: "Client Relations", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" },
        { name: "James Whitfield", role: "Senior Consultant", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop" },
        { name: "Amélie Fontaine", role: "Research & Vetting", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" },
      ],
    },
    process: {
      label: "The process",
      h: "Discretion at every step.",
      steps: [
        { num: "01", title: "Consultation", text: "We listen. We learn your culture, your standards, and the qualities that matter beyond the CV. Every engagement begins with understanding, never assumptions." },
        { num: "02", title: "Curation", text: "From our personally verified roster, we select a confidential shortlist. Each candidate has been assessed for skill, temperament, and integrity. We present only those we would hire ourselves." },
        { num: "03", title: "Placement", text: "We facilitate introductions, guide the conversation, and remain present through onboarding. Our work is not finished when the contract is signed. It is finished when the fit is proven." },
      ],
    },
    contact: {
      label: "Begin a conversation",
      h1: "The best placements start",
      h2: "with a quiet conversation.",
      p: "Whether you are looking to strengthen your team or considering your next move, we are here to listen. Every exchange is confidential.",
      cta: "Book a meeting",
    },
    footer: { rights: "All rights reserved." },
  },
  fr: {
    nav: { about: "À propos", services: "Services", process: "Processus", contact: "Contact", cta: "Prendre rendez-vous" },
    hero: {
      h1: "Recrutez des professionnels de l\u2019hôtellerie en qui vous pouvez avoir confiance.",
      sub: "Cipher met en relation restaurants et marques hôtelières avec des opérateurs éprouvés, sélectionnés pour leur savoir-faire, leur fiabilité et leur adéquation.",
    },
    about: {
      label: "Le principe",
      h: "Dans une industrie fondée sur l\u2019humain, nous croyons que le recrutement le plus important est celui en qui vous pouvez avoir une confiance absolue.",
      p: "Cipher est née d\u2019une conviction unique : l\u2019hôtellerie prospère lorsque les bonnes personnes occupent les bons postes. Nous connaissons personnellement chaque candidat de notre réseau. Nous avons travaillé à leurs côtés, partagé leur table, et engagé notre réputation sur leur intégrité avant toute mise en relation.",
    },
    services: {
      label: "Ce que nous faisons",
      emp: {
        label: "Pour les employeurs",
        h1: "Votre prochain leader,",
        h2: "déjà vérifié.",
        p: "Nous présentons une sélection de candidats personnellement évalués pour leur maîtrise technique, leur compatibilité culturelle et cette fiabilité discrète qui définit les recrutements durables. Pas de bases de données. Pas d\u2019algorithmes. Uniquement des personnes que nous recruterions nous-mêmes.",
        roles: [
          "Chefs exécutifs et sous-chefs",
          "Directeurs généraux et directeurs des opérations",
          "Sommeliers, directeurs F&B et maîtres d\u2019hôtel",
          "Cadres hôteliers et responsables de salle",
        ],
        cta: "Demander une sélection",
      },
      tal: {
        label: "Pour les talents",
        h1: "Votre savoir-faire mérite",
        h2: "la bonne scène.",
        p: "Nous représentons des professionnels qui prennent leur métier à cœur. Rejoindre le réseau Cipher, c\u2019est gagner un partenaire confidentiel qui comprend vos ambitions, protège votre vie privée et ne vous présente qu\u2019à des opportunités dignes de votre prochain chapitre.",
        cta: "Rejoindre le réseau",
      },
    },
    quote: {
      text: "\u00AB Le plus beau compliment dans notre industrie n\u2019est ni une critique ni un prix. C\u2019est quand quelqu\u2019un vous confie son équipe. \u00BB",
      attr: "\u2014 Principe fondateur de Cipher",
    },
    team: {
      label: "Les personnes",
      h: "Fondé sur les relations, pas les CV.",
      members: [
        { name: "Elena Marchetti", role: "Fondatrice & Directrice générale", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop" },
        { name: "Thomas Renaud", role: "Directeur des talents", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
        { name: "Sofia Alvarez", role: "Relations clients", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" },
        { name: "James Whitfield", role: "Consultant senior", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop" },
        { name: "Amélie Fontaine", role: "Recherche & vérification", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" },
      ],
    },
    process: {
      label: "Le processus",
      h: "De la discrétion à chaque étape.",
      steps: [
        { num: "01", title: "Consultation", text: "Nous écoutons. Nous apprenons votre culture, vos standards et les qualités qui comptent au-delà du CV. Chaque engagement commence par la compréhension, jamais par des suppositions." },
        { num: "02", title: "Sélection", text: "À partir de notre réseau personnellement vérifié, nous constituons une liste confidentielle. Chaque candidat a été évalué pour ses compétences, son tempérament et son intégrité. Nous ne présentons que ceux que nous recruterions nous-mêmes." },
        { num: "03", title: "Placement", text: "Nous facilitons les présentations, guidons les échanges et restons présents durant l\u2019intégration. Notre travail ne s\u2019achève pas à la signature du contrat. Il s\u2019achève quand l\u2019adéquation est prouvée." },
      ],
    },
    contact: {
      label: "Entamer une conversation",
      h1: "Les meilleurs placements commencent",
      h2: "par une conversation discrète.",
      p: "Que vous cherchiez à renforcer votre équipe ou que vous envisagiez votre prochain défi, nous sommes à votre écoute. Chaque échange est confidentiel.",
      cta: "Prendre rendez-vous",
    },
    footer: { rights: "Tous droits réservés." },
  },
  es: {
    nav: { about: "Nosotros", services: "Servicios", process: "Proceso", contact: "Contacto", cta: "Reservar una reunión" },
    hero: {
      h1: "Contrate profesionales de hostelería en quienes pueda confiar.",
      sub: "Cipher conecta restaurantes y marcas hoteleras con operadores probados, seleccionados por su oficio, fiabilidad y encaje.",
    },
    about: {
      label: "El principio",
      h: "En una industria construida sobre personas, creemos que la contratación más importante es aquella en la que se puede confiar incondicionalmente.",
      p: "Cipher nació de una sola convicción: la hostelería prospera cuando las personas adecuadas están en los puestos adecuados. Conocemos personalmente a cada candidato de nuestra red. Hemos trabajado a su lado, compartido mesa con ellos y apostado nuestra reputación por su carácter antes de realizar cualquier presentación.",
    },
    services: {
      label: "Lo que hacemos",
      emp: {
        label: "Para empleadores",
        h1: "Su próximo líder,",
        h2: "ya verificado.",
        p: "Presentamos una selección de candidatos evaluados personalmente por su dominio técnico, su alineación cultural y esa fiabilidad discreta que define las contrataciones duraderas. Sin bases de datos. Sin algoritmos. Solo personas que nosotros mismos contrataríamos.",
        roles: [
          "Chefs ejecutivos y sous chefs",
          "Directores generales y de operaciones",
          "Sommeliers, directores de F&B y maîtres",
          "Liderazgo hotelero y responsables de sala",
        ],
        cta: "Solicitar una selección",
      },
      tal: {
        label: "Para el talento",
        h1: "Su oficio merece",
        h2: "el escenario adecuado.",
        p: "Representamos a profesionales que se toman su trabajo de forma personal. Unirse a la red de Cipher significa ganar un socio confidencial que entiende sus ambiciones, protege su privacidad y solo le presenta oportunidades dignas de su próximo capítulo.",
        cta: "Unirse a la red",
      },
    },
    quote: {
      text: "\u00AB El mayor halago en nuestra industria no es una reseña ni un premio. Es cuando alguien te confía su equipo. \u00BB",
      attr: "\u2014 Principio fundacional de Cipher",
    },
    team: {
      label: "Las personas",
      h: "Construido sobre relaciones, no currículos.",
      members: [
        { name: "Elena Marchetti", role: "Fundadora y Directora general", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop" },
        { name: "Thomas Renaud", role: "Director de talento", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
        { name: "Sofia Alvarez", role: "Relaciones con clientes", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" },
        { name: "James Whitfield", role: "Consultor senior", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop" },
        { name: "Amélie Fontaine", role: "Investigación y verificación", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" },
      ],
    },
    process: {
      label: "El proceso",
      h: "Discreción en cada paso.",
      steps: [
        { num: "01", title: "Consulta", text: "Escuchamos. Aprendemos su cultura, sus estándares y las cualidades que importan más allá del CV. Cada compromiso comienza con comprensión, nunca con suposiciones." },
        { num: "02", title: "Selección", text: "De nuestra red personalmente verificada, seleccionamos una lista confidencial. Cada candidato ha sido evaluado por sus habilidades, temperamento e integridad. Solo presentamos a quienes nosotros mismos contrataríamos." },
        { num: "03", title: "Colocación", text: "Facilitamos las presentaciones, guiamos la conversación y permanecemos presentes durante la incorporación. Nuestro trabajo no termina con la firma del contrato. Termina cuando el encaje está demostrado." },
      ],
    },
    contact: {
      label: "Iniciar una conversación",
      h1: "Las mejores colocaciones comienzan",
      h2: "con una conversación discreta.",
      p: "Ya sea que busque fortalecer su equipo o esté considerando su próximo paso, estamos aquí para escuchar. Cada intercambio es confidencial.",
      cta: "Reservar una reunión",
    },
    footer: { rights: "Todos los derechos reservados." },
  },
} as const;

/* ── shared animation helpers ── */
const easing = [0.25, 0.1, 0.25, 1] as const;

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easing, delay: d },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const lineDraw = {
  hidden: { scaleY: 0 },
  visible: (d: number = 0) => ({
    scaleY: 1,
    transition: { duration: 1, ease: easing, delay: d },
  }),
};

const imgReveal = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: easing },
  },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const c = t[lang];

  /* ── Lenis smooth scroll for anchor links ── */
  const lenis = useLenis();
  const scrollTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      lenis?.scrollTo(href, { offset: 0, duration: 1.2 });
    },
    [lenis],
  );

  /* ── Team: scroll-triggered horizontal scroll ── */
  const teamSectionRef = useRef<HTMLDivElement>(null);
  const teamScrollRef = useRef<HTMLDivElement>(null);
  const [teamScrollRange, setTeamScrollRange] = useState(0);

  useEffect(() => {
    const calculateRange = () => {
      if (teamScrollRef.current) {
        setTeamScrollRange(
          Math.max(0, teamScrollRef.current.scrollWidth - window.innerWidth)
        );
      }
    };
    calculateRange();
    window.addEventListener("resize", calculateRange);
    return () => window.removeEventListener("resize", calculateRange);
  }, [lang]);

  const { scrollYProgress: teamProgress } = useScroll({
    target: teamSectionRef,
    offset: ["start start", "end end"],
  });

  const teamX = useTransform(teamProgress, [0, 1], [0, -teamScrollRange]);
  const teamOpacity = useTransform(teamProgress, [0, 0.05], [0, 1]);

  const navItems = [
    { label: c.nav.about, href: "#about" },
    { label: c.nav.services, href: "#services" },
    { label: c.nav.process, href: "#process" },
  ];

  return (
    <>
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background — animated SVG golden line art */}
      <HeroBackground />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex w-full items-center justify-between px-8 py-6 lg:px-12"
        >
          {/* Left — Language switcher */}
          <nav className="flex items-center gap-2 text-xs tracking-wide">
            {(["en", "fr", "es"] as Lang[]).map((l, i) => (
              <span key={l} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/30">|</span>}
                <button
                  onClick={() => setLang(l)}
                  className={`transition hover:text-white ${lang === l ? "font-semibold text-white" : "text-white/60"}`}
                >
                  {l.toUpperCase()}
                </button>
              </span>
            ))}
          </nav>

          {/* Center — Brand */}
          <span className="absolute left-1/2 -translate-x-1/2 text-lg font-light tracking-[0.35em] uppercase">
            Cipher
          </span>

          {/* Right — Desktop navigation */}
          <nav className="hidden items-center gap-8 text-xs uppercase tracking-wider lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={(e) => scrollTo(e, item.href)} className="text-white/70 transition hover:text-white">
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, "#contact")}
              className="rounded-full border border-white/80 px-5 py-2 text-xs transition hover:bg-white hover:text-black"
            >
              {c.nav.cta}
            </a>
          </nav>

          {/* Right — Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative flex h-8 w-8 flex-col items-end justify-center gap-[6px] lg:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[1px] w-6 bg-white transition-all duration-300 ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1px] bg-white transition-all duration-300 ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45 w-6" : "w-4"
              }`}
            />
          </button>
        </motion.header>

        {/* Mobile menu — fullscreen overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex flex-col bg-black lg:hidden"
            >
              <div className="flex w-full items-center justify-between px-8 py-6">
                <span className="text-lg font-light tracking-[0.35em] uppercase">
                  Cipher
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="relative flex h-8 w-8 flex-col items-center justify-center"
                  aria-label="Close menu"
                >
                  <span className="block h-[1px] w-6 translate-y-[0.5px] rotate-45 bg-white" />
                  <span className="block h-[1px] w-6 -translate-y-[0.5px] -rotate-45 bg-white" />
                </button>
              </div>

              <motion.nav
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="flex flex-1 flex-col items-center justify-center gap-8 uppercase tracking-wider"
              >
                {navItems.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => { setMenuOpen(false); scrollTo(e, item.href); }}
                    variants={fade}
                    className="text-2xl font-light tracking-wide text-white/80 transition hover:text-white"
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  onClick={(e) => { setMenuOpen(false); scrollTo(e, "#contact"); }}
                  variants={fade}
                  className="mt-4 rounded-full border border-white/80 px-8 py-3 text-lg font-light tracking-wide transition hover:bg-white hover:text-black"
                >
                  {c.nav.cta}
                </motion.a>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero */}
        <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <motion.div
            variants={lineDraw}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="h-16 w-px origin-top bg-linear-to-b from-transparent via-white/40 to-white/60 md:h-28 lg:h-32"
          />
          <div className="my-10 md:my-14">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: easing }}
              className="max-w-2xl font-light leading-tight tracking-tight text-[37px] md:text-[49px] lg:text-[61px]"
            >
              {c.hero.h1}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: easing }}
              className="mt-6 max-w-xl mx-auto leading-relaxed text-white/70 text-[17px] md:text-[19px]"
            >
              {c.hero.sub}
            </motion.p>
          </div>
          <motion.div
            variants={lineDraw}
            initial="hidden"
            animate="visible"
            custom={1.3}
            className="h-16 w-px origin-top bg-linear-to-b from-white/60 via-white/40 to-transparent md:h-28 lg:h-32"
          />
        </main>
      </div>
    </div>

    {/* ── About ── */}
    <section id="about" className="bg-white text-black">
      <div className="mx-auto max-w-3xl px-8 py-32 text-center md:py-44">
        <motion.p
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-xs uppercase tracking-[0.3em] text-black/40"
        >
          {c.about.label}
        </motion.p>
        <motion.p
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.15}
          className="mt-10 text-[22px] font-light leading-relaxed md:text-[28px]"
        >
          {c.about.h}
        </motion.p>
        <motion.p
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.3}
          className="mt-8 text-[15px] leading-relaxed text-black/50 md:text-[17px]"
        >
          {c.about.p}
        </motion.p>
        <motion.div
          variants={lineDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          custom={0.4}
          className="mx-auto mt-14 h-12 w-px origin-top bg-black/15 md:h-16"
        />
      </div>
    </section>

    {/* ── Services ── */}
    <section id="services" className="bg-[#f5f4f0] text-black">
      <div className="mx-auto max-w-6xl px-8 py-32 md:py-44">
        <motion.p
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center text-xs uppercase tracking-[0.3em] text-black/40"
        >
          {c.services.label}
        </motion.p>

        {/* For employers */}
        <div className="mt-20 grid items-start gap-16 md:grid-cols-2 md:gap-24">
          <motion.div
            variants={imgReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1074&auto=format&fit=crop"
              alt="Fine dining restaurant interior"
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="flex flex-col justify-center md:py-16"
          >
            <motion.p variants={fade} className="text-xs uppercase tracking-[0.3em] text-black/40">
              {c.services.emp.label}
            </motion.p>
            <motion.h2 variants={fade} className="mt-4 text-[28px] font-light leading-snug md:text-[36px]">
              {c.services.emp.h1}
              <br />
              {c.services.emp.h2}
            </motion.h2>
            <motion.p variants={fade} className="mt-6 text-[15px] leading-relaxed text-black/60">
              {c.services.emp.p}
            </motion.p>
            <motion.ul variants={fade} className="mt-8 space-y-3 text-[14px] text-black/50">
              {c.services.emp.roles.map((role) => (
                <li key={role} className="flex items-start gap-3">
                  <span className="mt-1.5 block h-px w-4 shrink-0 bg-black/30" />
                  {role}
                </li>
              ))}
            </motion.ul>
            <motion.a
              variants={fade}
              href="#contact"
              onClick={(e) => scrollTo(e, "#contact")}
              className="mt-10 inline-block self-start border-b border-black/30 pb-1 text-xs uppercase tracking-[0.2em] transition hover:border-black"
            >
              {c.services.emp.cta}
            </motion.a>
          </motion.div>
        </div>

        {/* For talent */}
        <div className="mt-32 grid items-start gap-16 md:grid-cols-2 md:gap-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="order-2 md:order-1 flex flex-col justify-center md:py-16"
          >
            <motion.p variants={fade} className="text-xs uppercase tracking-[0.3em] text-black/40">
              {c.services.tal.label}
            </motion.p>
            <motion.h2 variants={fade} className="mt-4 text-[28px] font-light leading-snug md:text-[36px]">
              {c.services.tal.h1}
              <br />
              {c.services.tal.h2}
            </motion.h2>
            <motion.p variants={fade} className="mt-6 text-[15px] leading-relaxed text-black/60">
              {c.services.tal.p}
            </motion.p>
            <motion.a
              variants={fade}
              href="#contact"
              onClick={(e) => scrollTo(e, "#contact")}
              className="mt-10 inline-block self-start border-b border-black/30 pb-1 text-xs uppercase tracking-[0.2em] transition hover:border-black"
            >
              {c.services.tal.cta}
            </motion.a>
          </motion.div>
          <motion.div
            variants={imgReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="order-1 md:order-2"
          >
            <img
              src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1074&auto=format&fit=crop"
              alt="Chef at work"
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── Quote ── */}
    <section className="bg-white text-black">
      <div className="mx-auto max-w-3xl px-8 py-28 text-center md:py-36">
        <motion.p
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-[20px] font-light leading-relaxed italic md:text-[26px]"
        >
          {c.quote.text}
        </motion.p>
        <motion.p
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.2}
          className="mt-8 text-xs uppercase tracking-[0.3em] text-black/40"
        >
          {c.quote.attr}
        </motion.p>
      </div>
    </section>

    {/* ── Team ── */}
    <section
      ref={teamSectionRef}
      className="relative bg-[#f5f4f0] text-black"
      style={{ height: "250vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-8">
          <motion.p
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-xs uppercase tracking-[0.3em] text-black/40"
          >
            {c.team.label}
          </motion.p>
          <motion.h2
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.15}
            className="mt-4 text-[28px] font-light leading-snug md:text-[36px]"
          >
            {c.team.h}
          </motion.h2>
        </div>

        <motion.div
          ref={teamScrollRef}
          style={{ x: teamX, opacity: teamOpacity }}
          className="mt-16 flex gap-6 pl-8 pr-16 md:gap-8 md:pl-[calc((100vw-72rem)/2+2rem)]"
        >
          {c.team.members.map((member) => (
            <div
              key={member.name}
              className="group w-[280px] shrink-0 md:w-[320px]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  className="aspect-[3/4] w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>
              <div className="mt-5">
                <p className="text-[15px] font-light tracking-wide">
                  {member.name}
                </p>
                <p className="mt-1 text-[12px] uppercase tracking-[0.2em] text-black/40">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ── Process ── */}
    <section id="process" className="bg-black text-white">
      <div className="mx-auto max-w-4xl px-8 py-32 md:py-44">
        <motion.p
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center text-xs uppercase tracking-[0.3em] text-white/40"
        >
          {c.process.label}
        </motion.p>
        <motion.h2
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.15}
          className="mt-6 text-center text-[28px] font-light leading-snug md:text-[36px]"
        >
          {c.process.h}
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mt-24 grid gap-20 md:grid-cols-3 md:gap-12"
        >
          {c.process.steps.map((step) => (
            <motion.div key={step.num} variants={fade} className="text-center">
              <span className="text-[48px] font-extralight text-white/20">{step.num}</span>
              <h3 className="mt-4 text-[15px] uppercase tracking-[0.2em]">
                {step.title}
              </h3>
              <p className="mt-4 text-[14px] leading-relaxed text-white/50">
                {step.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={lineDraw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          custom={0.2}
          className="mx-auto mt-20 h-12 w-px origin-top bg-white/15 md:h-16"
        />
      </div>
    </section>

    {/* ── Full-width image break ── */}
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2 }}
      className="relative h-[50vh] md:h-[60vh]"
    >
      <img
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
        alt="Restaurant atmosphere"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
    </motion.section>

    {/* ── Contact / CTA ── */}
    <section id="contact" className="bg-white text-black">
      <div className="mx-auto max-w-2xl px-8 py-32 text-center md:py-44">
        <motion.p
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-xs uppercase tracking-[0.3em] text-black/40"
        >
          {c.contact.label}
        </motion.p>
        <motion.h2
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.15}
          className="mt-6 text-[28px] font-light leading-snug md:text-[36px]"
        >
          {c.contact.h1}
          <br />
          {c.contact.h2}
        </motion.h2>
        <motion.p
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.3}
          className="mt-8 text-[15px] leading-relaxed text-black/50"
        >
          {c.contact.p}
        </motion.p>
        <motion.a
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.45}
          href="#contact"
          onClick={(e) => scrollTo(e, "#contact")}
          className="mt-12 inline-block rounded-full border border-black/80 px-8 py-3 text-xs uppercase tracking-[0.2em] transition hover:bg-black hover:text-white"
        >
          {c.contact.cta}
        </motion.a>
      </div>
    </section>

    {/* ── Footer ── */}
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-8 py-16 md:flex-row md:justify-between">
        <span className="text-sm font-light tracking-[0.35em] uppercase">
          Cipher
        </span>
        <nav className="flex gap-8 text-xs uppercase tracking-wider text-white/50">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={(e) => scrollTo(e, item.href)} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-white/30">
          &copy; {new Date().getFullYear()} Cipher. {c.footer.rights}
        </p>
      </div>
    </footer>
  </>
  );
}
