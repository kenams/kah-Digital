/**
 * Agent 1 : Lead Discovery
 * Sources : DuckDuckGo (2 targets parallèles) → Annuaires → Fallback statique
 * Extraction : email (multi-chemin) + téléphone
 */

export type DiscoveredLead = {
  businessName: string;
  website: string;
  address: string;
  country: string;
  language: string;
  sector: string;
  placeId: string;
  email?: string | null;
  phone?: string | null;
  emailGuessed?: boolean;
};

// ── DuckDuckGo targets ───────────────────────────────────────────────────────
const TARGETS = [
  // ── France — secteurs à budget élevé (avocats, notaires, médecins, architectes) ──
  { query: "cabinet avocat paris site web contact", country: "FR", lang: "fr", sector: "avocat" },
  { query: "notaire lyon site web contact", country: "FR", lang: "fr", sector: "notaire" },
  { query: "architecte bordeaux site web cabinet", country: "FR", lang: "fr", sector: "architecte" },
  { query: "expert comptable nantes site web", country: "FR", lang: "fr", sector: "comptable" },
  { query: "coach business paris site web", country: "FR", lang: "fr", sector: "coach" },
  { query: "photographe mariage lyon site web", country: "FR", lang: "fr", sector: "photographe" },
  { query: "nutritionniste dieteticien paris site web cabinet", country: "FR", lang: "fr", sector: "sante" },
  { query: "coach sportif personal trainer paris site web", country: "FR", lang: "fr", sector: "sport" },
  { query: "osteopathe toulouse site web cabinet", country: "FR", lang: "fr", sector: "sante" },
  { query: "decoration interieur interior designer paris site web", country: "FR", lang: "fr", sector: "deco" },
  { query: "agence communication marseille site web", country: "FR", lang: "fr", sector: "agence" },
  { query: "consultant rh paris site web indépendant", country: "FR", lang: "fr", sector: "rh" },
  { query: "therapeute psychologue strasbourg site web", country: "FR", lang: "fr", sector: "sante" },
  { query: "artisan menuisier paris site web artisan", country: "FR", lang: "fr", sector: "menuiserie" },
  { query: "traiteur evenementiel paris site web", country: "FR", lang: "fr", sector: "evenementiel" },
  // ── France — secteurs classiques ──
  { query: "restaurant paris site web contact", country: "FR", lang: "fr", sector: "restaurant" },
  { query: "coiffeur lyon site web contact", country: "FR", lang: "fr", sector: "coiffure" },
  { query: "boulangerie marseille site web contact", country: "FR", lang: "fr", sector: "boulangerie" },
  { query: "plombier bordeaux site web contact", country: "FR", lang: "fr", sector: "plomberie" },
  { query: "fleuriste toulouse site web contact", country: "FR", lang: "fr", sector: "fleuriste" },
  { query: "cabinet dentaire nantes site web", country: "FR", lang: "fr", sector: "dentiste" },
  { query: "agence immobiliere strasbourg site web", country: "FR", lang: "fr", sector: "immobilier" },
  { query: "pizzeria nice site web contact", country: "FR", lang: "fr", sector: "restaurant" },
  { query: "salon esthetique montpellier site web", country: "FR", lang: "fr", sector: "esthetique" },
  { query: "electricien grenoble site web artisan", country: "FR", lang: "fr", sector: "electricite" },
  { query: "opticien clermont ferrand site web", country: "FR", lang: "fr", sector: "optique" },
  { query: "psychologue paris site web cabinet", country: "FR", lang: "fr", sector: "sante" },
  { query: "kinesitherapeute toulouse site web", country: "FR", lang: "fr", sector: "sante" },
  { query: "boutique mode paris site web ecommerce", country: "FR", lang: "fr", sector: "ecommerce" },
  { query: "salle de sport fitness paris site web tarifs", country: "FR", lang: "fr", sector: "sport" },
  // ── Suisse romande — priorité haute (marché local KAH-Digital) ──
  { query: "avocat geneve site web cabinet", country: "CH", lang: "fr", sector: "avocat" },
  { query: "architecte lausanne site web cabinet", country: "CH", lang: "fr", sector: "architecte" },
  { query: "fiduciaire geneve site web", country: "CH", lang: "fr", sector: "comptable" },
  { query: "coach lausanne site web", country: "CH", lang: "fr", sector: "coach" },
  { query: "photographe geneve mariage site web", country: "CH", lang: "fr", sector: "photographe" },
  { query: "restaurant geneve site web contact", country: "CH", lang: "fr", sector: "restaurant" },
  { query: "coiffeur lausanne site web contact", country: "CH", lang: "fr", sector: "coiffure" },
  { query: "dentiste fribourg site web cabinet", country: "CH", lang: "fr", sector: "dentiste" },
  { query: "pme vaud site web professionnel", country: "CH", lang: "fr", sector: "pme" },
  { query: "startup lausanne site web", country: "CH", lang: "fr", sector: "startup" },
  { query: "therapeute sion site web", country: "CH", lang: "fr", sector: "sante" },
  { query: "immobilier geneve agence site web", country: "CH", lang: "fr", sector: "immobilier" },
  { query: "restaurant zurich website kontakt", country: "CH", lang: "de", sector: "restaurant" },
  { query: "architekt bern website", country: "CH", lang: "de", sector: "architekt" },
  // ── Belgique ──
  { query: "avocat bruxelles site web cabinet", country: "BE", lang: "fr", sector: "avocat" },
  { query: "restaurant bruxelles site web contact", country: "BE", lang: "fr", sector: "restaurant" },
  { query: "coiffeur liege site web contact", country: "BE", lang: "fr", sector: "coiffure" },
  { query: "coach business bruxelles site web", country: "BE", lang: "fr", sector: "coach" },
  { query: "photographe bruxelles site web mariage", country: "BE", lang: "fr", sector: "photographe" },
  // ── Canada francophone ──
  { query: "restaurant montreal site web contact", country: "CA", lang: "fr", sector: "restaurant" },
  { query: "avocat montreal site web cabinet", country: "CA", lang: "fr", sector: "avocat" },
  { query: "coach affaires quebec site web", country: "CA", lang: "fr", sector: "coach" },
  { query: "photographe montreal mariage site web", country: "CA", lang: "fr", sector: "photographe" },
  // ── Maroc / Afrique francophone ──
  { query: "cabinet avocat casablanca site web", country: "MA", lang: "fr", sector: "avocat" },
  { query: "restaurant casablanca site web contact", country: "MA", lang: "fr", sector: "restaurant" },
  { query: "agence web marrakech site web", country: "MA", lang: "fr", sector: "agence" },
  { query: "salon beaute abidjan site web contact", country: "CI", lang: "fr", sector: "esthetique" },
  // ── UK / US anglophone ──
  { query: "solicitor law firm london website contact", country: "GB", lang: "en", sector: "lawyer" },
  { query: "personal trainer london website contact", country: "GB", lang: "en", sector: "fitness" },
  { query: "photographer wedding london website", country: "GB", lang: "en", sector: "photographer" },
  { query: "interior designer london website", country: "GB", lang: "en", sector: "interior" },
  { query: "restaurant london website small business contact", country: "GB", lang: "en", sector: "restaurant" },
  { query: "hair salon manchester website contact", country: "GB", lang: "en", sector: "hair salon" },
  { query: "attorney law firm new york website contact", country: "US", lang: "en", sector: "lawyer" },
  { query: "life coach business coach new york website", country: "US", lang: "en", sector: "coach" },
  { query: "restaurant miami small business website contact", country: "US", lang: "en", sector: "restaurant" },
  // ── Allemagne ──
  { query: "rechtsanwalt berlin website kanzlei", country: "DE", lang: "de", sector: "anwalt" },
  { query: "coach business münchen website", country: "DE", lang: "de", sector: "coach" },
  { query: "fotograf hochzeit hamburg website", country: "DE", lang: "de", sector: "fotograf" },
  { query: "restaurant berlin website kleinunternehmen kontakt", country: "DE", lang: "de", sector: "restaurant" },
  { query: "zahnarzt münchen website praxis", country: "DE", lang: "de", sector: "zahnarzt" },
  // ── Italie / Espagne ──
  { query: "avvocato studio legale roma sito web", country: "IT", lang: "it", sector: "avvocato" },
  { query: "ristorante roma sito web piccola impresa contatti", country: "IT", lang: "it", sector: "ristorante" },
  { query: "abogado despacho madrid web contacto", country: "ES", lang: "es", sector: "abogado" },
  { query: "coach empresarial barcelona web contacto", country: "ES", lang: "es", sector: "coach" },
  // ── Particuliers / Freelancers / Créatifs ──
  { query: "freelance graphiste portfolio site web paris", country: "FR", lang: "fr", sector: "graphiste" },
  { query: "photographe freelance portfolio site web", country: "FR", lang: "fr", sector: "photographe" },
  { query: "consultant freelance linkedin portfolio site web", country: "FR", lang: "fr", sector: "consultant" },
  { query: "musicien artiste portfolio site web contact", country: "FR", lang: "fr", sector: "artiste" },
  { query: "professeur cours particuliers site web", country: "FR", lang: "fr", sector: "education" },
  { query: "illustrateur portfolio site web freelance", country: "FR", lang: "fr", sector: "graphiste" },
  { query: "micro-entrepreneur auto-entrepreneur site web contact", country: "FR", lang: "fr", sector: "independant" },
  { query: "photographe independant portfolio site web lausanne geneve", country: "CH", lang: "fr", sector: "photographe" },
  { query: "freelance developer portfolio website contact", country: "GB", lang: "en", sector: "developer" },
  { query: "artist musician portfolio website contact", country: "GB", lang: "en", sector: "artist" },
  { query: "freelance designer portfolio website", country: "US", lang: "en", sector: "designer" },
  // ── Toulouse ──
  { query: "cabinet avocat toulouse site web contact", country: "FR", lang: "fr", sector: "avocat" },
  { query: "restaurant toulouse site web contact", country: "FR", lang: "fr", sector: "restaurant" },
  { query: "architecte toulouse site web cabinet", country: "FR", lang: "fr", sector: "architecte" },
  { query: "coach toulouse site web indépendant", country: "FR", lang: "fr", sector: "coach" },
  { query: "pme aeronautique toulouse site web", country: "FR", lang: "fr", sector: "industrie" },
  { query: "startup toulouse site web mvp", country: "FR", lang: "fr", sector: "startup" },
  // ── Nice / Côte d'Azur ──
  { query: "hotel nice cote azur site web reservation", country: "FR", lang: "fr", sector: "hotel" },
  { query: "restaurant gastronomique nice site web", country: "FR", lang: "fr", sector: "restaurant" },
  { query: "cabinet avocat nice site web", country: "FR", lang: "fr", sector: "avocat" },
  { query: "boutique luxe nice site web ecommerce", country: "FR", lang: "fr", sector: "luxe" },
  { query: "agence immobiliere nice cannes site web", country: "FR", lang: "fr", sector: "immobilier" },
  // ── Lille ──
  { query: "cabinet avocat lille site web", country: "FR", lang: "fr", sector: "avocat" },
  { query: "restaurant brasserie lille site web", country: "FR", lang: "fr", sector: "restaurant" },
  { query: "pme industrielle lille site web", country: "FR", lang: "fr", sector: "industrie" },
  { query: "startup tech lille site web", country: "FR", lang: "fr", sector: "startup" },
  { query: "artisan menuisier electricien lille site web", country: "FR", lang: "fr", sector: "artisan" },
  // ── Montpellier ──
  { query: "medecin specialiste montpellier site web cabinet", country: "FR", lang: "fr", sector: "medecin" },
  { query: "startup medtech biotech montpellier site web", country: "FR", lang: "fr", sector: "startup" },
  { query: "restaurant montpellier site web contact", country: "FR", lang: "fr", sector: "restaurant" },
  { query: "cabinet juridique montpellier site web", country: "FR", lang: "fr", sector: "avocat" },
  // ── Rennes ──
  { query: "startup tech rennes site web mvp", country: "FR", lang: "fr", sector: "startup" },
  { query: "artisan breton rennes site web", country: "FR", lang: "fr", sector: "artisan" },
  { query: "restaurant creperie rennes site web contact", country: "FR", lang: "fr", sector: "restaurant" },
  { query: "consultant rh formation rennes site web", country: "FR", lang: "fr", sector: "consultant" },
  // ── Zurich (DE) ──
  { query: "rechtsanwalt zürich website kanzlei kontakt", country: "CH", lang: "de", sector: "anwalt" },
  { query: "fintech startup zürich website", country: "CH", lang: "de", sector: "fintech" },
  { query: "architekt zürich website büro", country: "CH", lang: "de", sector: "architekt" },
  { query: "restaurant zürich website kleinunternehmen", country: "CH", lang: "de", sector: "restaurant" },
  { query: "coach zürich website personal", country: "CH", lang: "de", sector: "coach" },
  // ── Basel (DE/FR) ──
  { query: "pharma basel website unternehmen", country: "CH", lang: "de", sector: "pharma" },
  { query: "restaurant basel website kontakt", country: "CH", lang: "de", sector: "restaurant" },
  { query: "architekt basel website büro", country: "CH", lang: "de", sector: "architekt" },
  { query: "rechtsanwalt basel website", country: "CH", lang: "de", sector: "anwalt" },
  // ── Lugano (IT) ──
  { query: "avvocato lugano sito web studio legale", country: "CH", lang: "it", sector: "avvocato" },
  { query: "ristorante lugano sito web contatti", country: "CH", lang: "it", sector: "ristorante" },
  { query: "architetto lugano sito web studio", country: "CH", lang: "it", sector: "architetto" },
  { query: "wealth management lugano sito web", country: "CH", lang: "it", sector: "finance" },
  // ── Professions de santé France ──
  { query: "veterinaire cabinet site web contact", country: "FR", lang: "fr", sector: "veterinaire" },
  { query: "sage femme liberale site web contact", country: "FR", lang: "fr", sector: "sante" },
  { query: "chiropracteur site web cabinet contact", country: "FR", lang: "fr", sector: "sante" },
  { query: "ophtalmologue cabinet site web rdv", country: "FR", lang: "fr", sector: "medecin" },
  { query: "pharmacien officine site web", country: "FR", lang: "fr", sector: "pharmacie" },
  // ── Afrique francophone ──
  { query: "cabinet avocat dakar senegal site web", country: "SN", lang: "fr", sector: "avocat" },
  { query: "restaurant dakar site web contact", country: "SN", lang: "fr", sector: "restaurant" },
  { query: "agence communication douala cameroun site web", country: "CM", lang: "fr", sector: "agence" },
  { query: "pme entreprise abidjan site web professionnel", country: "CI", lang: "fr", sector: "pme" },
  { query: "entrepreneur dakar freelance portfolio site web", country: "SN", lang: "fr", sector: "independant" },
  // ── Canada anglophone ──
  { query: "restaurant toronto small business website", country: "CA", lang: "en", sector: "restaurant" },
  { query: "lawyer law firm toronto website contact", country: "CA", lang: "en", sector: "lawyer" },
  { query: "photographer vancouver website portfolio", country: "CA", lang: "en", sector: "photographer" },
  { query: "coach consultant toronto website", country: "CA", lang: "en", sector: "coach" },
  // ── Australia / NZ ──
  { query: "restaurant sydney small business website contact", country: "AU", lang: "en", sector: "restaurant" },
  { query: "solicitor law firm sydney website", country: "AU", lang: "en", sector: "lawyer" },
  { query: "personal trainer melbourne website", country: "AU", lang: "en", sector: "fitness" },
  // ── Secteurs premium France supplémentaires ──
  { query: "chirurgien esthetique paris site web cabinet", country: "FR", lang: "fr", sector: "medecin" },
  { query: "notaire paris region site web etude", country: "FR", lang: "fr", sector: "notaire" },
  { query: "huissier commissaire justice site web", country: "FR", lang: "fr", sector: "juridique" },
  { query: "geometre expert site web cabinet", country: "FR", lang: "fr", sector: "geometre" },
  { query: "formateur organisme formation site web", country: "FR", lang: "fr", sector: "formation" },
  { query: "agence evenementielle paris site web portfolio", country: "FR", lang: "fr", sector: "evenementiel" },
  { query: "courtier assurance credit site web", country: "FR", lang: "fr", sector: "finance" },
  { query: "cabinet recrutement chasseur tete site web", country: "FR", lang: "fr", sector: "recrutement" },
  // ── France — nouveaux secteurs haute valeur ──
  { query: "expert comptable paris cabinet site web", country: "FR", lang: "fr", sector: "comptable" },
  { query: "avocat droit des affaires lyon site web", country: "FR", lang: "fr", sector: "avocat" },
  { query: "medecin generaliste cabinet site web rdv en ligne", country: "FR", lang: "fr", sector: "medecin" },
  { query: "cardiologie cabinet specialiste site web", country: "FR", lang: "fr", sector: "medecin" },
  { query: "dermatologue esthetique site web cabinet rdv", country: "FR", lang: "fr", sector: "medecin" },
  { query: "studio architecture interieure paris site web", country: "FR", lang: "fr", sector: "architecte" },
  { query: "agence de voyage tour operator site web", country: "FR", lang: "fr", sector: "tourisme" },
  { query: "hotel boutique provence site web reservation", country: "FR", lang: "fr", sector: "hotel" },
  { query: "camping glamping site web reservation", country: "FR", lang: "fr", sector: "tourisme" },
  { query: "cave vigneron domaine viticole site web", country: "FR", lang: "fr", sector: "vigneron" },
  { query: "garage carrosserie auto site web contact", country: "FR", lang: "fr", sector: "auto" },
  { query: "auto-ecole site web inscription", country: "FR", lang: "fr", sector: "education" },
  { query: "ecole de danse studio site web", country: "FR", lang: "fr", sector: "education" },
  { query: "studio de yoga pilates site web cours", country: "FR", lang: "fr", sector: "sport" },
  { query: "cabinet conseil strategie pme site web", country: "FR", lang: "fr", sector: "consultant" },
  { query: "clinique veterinaire site web rdv en ligne", country: "FR", lang: "fr", sector: "veterinaire" },
  { query: "agence de communication digitale paris site web", country: "FR", lang: "fr", sector: "agence" },
  { query: "imprimerie reprographie site web devis", country: "FR", lang: "fr", sector: "imprimerie" },
  { query: "librairie independante site web contact", country: "FR", lang: "fr", sector: "commerce" },
  { query: "bijoutier joaillier site web boutique", country: "FR", lang: "fr", sector: "luxe" },
  // ── France — villes moyennes sous-prospectes ──
  { query: "avocat grenoble site web cabinet contact", country: "FR", lang: "fr", sector: "avocat" },
  { query: "restaurant gastronomique bordeaux site web", country: "FR", lang: "fr", sector: "restaurant" },
  { query: "pme btp construction site web contact", country: "FR", lang: "fr", sector: "btp" },
  { query: "cabinet kiné physiotherapeute site web rdv", country: "FR", lang: "fr", sector: "sante" },
  { query: "agence evenementielle wedding planner site web", country: "FR", lang: "fr", sector: "evenementiel" },
  { query: "consultant digital marketing freelance site web", country: "FR", lang: "fr", sector: "consultant" },
  { query: "epicerie fine delicatessen site web boutique", country: "FR", lang: "fr", sector: "commerce" },
  { query: "studio photo video corporate site web", country: "FR", lang: "fr", sector: "photographe" },
  { query: "osteopathe cabinet site web rdv en ligne", country: "FR", lang: "fr", sector: "sante" },
  { query: "podologue cabinet site web rdv", country: "FR", lang: "fr", sector: "sante" },
  // ── Suisse — secteurs premium ──
  { query: "notaire geneve lausanne site web etude", country: "CH", lang: "fr", sector: "notaire" },
  { query: "expert comptable fiduciaire lausanne site web", country: "CH", lang: "fr", sector: "comptable" },
  { query: "medecin specialiste geneve site web cabinet privé", country: "CH", lang: "fr", sector: "medecin" },
  { query: "hotel boutique valais site web reservation", country: "CH", lang: "fr", sector: "hotel" },
  { query: "cave domaine viticole vaud valais site web", country: "CH", lang: "fr", sector: "vigneron" },
  { query: "agence immobiliere prestige geneve site web", country: "CH", lang: "fr", sector: "immobilier" },
  { query: "startup fintech zurich website series", country: "CH", lang: "de", sector: "fintech" },
  { query: "arzt privatpraxis zürich website", country: "CH", lang: "de", sector: "arzt" },
  { query: "buchhalter treuhand bern website", country: "CH", lang: "de", sector: "comptable" },
  { query: "restaurant gastronomie bern website kontakt", country: "CH", lang: "de", sector: "restaurant" },
  // ── Belgique — secteurs supplémentaires ──
  { query: "expert comptable bruxelles site web", country: "BE", lang: "fr", sector: "comptable" },
  { query: "architecte bruxelles site web cabinet", country: "BE", lang: "fr", sector: "architecte" },
  { query: "startup tech bruxelles site web", country: "BE", lang: "fr", sector: "startup" },
  { query: "hotel boutique bruges site web reservation", country: "BE", lang: "fr", sector: "hotel" },
  // ── UK ──
  { query: "accountant small business london website", country: "GB", lang: "en", sector: "accountant" },
  { query: "architect studio london website portfolio", country: "GB", lang: "en", sector: "architect" },
  { query: "hotel boutique countryside uk website", country: "GB", lang: "en", sector: "hotel" },
  { query: "estate agent real estate london website", country: "GB", lang: "en", sector: "real estate" },
  { query: "yoga studio london website classes booking", country: "GB", lang: "en", sector: "fitness" },
  { query: "marketing consultant freelance london website", country: "GB", lang: "en", sector: "consultant" },
  // ── USA ──
  { query: "chiropractor clinic new york website contact", country: "US", lang: "en", sector: "chiropractor" },
  { query: "real estate agent broker miami website", country: "US", lang: "en", sector: "real estate" },
  { query: "yoga studio los angeles website classes", country: "US", lang: "en", sector: "fitness" },
  { query: "wedding planner event planner new york website", country: "US", lang: "en", sector: "events" },
  { query: "dentist dental practice chicago website", country: "US", lang: "en", sector: "dentist" },
  // ── Espagne ──
  { query: "arquitecto estudio barcelona web contacto", country: "ES", lang: "es", sector: "arquitecto" },
  { query: "restaurante hotel boutique sevilla web", country: "ES", lang: "es", sector: "hotel" },
  { query: "medico clinica privada madrid web cita", country: "ES", lang: "es", sector: "medico" },
  // ── Afrique francophone — nouveaux pays ──
  { query: "entreprise tech startup tunis site web", country: "TN", lang: "fr", sector: "startup" },
  { query: "cabinet avocat rabat maroc site web", country: "MA", lang: "fr", sector: "avocat" },
  { query: "agence communication bamako mali site web", country: "ML", lang: "fr", sector: "agence" },
  { query: "hotel lodge rwanda nairobi website", country: "RW", lang: "en", sector: "hotel" },
];

