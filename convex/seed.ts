import { mutation } from "./_generated/server";

const seedContent = {
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
          "Sommeliers, F&B directors, and ma\u00EEtre d\u2019s",
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
        { name: "Elena Marchetti", role: "Founder & Managing Director" },
        { name: "Thomas Renaud", role: "Head of Talent" },
        { name: "Sofia Alvarez", role: "Client Relations" },
        { name: "James Whitfield", role: "Senior Consultant" },
        { name: "Am\u00E9lie Fontaine", role: "Research & Vetting" },
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
      form: {
        heading: "Get in touch",
        sub: "Tell us a little about what you are looking for. Every exchange is confidential.",
        name: "Full name",
        email: "Email address",
        company: "Company / brand",
        message: "How can we help?",
        send: "Send inquiry",
      },
      booking: {
        heading: "Book a meeting",
        sub: "Prefer a direct conversation? Schedule a confidential call with our team at a time that suits you.",
        cta: "Schedule a call",
      },
    },
    footer: { rights: "All rights reserved." },
  },
  fr: {
    nav: { about: "\u00C0 propos", services: "Services", process: "Processus", contact: "Contact", cta: "Prendre rendez-vous" },
    hero: {
      h1: "Recrutez des professionnels de l\u2019h\u00F4tellerie en qui vous pouvez avoir confiance.",
      sub: "Cipher met en relation restaurants et marques h\u00F4teli\u00E8res avec des op\u00E9rateurs \u00E9prouv\u00E9s, s\u00E9lectionn\u00E9s pour leur savoir-faire, leur fiabilit\u00E9 et leur ad\u00E9quation.",
    },
    about: {
      label: "Le principe",
      h: "Dans une industrie fond\u00E9e sur l\u2019humain, nous croyons que le recrutement le plus important est celui en qui vous pouvez avoir une confiance absolue.",
      p: "Cipher est n\u00E9e d\u2019une conviction unique : l\u2019h\u00F4tellerie prosp\u00E8re lorsque les bonnes personnes occupent les bons postes. Nous connaissons personnellement chaque candidat de notre r\u00E9seau. Nous avons travaill\u00E9 \u00E0 leurs c\u00F4t\u00E9s, partag\u00E9 leur table, et engag\u00E9 notre r\u00E9putation sur leur int\u00E9grit\u00E9 avant toute mise en relation.",
    },
    services: {
      label: "Ce que nous faisons",
      emp: {
        label: "Pour les employeurs",
        h1: "Votre prochain leader,",
        h2: "d\u00E9j\u00E0 v\u00E9rifi\u00E9.",
        p: "Nous pr\u00E9sentons une s\u00E9lection de candidats personnellement \u00E9valu\u00E9s pour leur ma\u00EEtrise technique, leur compatibilit\u00E9 culturelle et cette fiabilit\u00E9 discr\u00E8te qui d\u00E9finit les recrutements durables. Pas de bases de donn\u00E9es. Pas d\u2019algorithmes. Uniquement des personnes que nous recruterions nous-m\u00EAmes.",
        roles: [
          "Chefs ex\u00E9cutifs et sous-chefs",
          "Directeurs g\u00E9n\u00E9raux et directeurs des op\u00E9rations",
          "Sommeliers, directeurs F&B et ma\u00EEtres d\u2019h\u00F4tel",
          "Cadres h\u00F4teliers et responsables de salle",
        ],
        cta: "Demander une s\u00E9lection",
      },
      tal: {
        label: "Pour les talents",
        h1: "Votre savoir-faire m\u00E9rite",
        h2: "la bonne sc\u00E8ne.",
        p: "Nous repr\u00E9sentons des professionnels qui prennent leur m\u00E9tier \u00E0 c\u0153ur. Rejoindre le r\u00E9seau Cipher, c\u2019est gagner un partenaire confidentiel qui comprend vos ambitions, prot\u00E8ge votre vie priv\u00E9e et ne vous pr\u00E9sente qu\u2019\u00E0 des opportunit\u00E9s dignes de votre prochain chapitre.",
        cta: "Rejoindre le r\u00E9seau",
      },
    },
    quote: {
      text: "\u00AB Le plus beau compliment dans notre industrie n\u2019est ni une critique ni un prix. C\u2019est quand quelqu\u2019un vous confie son \u00E9quipe. \u00BB",
      attr: "\u2014 Principe fondateur de Cipher",
    },
    team: {
      label: "Les personnes",
      h: "Fond\u00E9 sur les relations, pas les CV.",
      members: [
        { name: "Elena Marchetti", role: "Fondatrice & Directrice g\u00E9n\u00E9rale" },
        { name: "Thomas Renaud", role: "Directeur des talents" },
        { name: "Sofia Alvarez", role: "Relations clients" },
        { name: "James Whitfield", role: "Consultant senior" },
        { name: "Am\u00E9lie Fontaine", role: "Recherche & v\u00E9rification" },
      ],
    },
    process: {
      label: "Le processus",
      h: "De la discr\u00E9tion \u00E0 chaque \u00E9tape.",
      steps: [
        { num: "01", title: "Consultation", text: "Nous \u00E9coutons. Nous apprenons votre culture, vos standards et les qualit\u00E9s qui comptent au-del\u00E0 du CV. Chaque engagement commence par la compr\u00E9hension, jamais par des suppositions." },
        { num: "02", title: "S\u00E9lection", text: "\u00C0 partir de notre r\u00E9seau personnellement v\u00E9rifi\u00E9, nous constituons une liste confidentielle. Chaque candidat a \u00E9t\u00E9 \u00E9valu\u00E9 pour ses comp\u00E9tences, son temp\u00E9rament et son int\u00E9grit\u00E9. Nous ne pr\u00E9sentons que ceux que nous recruterions nous-m\u00EAmes." },
        { num: "03", title: "Placement", text: "Nous facilitons les pr\u00E9sentations, guidons les \u00E9changes et restons pr\u00E9sents durant l\u2019int\u00E9gration. Notre travail ne s\u2019ach\u00E8ve pas \u00E0 la signature du contrat. Il s\u2019ach\u00E8ve quand l\u2019ad\u00E9quation est prouv\u00E9e." },
      ],
    },
    contact: {
      label: "Entamer une conversation",
      h1: "Les meilleurs placements commencent",
      h2: "par une conversation discr\u00E8te.",
      form: {
        heading: "Nous contacter",
        sub: "Dites-nous ce que vous recherchez. Chaque \u00E9change est confidentiel.",
        name: "Nom complet",
        email: "Adresse e-mail",
        company: "Entreprise / marque",
        message: "Comment pouvons-nous vous aider ?",
        send: "Envoyer la demande",
      },
      booking: {
        heading: "Prendre rendez-vous",
        sub: "Vous pr\u00E9f\u00E9rez une conversation directe ? Planifiez un appel confidentiel avec notre \u00E9quipe.",
        cta: "Planifier un appel",
      },
    },
    footer: { rights: "Tous droits r\u00E9serv\u00E9s." },
  },
  es: {
    nav: { about: "Nosotros", services: "Servicios", process: "Proceso", contact: "Contacto", cta: "Reservar una reuni\u00F3n" },
    hero: {
      h1: "Contrate profesionales de hosteler\u00EDa en quienes pueda confiar.",
      sub: "Cipher conecta restaurantes y marcas hoteleras con operadores probados, seleccionados por su oficio, fiabilidad y encaje.",
    },
    about: {
      label: "El principio",
      h: "En una industria construida sobre personas, creemos que la contrataci\u00F3n m\u00E1s importante es aquella en la que se puede confiar incondicionalmente.",
      p: "Cipher naci\u00F3 de una sola convicci\u00F3n: la hosteler\u00EDa prospera cuando las personas adecuadas est\u00E1n en los puestos adecuados. Conocemos personalmente a cada candidato de nuestra red. Hemos trabajado a su lado, compartido mesa con ellos y apostado nuestra reputaci\u00F3n por su car\u00E1cter antes de realizar cualquier presentaci\u00F3n.",
    },
    services: {
      label: "Lo que hacemos",
      emp: {
        label: "Para empleadores",
        h1: "Su pr\u00F3ximo l\u00EDder,",
        h2: "ya verificado.",
        p: "Presentamos una selecci\u00F3n de candidatos evaluados personalmente por su dominio t\u00E9cnico, su alineaci\u00F3n cultural y esa fiabilidad discreta que define las contrataciones duraderas. Sin bases de datos. Sin algoritmos. Solo personas que nosotros mismos contratar\u00EDamos.",
        roles: [
          "Chefs ejecutivos y sous chefs",
          "Directores generales y de operaciones",
          "Sommeliers, directores de F&B y ma\u00EEtres",
          "Liderazgo hotelero y responsables de sala",
        ],
        cta: "Solicitar una selecci\u00F3n",
      },
      tal: {
        label: "Para el talento",
        h1: "Su oficio merece",
        h2: "el escenario adecuado.",
        p: "Representamos a profesionales que se toman su trabajo de forma personal. Unirse a la red de Cipher significa ganar un socio confidencial que entiende sus ambiciones, protege su privacidad y solo le presenta oportunidades dignas de su pr\u00F3ximo cap\u00EDtulo.",
        cta: "Unirse a la red",
      },
    },
    quote: {
      text: "\u00AB El mayor halago en nuestra industria no es una rese\u00F1a ni un premio. Es cuando alguien te conf\u00EDa su equipo. \u00BB",
      attr: "\u2014 Principio fundacional de Cipher",
    },
    team: {
      label: "Las personas",
      h: "Construido sobre relaciones, no curr\u00EDculos.",
      members: [
        { name: "Elena Marchetti", role: "Fundadora y Directora general" },
        { name: "Thomas Renaud", role: "Director de talento" },
        { name: "Sofia Alvarez", role: "Relaciones con clientes" },
        { name: "James Whitfield", role: "Consultor senior" },
        { name: "Am\u00E9lie Fontaine", role: "Investigaci\u00F3n y verificaci\u00F3n" },
      ],
    },
    process: {
      label: "El proceso",
      h: "Discreci\u00F3n en cada paso.",
      steps: [
        { num: "01", title: "Consulta", text: "Escuchamos. Aprendemos su cultura, sus est\u00E1ndares y las cualidades que importan m\u00E1s all\u00E1 del CV. Cada compromiso comienza con comprensi\u00F3n, nunca con suposiciones." },
        { num: "02", title: "Selecci\u00F3n", text: "De nuestra red personalmente verificada, seleccionamos una lista confidencial. Cada candidato ha sido evaluado por sus habilidades, temperamento e integridad. Solo presentamos a quienes nosotros mismos contratar\u00EDamos." },
        { num: "03", title: "Colocaci\u00F3n", text: "Facilitamos las presentaciones, guiamos la conversaci\u00F3n y permanecemos presentes durante la incorporaci\u00F3n. Nuestro trabajo no termina con la firma del contrato. Termina cuando el encaje est\u00E1 demostrado." },
      ],
    },
    contact: {
      label: "Iniciar una conversaci\u00F3n",
      h1: "Las mejores colocaciones comienzan",
      h2: "con una conversaci\u00F3n discreta.",
      form: {
        heading: "Cont\u00E1ctenos",
        sub: "Cu\u00E9ntenos un poco sobre lo que busca. Cada intercambio es confidencial.",
        name: "Nombre completo",
        email: "Correo electr\u00F3nico",
        company: "Empresa / marca",
        message: "\u00BFC\u00F3mo podemos ayudarle?",
        send: "Enviar consulta",
      },
      booking: {
        heading: "Reservar una reuni\u00F3n",
        sub: "\u00BFPrefiere una conversaci\u00F3n directa? Programe una llamada confidencial con nuestro equipo.",
        cta: "Programar una llamada",
      },
    },
    footer: { rights: "Todos los derechos reservados." },
  },
};

const seedImages = [
  { key: "services_employer", url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1074&auto=format&fit=crop", alt: "Fine dining restaurant interior" },
  { key: "services_talent", url: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1074&auto=format&fit=crop", alt: "Chef at work" },
  { key: "fullwidth_break", url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop", alt: "Restaurant atmosphere" },
  { key: "team_0", url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop", alt: "Elena Marchetti" },
  { key: "team_1", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop", alt: "Thomas Renaud" },
  { key: "team_2", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop", alt: "Sofia Alvarez" },
  { key: "team_3", url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop", alt: "James Whitfield" },
  { key: "team_4", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop", alt: "Am\u00E9lie Fontaine" },
];

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("content").first();
    if (existing) return "Already seeded";

    await ctx.db.insert("content", seedContent);

    for (const img of seedImages) {
      await ctx.db.insert("images", { ...img, storageId: undefined });
    }

    return "Seeded successfully";
  },
});