// ── Annuaires internationaux ────────────────────────────────────────────────
const DIRECTORY_SEARCHES: Array<{ url: string; country: string; language: string; sector: string }> = [
  { url: "https://www.pagesjaunes.fr/pagesblanches/recherche?quoi=dentiste&ou=nantes", country: "FR", language: "fr", sector: "dentiste" },
  { url: "https://www.pagesjaunes.fr/pagesblanches/recherche?quoi=plombier&ou=bordeaux", country: "FR", language: "fr", sector: "plomberie" },
  { url: "https://www.pagesjaunes.fr/pagesblanches/recherche?quoi=coiffeur&ou=lille", country: "FR", language: "fr", sector: "coiffure" },
  { url: "https://www.pagesjaunes.fr/pagesblanches/recherche?quoi=restaurant&ou=strasbourg", country: "FR", language: "fr", sector: "restaurant" },
  { url: "https://www.pagesjaunes.fr/pagesblanches/recherche?quoi=fleuriste&ou=montpellier", country: "FR", language: "fr", sector: "fleuriste" },
  { url: "https://www.pagesjaunes.fr/pagesblanches/recherche?quoi=electricien&ou=rennes", country: "FR", language: "fr", sector: "electricite" },
  { url: "https://www.pagesjaunes.fr/pagesblanches/recherche?quoi=garage+automobile&ou=lyon", country: "FR", language: "fr", sector: "garage" },
  { url: "https://www.pagesjaunes.fr/pagesblanches/recherche?quoi=boulangerie&ou=toulouse", country: "FR", language: "fr", sector: "boulangerie" },
  { url: "https://www.pagesjaunes.fr/pagesblanches/recherche?quoi=salon+esthetique&ou=nice", country: "FR", language: "fr", sector: "esthetique" },
  { url: "https://www.pagesjaunes.fr/pagesblanches/recherche?quoi=agence+immobiliere&ou=paris", country: "FR", language: "fr", sector: "immobilier" },
  { url: "https://www.pagesjaunes.fr/pagesblanches/recherche?quoi=menuisier&ou=grenoble", country: "FR", language: "fr", sector: "menuiserie" },
  { url: "https://www.pagesjaunes.fr/pagesblanches/recherche?quoi=opticien&ou=marseille", country: "FR", language: "fr", sector: "optique" },
  { url: "https://www.pagesjaunes.be/fr/search?what=restaurant&where=bruxelles", country: "BE", language: "fr", sector: "restaurant" },
  { url: "https://www.pagesjaunes.be/fr/search?what=coiffeur&where=liege", country: "BE", language: "fr", sector: "coiffure" },
  { url: "https://www.pagesjaunes.be/fr/search?what=plombier&where=charleroi", country: "BE", language: "fr", sector: "plomberie" },
  { url: "https://www.local.ch/fr/q/restaurant+gen%C3%A8ve", country: "CH", language: "fr", sector: "restaurant" },
  { url: "https://www.local.ch/fr/q/coiffeur+lausanne", country: "CH", language: "fr", sector: "coiffure" },
  { url: "https://www.local.ch/fr/q/dentiste+berne", country: "CH", language: "fr", sector: "dentiste" },
  { url: "https://www.yell.com/s/restaurants-london.html", country: "GB", language: "en", sector: "restaurant" },
  { url: "https://www.yell.com/s/hairdressers-manchester.html", country: "GB", language: "en", sector: "hair salon" },
  { url: "https://www.yell.com/s/plumbers-birmingham.html", country: "GB", language: "en", sector: "plumber" },
  { url: "https://www.yell.com/s/florists-london.html", country: "GB", language: "en", sector: "florist" },
  { url: "https://www.gelbeseiten.de/suche/restaurant/berlin", country: "DE", language: "de", sector: "restaurant" },
  { url: "https://www.gelbeseiten.de/suche/friseur/m%C3%BCnchen", country: "DE", language: "de", sector: "friseur" },
  { url: "https://www.gelbeseiten.de/suche/zahnarzt/hamburg", country: "DE", language: "de", sector: "zahnarzt" },
  { url: "https://www.paginegialle.it/ricerca/ristoranti/roma", country: "IT", language: "it", sector: "ristorante" },
  { url: "https://www.paginegialle.it/ricerca/parrucchieri/milano", country: "IT", language: "it", sector: "parrucchiere" },
  { url: "https://www.paginasamarillas.es/search/restaurantes/all-ma/madrid/all-di/all-ba/all-ci/all-nc/1/", country: "ES", language: "es", sector: "restaurante" },
  { url: "https://www.paginasamarillas.es/search/peluquerias/all-ma/barcelona/all-di/all-ba/all-ci/all-nc/1/", country: "ES", language: "es", sector: "peluqueria" },
  { url: "https://www.pagesjaunes.ca/search/si/1/restaurant+qu%C3%A9bec/QC/", country: "CA", language: "fr", sector: "restaurant" },
];

// ── DuckDuckGo ──────────────────────────────────────────────────────────────
const DDG_USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0",
];

function extractDdgUrls(html: string): string[] {
  const urls: string[] = [];
  for (const m of html.matchAll(/uddg=([^"&\s]+)/g)) {
    try {
      const decoded = decodeURIComponent(m[1]);
      if (decoded.startsWith("http") && !isBlacklisted(decoded)) urls.push(decoded);
    } catch { /* skip */ }
  }
  return [...new Set(urls)].slice(0, 20);
}

function extractBraveUrls(html: string): string[] {
  const urls: string[] = [];
  for (const m of html.matchAll(/href=["'](https?:\/\/[^"'&]{10,100})["']/g)) {
    if (!isBlacklisted(m[1]) && !m[1].includes("brave.com") && !m[1].includes("search.brave")) {
      urls.push(m[1]);
    }
  }
  return [...new Set(urls)].slice(0, 20);
}

async function searchDuckDuckGo(query: string): Promise<string[]> {
  const ua = DDG_USER_AGENTS[Math.floor(Math.random() * DDG_USER_AGENTS.length)];
  const endpoints = [
    { url: `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, extractor: extractDdgUrls },
    { url: `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}`, extractor: extractDdgUrls },
    { url: `https://search.brave.com/search?q=${encodeURIComponent(query)}&source=web`, extractor: extractBraveUrls },
  ];
  for (const { url, extractor } of endpoints) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 15000);
    try {
      const res = await fetch(url, {
        signal: ctrl.signal,
        headers: { "User-Agent": ua, "Accept": "text/html", "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8" },
      });
      clearTimeout(t);
      if (!res.ok) continue;
      const html = await res.text();
      const urls = extractor(html);
      if (urls.length > 0) return urls;
    } catch { clearTimeout(t); }
  }
  return [];
}

// ── Annuaires ────────────────────────────────────────────────────────────────
async function scrapeDirectory(searchUrl: string): Promise<string[]> {
  const ua = DDG_USER_AGENTS[Math.floor(Math.random() * DDG_USER_AGENTS.length)];
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(searchUrl, {
      signal: ctrl.signal,
      headers: { "User-Agent": ua, "Accept": "text/html,application/xhtml+xml", "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8" },
    });
    clearTimeout(t);
    if (!res.ok) return [];
    const html = await res.text();
    const directoryHost = new URL(searchUrl).hostname;
    const urls: string[] = [];
    for (const m of html.matchAll(/href=["'](https?:\/\/[a-zA-Z0-9][^"']{4,100})["']/g)) {
      try {
        const u = m[1];
        const h = new URL(u).hostname;
        if (!h.includes(directoryHost.replace("www.", "")) && !isBlacklisted(u)) urls.push(u);
      } catch { /* skip */ }
    }
    for (const m of html.matchAll(/(?:url|site|href)=([^"&\s]{10,150})/g)) {
      try {
        const decoded = decodeURIComponent(m[1]);
        if (decoded.startsWith("http") && !isBlacklisted(decoded)) urls.push(decoded);
      } catch { /* skip */ }
    }
    return [...new Set(urls)].slice(0, 25);
  } catch {
    clearTimeout(t);
    return [];
  }
}

// ── Email extraction ─────────────────────────────────────────────────────────
const EMAIL_BLACKLIST = [
  "sentry.io","w3.org","example.com","schema.org","google.com","facebook.com","apple.com",
  "wordpress.org","wpcf7","jquery","emailjs","sendgrid","mailchimp","sparkpost","amazonaws",
  "cloudflare","github.com","wixpress.com","squarespace.com","typekit.net","googleapis.com",
];

function extractEmailFromHtml(html: string): string | null {
  // 1. Schema.org JSON-LD (très fiable)
  const jsonLdBlocks = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) ?? [];
  for (const block of jsonLdBlocks) {
    try {
      const raw = block.replace(/<script[^>]*>/i, "").replace(/<\/script>/i, "").trim();
      const json = JSON.parse(raw) as Record<string, unknown>;
      const candidates = [
        json.email, (json.contactPoint as Record<string, unknown>)?.email,
        (json.author as Record<string, unknown>)?.email,
        ...(Array.isArray(json["@graph"]) ? (json["@graph"] as Record<string, unknown>[]).map((g) => g.email) : []),
      ];
      for (const c of candidates) {
        if (typeof c === "string" && isValidEmail(c)) return c;
      }
    } catch { /* skip */ }
  }

  // 2. Footer (emails souvent en pied de page)
  const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i)?.[0] ?? "";
  if (footerMatch) {
    const footerMailto = footerMatch.match(/mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/gi) ?? [];
    for (const m of footerMailto) {
      const email = m.replace(/^mailto:/i, "").split("?")[0].trim();
      if (isValidEmail(email)) return email;
    }
    const footerEmails = footerMatch.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g) ?? [];
    for (const e of footerEmails) { if (isValidEmail(e)) return e; }
  }

  // 3. Mailto: liens dans tout le HTML
  const mailtoMatches = html.match(/mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/gi) ?? [];
  for (const m of mailtoMatches) {
    const email = m.replace(/^mailto:/i, "").split("?")[0].trim();
    if (isValidEmail(email)) return email;
  }

  // 4. data-email obfusqué
  const dataEmailMatches = html.match(/data-email=["']([^"'@]{1,40}@[^"']{3,50})["']/gi) ?? [];
  for (const m of dataEmailMatches) {
    const email = m.replace(/^data-email=/i, "").replace(/["']/g, "").trim();
    if (isValidEmail(email)) return email;
  }

  // 5. Email [at] / (at) obfusqué anti-spam
  const atPatterns = html.match(/([a-zA-Z0-9._%+\-]{2,40})\s*[\[\(]at[\]\)]\s*([a-zA-Z0-9.\-]{2,50})\s*[\[\(]dot[\]\)]\s*([a-zA-Z]{2,6})/gi) ?? [];
  for (const m of atPatterns) {
    const clean = m.replace(/\s*[\[\(]at[\]\)]\s*/i, "@").replace(/\s*[\[\(]dot[\]\)]\s*/gi, ".").trim();
    if (isValidEmail(clean)) return clean;
  }
  const atSimple = html.match(/([a-zA-Z0-9._%+\-]{2,40})\s*[\[\(]at[\]\)]\s*([a-zA-Z0-9.\-]+\.[a-zA-Z]{2,6})/gi) ?? [];
  for (const m of atSimple) {
    const clean = m.replace(/\s*[\[\(]at[\]\)]\s*/i, "@").trim();
    if (isValidEmail(clean)) return clean;
  }

  // 6. Email en clair (dernier recours)
  const allEmails = html.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g) ?? [];
  for (const e of allEmails) {
    if (isValidEmail(e)) return e;
  }

  return null;
}

function isValidEmail(e: string): boolean {
  if (!e || e.length > 80 || !e.includes("@")) return false;
  const lower = e.toLowerCase();
  if (EMAIL_BLACKLIST.some((d) => lower.includes(d))) return false;
  if (lower.startsWith("no-reply") || lower.startsWith("noreply") || lower.startsWith("donotreply")) return false;
  const ext = lower.split(".").pop() ?? "";
  if (["png","jpg","gif","svg","css","js","webp","woff","ttf","php","html","xml"].includes(ext)) return false;
  return true;
}

// ── Phone extraction ─────────────────────────────────────────────────────────
function extractPhoneFromHtml(html: string): string | null {
  // tel: liens en priorité
  const telMatch = html.match(/href=["']tel:([\+\d\s\(\)\-\.]{7,25})["']/i);
  if (telMatch) return telMatch[1].replace(/[^\+\d]/g, "").trim();
  // Formats courants FR/CH/BE/EU
  const patterns = [
    /\+33[\s\.\-]?[1-9](?:[\s\.\-]?\d{2}){4}/,
    /0[1-9](?:[\s\.\-]?\d{2}){4}/,
    /\+41[\s\.\-]?\d{2}[\s\.\-]?\d{3}[\s\.\-]?\d{2}[\s\.\-]?\d{2}/,
    /\+32[\s\.\-]?\d[\s\.\-]?\d{3}[\s\.\-]?\d{2}[\s\.\-]?\d{2}/,
    /\+44[\s\.\-]?\d{2,4}[\s\.\-]?\d{6,8}/,
    /\+1[\s\.\-]?\(?\d{3}\)?[\s\.\-]?\d{3}[\s\.\-]?\d{4}/,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m) return m[0].replace(/[^\+\d]/g, "").trim();
  }
  return null;
}

// ── Fetch HTML ────────────────────────────────────────────────────────────────
async function fetchHtml(url: string, timeoutMs = 10000): Promise<string> {
  const urls = [url];
  if (url.startsWith("https://")) urls.push(url.replace("https://", "http://"));
  for (const u of urls) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(u, {
        signal: ctrl.signal,
        headers: { "User-Agent": "Mozilla/5.0 (compatible; KAH-Digital-Scout/1.0; +https://kah-digital.ch)" },
      });
      if (res.ok) return await res.text();
    } catch { /* try next */ } finally { clearTimeout(t); }
  }
  return "";
}

// ── MX guess email (dernier recours vérifié) ─────────────────────────────────
async function guessMxEmail(url: string): Promise<{ email: string; guessed: true } | null> {
  try {
    const domain = new URL(url).hostname.replace(/^www\./, "");
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 4000);
    const res = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`, { signal: ctrl.signal });
    clearTimeout(t);
    const data = await res.json() as { Answer?: unknown[] };
    if ((data.Answer?.length ?? 0) > 0) {
      return { email: `info@${domain}`, guessed: true };
    }
  } catch { /* skip */ }
  return null;
}

// ── Site info extraction ─────────────────────────────────────────────────────
async function extractSiteInfo(url: string): Promise<{ name: string; email: string | null; phone: string | null; emailGuessed: boolean }> {
  const html = await fetchHtml(url);
  if (!html) return { name: new URL(url).hostname.replace("www.", "").split(".")[0], email: null, phone: null, emailGuessed: false };

  const titleMatch = html.match(/<title[^>]*>([^<]{2,80})<\/title>/i);
  const name = titleMatch?.[1]
    ? titleMatch[1].trim().replace(/\s*[-|–—]\s*.*/g, "").trim().slice(0, 60)
    : new URL(url).hostname.replace("www.", "").split(".")[0];

  let email = extractEmailFromHtml(html);
  let phone = extractPhoneFromHtml(html);
  let emailGuessed = false;

  if (!email || !phone) {
    const base = new URL(url).origin;
    const contactPaths = [
      "/contact", "/nous-contacter", "/contacto", "/kontakt", "/contatti", "/contact-us",
      "/contact.html", "/contactez-nous", "/kontakte", "/contact.php",
      "/a-propos", "/about", "/about-us", "/qui-sommes-nous",
      "/equipe", "/team", "/impressum", "/mentions-legales", "/legal",
      "/chi-siamo", "/sobre-nos",
    ];
    const contactLinkMatch = html.match(/href=["']([^"']*(?:contact|kontakt|contacto|contatti|impressum)[^"']*?)["']/i);
    const extraPaths = contactLinkMatch?.[1] ? [contactLinkMatch[1]] : [];

    for (const path of [...extraPaths, ...contactPaths]) {
      if (email && phone) break;
      try {
        const contactUrl = path.startsWith("http") ? path : `${base}${path}`;
        const contactHtml = await fetchHtml(contactUrl, 7000);
        if (!email) email = extractEmailFromHtml(contactHtml);
        if (!phone) phone = extractPhoneFromHtml(contactHtml);
      } catch { /* skip */ }
    }
  }

  // Dernier recours : guess info@domain si MX records confirmés
  if (!email) {
    const guess = await guessMxEmail(url);
    if (guess) { email = guess.email; emailGuessed = true; }
  }

  return { name, email, phone, emailGuessed };
}

// ── Blacklist ────────────────────────────────────────────────────────────────
function isBlacklisted(url: string): boolean {
  const blocked = [
    "facebook.com","instagram.com","twitter.com","x.com","linkedin.com","youtube.com","tiktok.com",
    "tripadvisor","yelp.com","pagesjaunes","lafourchette","thefork","pagesjaunes.fr","pagesjaunes.be",
    "local.ch","yell.com","gelbeseiten.de","paginegialle.it","paginasamarillas.es","canada411",
    "google.com","apple.com","amazon.","wikipedia","bing.com","yahoo.com",
    "booking.com","leboncoin","airbnb","uber","deliveroo","ubereats",
    "doctolib","wix.com/site","squarespace.com","wordpress.com","shopify.com",
    ".gov",".gouv","mairie-","prefecture","lebonbon.fr","lefigaro","lemonde","leparisien",
    "chu-","chru-","chu.","aphp.fr","hopital","hospital","clinique-publique","sante.gouv",
    "selfcity.fr","depanneo.com","lesbonsartisans.fr","habitatpresto.com","houzz.com",
    "pages24.fr","annuaire-des-professionnels.fr","kompass.com","europages","societe.com",
    "foursquare.com","zomato.com","opentable.com","just-eat","grubhub","doordash",
    "trustpilot","avis-verifies","google.fr","maps.google",
  ];
  return blocked.some((b) => url.toLowerCase().includes(b));
}

// ── Build leads from URLs ────────────────────────────────────────────────────
async function buildLeadsFromUrls(
  urls: string[],
  meta: { country: string; language: string; sector: string },
  count: number
): Promise<DiscoveredLead[]> {
  const leads: DiscoveredLead[] = [];
  for (const url of urls) {
    if (leads.length >= count) break;
    try {
      const hostname = new URL(url).hostname;
      const { name: businessName, email, phone, emailGuessed } = await extractSiteInfo(url);
      leads.push({
        businessName,
        website: url,
        address: meta.country,
        country: meta.country,
        language: meta.language,
        sector: meta.sector,
        placeId: `${hostname}-${Date.now()}`,
        email,
        phone,
        emailGuessed,
      });
      await new Promise((r) => setTimeout(r, 400));
    } catch { /* skip */ }
  }
  return leads;
}

// ── Fallback statique ────────────────────────────────────────────────────────
const STATIC_FALLBACKS: Array<{ businessName: string; website: string; country: string; language: string; sector: string }> = [
  { businessName: "Plomberie Girard Lyon", website: "https://www.plomberie-girard-lyon.fr", country: "FR", language: "fr", sector: "plomberie" },
  { businessName: "Coiffure Atelier Paris", website: "https://www.coiffure-atelier-paris.fr", country: "FR", language: "fr", sector: "coiffure" },
  { businessName: "Boulangerie Artisan Bordeaux", website: "https://www.boulangerie-artisan-bordeaux.fr", country: "FR", language: "fr", sector: "boulangerie" },
  { businessName: "Cabinet Dentaire Dupont", website: "https://www.cabinet-dentaire-dupont.fr", country: "FR", language: "fr", sector: "dentiste" },
  { businessName: "Restaurant Le Moulin", website: "https://www.restaurant-lemoulin.fr", country: "FR", language: "fr", sector: "restaurant" },
  { businessName: "Fleuriste Au Jardin Vert", website: "https://www.fleuriste-jardinvert.fr", country: "FR", language: "fr", sector: "fleuriste" },
  { businessName: "Institut Beauté Nantes", website: "https://www.institut-beaute-nantes.fr", country: "FR", language: "fr", sector: "esthetique" },
  { businessName: "Menuiserie Leblanc Rennes", website: "https://www.menuiserie-leblanc-rennes.fr", country: "FR", language: "fr", sector: "menuiserie" },
  { businessName: "Auto École Horizon Toulouse", website: "https://www.autoecole-horizon-toulouse.fr", country: "FR", language: "fr", sector: "auto-ecole" },
  { businessName: "Brasserie du Sablon Bruxelles", website: "https://www.brasserie-sablon.be", country: "BE", language: "fr", sector: "restaurant" },
  { businessName: "Salon Coiffure Liège", website: "https://www.salon-coiffure-liege.be", country: "BE", language: "fr", sector: "coiffure" },
  { businessName: "Restaurant du Lac Genève", website: "https://www.restaurant-dulac-geneve.ch", country: "CH", language: "fr", sector: "restaurant" },
  { businessName: "Horlogerie Dubois Lausanne", website: "https://www.horlogerie-dubois.ch", country: "CH", language: "fr", sector: "horlogerie" },
  { businessName: "The Cosy Bistro London", website: "https://www.cosybistro-london.co.uk", country: "GB", language: "en", sector: "restaurant" },
  { businessName: "Hair Studio Manchester", website: "https://www.hairstudio-manchester.co.uk", country: "GB", language: "en", sector: "hair salon" },
  { businessName: "Restaurante Casa Pepe Madrid", website: "https://www.restaurante-casapepe.es", country: "ES", language: "es", sector: "restaurante" },
  { businessName: "Friseur Stil Berlin", website: "https://www.friseur-stil-berlin.de", country: "DE", language: "de", sector: "friseur" },
  { businessName: "Ristorante Bella Roma", website: "https://www.ristorante-bellaroma.it", country: "IT", language: "it", sector: "ristorante" },
  { businessName: "Resto Québécois Montréal", website: "https://www.resto-quebecois-montreal.ca", country: "CA", language: "fr", sector: "restaurant" },
];

function getStaticFallback(count: number): DiscoveredLead[] {
  const shuffled = [...STATIC_FALLBACKS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((f, i) => ({
    businessName: f.businessName,
    website: f.website,
    address: f.country,
    country: f.country,
    language: f.language,
    sector: f.sector,
    placeId: `static-${i}-${Date.now()}`,
    email: null,
    phone: null,
  }));
}

// ── Point d'entrée ───────────────────────────────────────────────────────────
export async function discoverLeads(count = 5): Promise<DiscoveredLead[]> {
  // Sélectionne 2 targets aléatoires depuis des parties différentes du tableau
  const shuffled = [...TARGETS].sort(() => Math.random() - 0.5);
  const target1 = shuffled[0];
  const target2 = shuffled[Math.floor(TARGETS.length / 2) % shuffled.length];

  // Lance les 2 recherches DDG séquentiellement (évite le rate-limit)
  console.log(`[lead-discovery] DDG target 1: "${target1.query}"`);
  let urls1 = await searchDuckDuckGo(target1.query);

  // Si target1 échoue, essaie target2 en premier
  if (urls1.length < 3) {
    console.log(`[lead-discovery] DDG target 2: "${target2.query}"`);
    const urls2 = await searchDuckDuckGo(target2.query);
    const combined = [...new Set([...urls1, ...urls2])];
    if (combined.length > 0) {
      const leads = await buildLeadsFromUrls(
        combined,
        { country: target1.country, language: target1.lang, sector: target1.sector },
        count
      );
      if (leads.length > 0) {
        console.log(`[lead-discovery] DDG dual: ${leads.length} leads`);
        return leads;
      }
    }
  } else {
    // target1 a réussi, on peut ajouter target2 pour enrichir
    console.log(`[lead-discovery] DDG target 2 bonus: "${target2.query}"`);
    const urls2 = await searchDuckDuckGo(target2.query);
    urls1 = [...new Set([...urls1, ...urls2])];
    const leads = await buildLeadsFromUrls(
      urls1,
      { country: target1.country, language: target1.lang, sector: target1.sector },
      count
    );
    if (leads.length > 0) {
      console.log(`[lead-discovery] DDG: ${leads.length} leads via dual target`);
      return leads;
    }
  }

  // Annuaire international si DDG insuffisant
  const dirTarget = DIRECTORY_SEARCHES[Math.floor(Math.random() * DIRECTORY_SEARCHES.length)];
  console.log(`[lead-discovery] Annuaire: ${dirTarget.url}`);
  const dirUrls = await scrapeDirectory(dirTarget.url);
  if (dirUrls.length > 0) {
    const leads = await buildLeadsFromUrls(dirUrls, dirTarget, count);
    if (leads.length > 0) {
      console.log(`[lead-discovery] Annuaire: ${leads.length} leads`);
      return leads;
    }
  }

  // Fallback statique
  console.warn("[lead-discovery] Fallback statique");
  return getStaticFallback(count);
}
