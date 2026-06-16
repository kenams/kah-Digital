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
  // ── Suisse romande — priorité haute (marché local KAH Digital) ──
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
  // ── Freelancers / Créatifs FR/CH ──
  { query: "freelance graphiste portfolio site web paris", country: "FR", lang: "fr", sector: "graphiste" },
  { query: "photographe freelance portfolio site web", country: "FR", lang: "fr", sector: "photographe" },
  { query: "consultant freelance linkedin portfolio site web", country: "FR", lang: "fr", sector: "consultant" },
  { query: "micro-entrepreneur auto-entrepreneur site web contact", country: "FR", lang: "fr", sector: "independant" },
  { query: "photographe independant portfolio site web lausanne geneve", country: "CH", lang: "fr", sector: "photographe" },
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
  // ── Suisse — expansion CH ──
  { query: "architecte interior design lausanne site web portfolio", country: "CH", lang: "fr", sector: "architecte" },
  { query: "coach executive geneve lausanne site web", country: "CH", lang: "fr", sector: "coach" },
  { query: "clinique esthetique geneve site web rdv", country: "CH", lang: "fr", sector: "medecin" },
  { query: "cabinet avocat lausanne site web contact", country: "CH", lang: "fr", sector: "avocat" },
  { query: "psychologue therapeute lausanne geneve site web", country: "CH", lang: "fr", sector: "sante" },
  { query: "freelance consultant informatique lausanne site web", country: "CH", lang: "fr", sector: "tech" },
  { query: "startup saas lausanne epfl site web", country: "CH", lang: "fr", sector: "startup" },
  { query: "horlogerie bijouterie geneve lausanne site web boutique", country: "CH", lang: "fr", sector: "luxe" },
  { query: "traiteur événementiel geneve site web", country: "CH", lang: "fr", sector: "restauration" },
  { query: "photographe corporate lausanne geneve site web", country: "CH", lang: "fr", sector: "photographe" },
  { query: "studio design graphique lausanne site web", country: "CH", lang: "fr", sector: "design" },
  { query: "agence communication digitale lausanne site web", country: "CH", lang: "fr", sector: "agence" },
  { query: "osteopathe kinesitherapeute lausanne site web rdv", country: "CH", lang: "fr", sector: "sante" },
  { query: "dentiste cabinet dentaire lausanne geneve site web", country: "CH", lang: "fr", sector: "dentiste" },
  { query: "ingenieur conseil independent lausanne site web", country: "CH", lang: "fr", sector: "ingenieur" },
  { query: "anwalt rechtsanwalt zürich website büro", country: "CH", lang: "de", sector: "avocat" },
  { query: "immobilien makler zürich bern website", country: "CH", lang: "de", sector: "immobilier" },
  { query: "zahnarzt praxis zürich basel website", country: "CH", lang: "de", sector: "dentiste" },
  { query: "personal trainer fitness zürich website", country: "CH", lang: "de", sector: "sport" },
  { query: "startup tech zürich website series A", country: "CH", lang: "de", sector: "startup" },
  { query: "coach business zürich bern website", country: "CH", lang: "de", sector: "coach" },
  { query: "agenzia web lugano sito internet azienda", country: "CH", lang: "it", sector: "agence" },
  { query: "studio legale lugano bellinzona sito web", country: "CH", lang: "it", sector: "avocat" },
  { query: "commercialista fiduciario lugano sito web", country: "CH", lang: "it", sector: "comptable" },
  { query: "hotel ristorante lugano lago maggiore sito web", country: "CH", lang: "it", sector: "hotel" },
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
  // ── UAE / Dubai — priorité haute (marché premium) ──
  { query: "law firm dubai website contact uae", country: "AE", lang: "en", sector: "lawyer" },
  { query: "real estate agency dubai website property", country: "AE", lang: "en", sector: "real estate" },
  { query: "business consultant dubai website services", country: "AE", lang: "en", sector: "consultant" },
  { query: "restaurant dubai website fine dining contact", country: "AE", lang: "en", sector: "restaurant" },
  { query: "interior designer dubai website portfolio", country: "AE", lang: "en", sector: "interior" },
  { query: "marketing agency dubai website services", country: "AE", lang: "en", sector: "marketing" },
  { query: "accountant accounting firm dubai website", country: "AE", lang: "en", sector: "accountant" },
  { query: "beauty salon spa dubai website booking", country: "AE", lang: "en", sector: "beauty" },
  { query: "fitness gym personal trainer dubai website", country: "AE", lang: "en", sector: "fitness" },
  { query: "startup tech company abu dhabi website", country: "AE", lang: "en", sector: "startup" },
  { query: "hotel boutique resort dubai website", country: "AE", lang: "en", sector: "hotel" },
  { query: "photography studio dubai website portfolio", country: "AE", lang: "en", sector: "photographer" },
  { query: "event management company dubai website", country: "AE", lang: "en", sector: "events" },
  { query: "clinic private doctor dubai website appointment", country: "AE", lang: "en", sector: "medecin" },
  { query: "architect design studio dubai website", country: "AE", lang: "en", sector: "architect" },
  // ── Singapore / Asie-Pacifique ──
  { query: "law firm singapore website contact", country: "SG", lang: "en", sector: "lawyer" },
  { query: "business consultant singapore website", country: "SG", lang: "en", sector: "consultant" },
  { query: "marketing agency singapore website services", country: "SG", lang: "en", sector: "marketing" },
  { query: "restaurant singapore small business website", country: "SG", lang: "en", sector: "restaurant" },
  { query: "startup tech singapore website", country: "SG", lang: "en", sector: "startup" },
  { query: "accountant accounting firm singapore website", country: "SG", lang: "en", sector: "accountant" },
  { query: "interior designer singapore website portfolio", country: "SG", lang: "en", sector: "interior" },
  { query: "real estate agency singapore website", country: "SG", lang: "en", sector: "real estate" },
  { query: "personal trainer fitness studio singapore website", country: "SG", lang: "en", sector: "fitness" },
  { query: "clinic doctor singapore website appointment", country: "SG", lang: "en", sector: "medecin" },
  // ── Australie — expansion ──
  { query: "accountant small business melbourne website", country: "AU", lang: "en", sector: "accountant" },
  { query: "interior designer brisbane website portfolio", country: "AU", lang: "en", sector: "interior" },
  { query: "marketing agency perth website", country: "AU", lang: "en", sector: "marketing" },
  { query: "real estate agent gold coast website", country: "AU", lang: "en", sector: "real estate" },
  { query: "dentist dental clinic brisbane website", country: "AU", lang: "en", sector: "dentist" },
  { query: "startup tech melbourne sydney website", country: "AU", lang: "en", sector: "startup" },
  { query: "yoga pilates studio sydney website", country: "AU", lang: "en", sector: "fitness" },
  { query: "event planner wedding sydney website", country: "AU", lang: "en", sector: "events" },

  // ── GRANDES ENTREPRISES OBSOLÈTES — budget élevé, site vieillissant ──────────
  // Hôtels de chaîne / boutique avec vieux sites
  { query: "hotel chain boutique old website no mobile contact", country: "AE", lang: "en", sector: "hotel" },
  { query: "hotel 4 stars france vieux site web reservation obsolete", country: "FR", lang: "fr", sector: "hotel" },
  { query: "chaîne hôtelière indépendante site web demodé contact", country: "FR", lang: "fr", sector: "hotel" },
  { query: "hotel palace suisse vieux site internet reservation", country: "CH", lang: "fr", sector: "hotel" },
  { query: "resort luxury old website redesign contact", country: "AE", lang: "en", sector: "hotel" },
  { query: "hotel gruppe schweiz website veraltet kontakt", country: "CH", lang: "de", sector: "hotel" },
  // Cabinets d'avocats / notaires / huissiers — grands cabinets avec vieux sites
  { query: "cabinet avocats associés paris site web vieillissant", country: "FR", lang: "fr", sector: "avocat" },
  { query: "étude notariale paris ile de france site web contact", country: "FR", lang: "fr", sector: "notaire" },
  { query: "law firm established 1990 website contact london", country: "GB", lang: "en", sector: "lawyer" },
  { query: "despacho abogados madrid establecido site web contacto", country: "ES", lang: "es", sector: "abogado" },
  { query: "anwaltskanzlei münchen hamburg website kontakt", country: "DE", lang: "de", sector: "anwalt" },
  { query: "großes notariat rechtsanwalt wien website kontakt", country: "AT", lang: "de", sector: "anwalt" },
  // Agences événementielles / lieux de réception — secteur avec gros budgets
  { query: "event management company established UAE website contact", country: "AE", lang: "en", sector: "events" },
  { query: "lieu de réception événementiel château site web contact", country: "FR", lang: "fr", sector: "evenementiel" },
  { query: "salle réception mariage domaine site web vieux contact", country: "FR", lang: "fr", sector: "evenementiel" },
  { query: "event venue conference center old website contact", country: "GB", lang: "en", sector: "events" },
  { query: "convention center event space website dated", country: "US", lang: "en", sector: "events" },
  // Cabinets d'architecture — grands bureaux avec sites dépassés
  { query: "bureau architecture urbanisme paris etabli site web contact", country: "FR", lang: "fr", sector: "architecte" },
  { query: "architecture firm established 20 years website old contact", country: "GB", lang: "en", sector: "architect" },
  { query: "arquitectos estudio grande madrid barcelona web contacto", country: "ES", lang: "es", sector: "arquitecto" },
  { query: "architektur büro zürich bern wien website kontakt", country: "CH", lang: "de", sector: "architekt" },
  // Industries / BTP / Construction — PME avec gros CA, sites catastrophiques
  { query: "entreprise btp construction 50 salariés site web contact", country: "FR", lang: "fr", sector: "btp" },
  { query: "entreprise travaux publics industrielle site web vieux", country: "FR", lang: "fr", sector: "industrie" },
  { query: "construction company established website contact uk", country: "GB", lang: "en", sector: "construction" },
  { query: "manufacturing company old website contact email", country: "DE", lang: "de", sector: "industrie" },
  // Cliniques / cabinets médicaux privés multi-praticiens
  { query: "clinique privée soins esthétiques paris site web contact", country: "FR", lang: "fr", sector: "clinique" },
  { query: "centre médical pluridisciplinaire site web vieux rdv", country: "FR", lang: "fr", sector: "medecin" },
  { query: "private medical clinic old website contact", country: "AE", lang: "en", sector: "medecin" },
  { query: "klinik privatpraxis website veraltet kontakt", country: "DE", lang: "de", sector: "klinik" },
  // Immobilier de prestige — agents / promoteurs avec vieux sites
  { query: "agence immobilière prestige luxe paris site web contact", country: "FR", lang: "fr", sector: "immobilier" },
  { query: "promoteur immobilier luxe programme neuf site web", country: "FR", lang: "fr", sector: "immobilier" },
  { query: "luxury real estate agency old website contact dubai", country: "AE", lang: "en", sector: "real estate" },
  { query: "luxury real estate broker established london website", country: "GB", lang: "en", sector: "real estate" },
  // Restaurants gastronomiques / groupes de restauration
  { query: "groupe restauration plusieurs établissements site web contact", country: "FR", lang: "fr", sector: "restaurant" },
  { query: "restaurant gastronomique étoilé vieux site web", country: "FR", lang: "fr", sector: "restaurant" },
  { query: "fine dining restaurant established website old contact", country: "AE", lang: "en", sector: "restaurant" },
  { query: "restaurant chain group old website contact email", country: "GB", lang: "en", sector: "restaurant" },

  // ── France — villes non encore ciblées ────────────────────────────────────
  { query: "cabinet avocat reims site web contact", country: "FR", lang: "fr", sector: "avocat" },
  { query: "restaurant gastronomique rouen site web contact", country: "FR", lang: "fr", sector: "restaurant" },
  { query: "architecte dijon site web cabinet", country: "FR", lang: "fr", sector: "architecte" },
  { query: "medecin specialiste angers site web rdv", country: "FR", lang: "fr", sector: "medecin" },
  { query: "coach business tours site web indépendant", country: "FR", lang: "fr", sector: "coach" },
  { query: "avocat droit social amiens site web cabinet", country: "FR", lang: "fr", sector: "avocat" },
  { query: "restaurant brasserie nimes site web contact", country: "FR", lang: "fr", sector: "restaurant" },
  { query: "pme industrie perpignan site web contact", country: "FR", lang: "fr", sector: "industrie" },
  { query: "notaire brest finistere site web etude", country: "FR", lang: "fr", sector: "notaire" },
  { query: "cabinet kinesitherapeute caen site web rdv", country: "FR", lang: "fr", sector: "sante" },
  { query: "salon coiffure coloriste pau site web", country: "FR", lang: "fr", sector: "coiffure" },
  { query: "expert comptable clermont site web cabinet", country: "FR", lang: "fr", sector: "comptable" },
  { query: "restaurant brasserie metz site web contact", country: "FR", lang: "fr", sector: "restaurant" },
  { query: "agence immobiliere saint etienne site web", country: "FR", lang: "fr", sector: "immobilier" },
  { query: "osteopathe reims site web rdv en ligne", country: "FR", lang: "fr", sector: "sante" },
  { query: "startup tech nantes site web mvp", country: "FR", lang: "fr", sector: "startup" },
  { query: "cabinet psychologue bordeaux site web consultation", country: "FR", lang: "fr", sector: "sante" },
  { query: "traiteur mariage rouen site web contact", country: "FR", lang: "fr", sector: "evenementiel" },
  { query: "spa bien etre massage strasbourg site web reservation", country: "FR", lang: "fr", sector: "bien-etre" },
  { query: "agence recrutement rh tours site web", country: "FR", lang: "fr", sector: "recrutement" },

  // ── Nouveaux secteurs France ──────────────────────────────────────────────
  { query: "maison de retraite ehpad site web contact", country: "FR", lang: "fr", sector: "sante" },
  { query: "ecole privee college lycee site web contact", country: "FR", lang: "fr", sector: "education" },
  { query: "cabinet expertise comptable region site web", country: "FR", lang: "fr", sector: "comptable" },
  { query: "clinique chirurgicale privee site web prise rdv", country: "FR", lang: "fr", sector: "clinique" },
  { query: "agence de publicite media site web paris", country: "FR", lang: "fr", sector: "agence" },
  { query: "transporteur logistique pme site web contact", country: "FR", lang: "fr", sector: "logistique" },
  { query: "consultant indépendant management site web", country: "FR", lang: "fr", sector: "consultant" },
  { query: "cabinet architecture paysagere site web", country: "FR", lang: "fr", sector: "architecte" },
  { query: "grossiste fournisseur b2b site web contact", country: "FR", lang: "fr", sector: "commerce" },
  { query: "centre reeducation kine sport site web contact", country: "FR", lang: "fr", sector: "sante" },

  // ── Portugal / Brésil ─────────────────────────────────────────────────────
  { query: "advogado escritório lisboa site web contacto", country: "PT", lang: "pt", sector: "avocat" },
  { query: "restaurante boutique porto website contacto", country: "PT", lang: "pt", sector: "restaurant" },
  { query: "arquitecto estudio lisboa website portfolio", country: "PT", lang: "pt", sector: "architecte" },
  { query: "médico clínica privada lisboa website marcação", country: "PT", lang: "pt", sector: "medecin" },
  { query: "coach empresarial portugal website", country: "PT", lang: "pt", sector: "coach" },
  { query: "advogado escritório são paulo site web contato", country: "BR", lang: "pt", sector: "avocat" },
  { query: "restaurante boutique rio de janeiro site web", country: "BR", lang: "pt", sector: "restaurant" },
  { query: "arquiteto studio design são paulo site web", country: "BR", lang: "pt", sector: "architecte" },
  { query: "clinica medica estetica brasilia site web contato", country: "BR", lang: "pt", sector: "medecin" },
  { query: "startup tech fintech brasil website contato", country: "BR", lang: "pt", sector: "startup" },

  // ── Italie ────────────────────────────────────────────────────────────────
  { query: "avvocato studio legale milano sito web contatti", country: "IT", lang: "it", sector: "avocat" },
  { query: "ristorante boutique firenze sito web prenotazioni", country: "IT", lang: "it", sector: "restaurant" },
  { query: "architetto studio roma sito web portfolio", country: "IT", lang: "it", sector: "architecte" },
  { query: "medico clinica privata torino sito web appuntamento", country: "IT", lang: "it", sector: "medecin" },
  { query: "commercialista studio contabile napoli sito web", country: "IT", lang: "it", sector: "comptable" },
  { query: "hotel boutique toscana sito web prenotazione", country: "IT", lang: "it", sector: "hotel" },
  { query: "agenzia immobiliare lusso venezia sito web", country: "IT", lang: "it", sector: "immobilier" },

  // ── Allemagne / Autriche ──────────────────────────────────────────────────
  { query: "anwalt rechtsanwalt köln düsseldorf website", country: "DE", lang: "de", sector: "avocat" },
  { query: "architekt studio stuttgart website portfolio", country: "DE", lang: "de", sector: "architecte" },
  { query: "unternehmensberater consultant frankfurt website", country: "DE", lang: "de", sector: "consultant" },
  { query: "zahnarzt praxis berlin website termin", country: "DE", lang: "de", sector: "dentiste" },
  { query: "boutique hotel schwarzwald website buchung", country: "DE", lang: "de", sector: "hotel" },
  { query: "steuerberater kanzlei münchen website", country: "DE", lang: "de", sector: "comptable" },
  { query: "rechtsanwalt wien graz website kanzlei kontakt", country: "AT", lang: "de", sector: "avocat" },
  { query: "unternehmensberatung wien website kontakt", country: "AT", lang: "de", sector: "consultant" },

  // ── France — requêtes formulées différemment (résultats DDG différents) ──
  { query: "site web médecin généraliste cabinet france contact", country: "FR", lang: "fr", sector: "medecin" },
  { query: "site professionnel artisan france devis en ligne", country: "FR", lang: "fr", sector: "artisan" },
  { query: "site web PME france B2B contact formulaire", country: "FR", lang: "fr", sector: "pme" },
  { query: "freelance développeur web france portfolio contact", country: "FR", lang: "fr", sector: "tech" },
  { query: "agence marketing digital france site web client", country: "FR", lang: "fr", sector: "agence" },
  { query: "cabinet conseil formation entreprise france site web", country: "FR", lang: "fr", sector: "formation" },
  { query: "thérapeute sophrologue hypnothérapeute france site web", country: "FR", lang: "fr", sector: "sante" },
  { query: "décorateur home stager france site web portfolio", country: "FR", lang: "fr", sector: "deco" },
  { query: "courtier en prêt immobilier france site web contact", country: "FR", lang: "fr", sector: "finance" },
  { query: "agence relations presse france site web contact", country: "FR", lang: "fr", sector: "agence" },
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

async function searchDuckDuckGo(query: string, offset = 0): Promise<string[]> {
  const ua = DDG_USER_AGENTS[Math.floor(Math.random() * DDG_USER_AGENTS.length)];
  const endpoints = [
    { url: `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}&s=${offset}`, extractor: extractDdgUrls },
    { url: `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}&s=${offset}`, extractor: extractDdgUrls },
    { url: `https://search.brave.com/search?q=${encodeURIComponent(query)}&source=web&offset=${offset}`, extractor: extractBraveUrls },
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
    // Réseaux sociaux
    "facebook.com","instagram.com","twitter.com","x.com","linkedin.com","youtube.com","tiktok.com","pinterest.com","snapchat.com",
    // Annuaires / agrégateurs
    "tripadvisor","yelp.com","pagesjaunes","lafourchette","thefork","pagesjaunes.fr","pagesjaunes.be",
    "local.ch","yell.com","gelbeseiten.de","paginegialle.it","paginasamarillas.es","canada411",
    "pages24.fr","annuaire-des-professionnels.fr","kompass.com","europages","societe.com",
    "foursquare.com","zomato.com","opentable.com","just-eat","grubhub","doordash",
    "superprof.","lessonup.","preply.com","italki.com","coursera.","udemy.","skillshare.",
    "malt.fr","malt.com","upwork.com","freelancer.com","fiverr.com","guru.com",
    "indeed.com","linkedin.com","monster.com","pole-emploi","offredemploi","welcometothejungle",
    "leboncoin","lacentraledesparticuliers","logic-immo","seloger","pap.fr","orpi.","century21.",
    "laforet.","stephalex.","guy-hoquet.","era-immobilier",
    // Moteurs de recherche / grands sites
    "google.com","google.fr","apple.com","amazon.","wikipedia","bing.com","yahoo.com","baidu.com","duckduckgo.com",
    // Voyage / hébergement / agrégateurs
    "booking.com","airbnb","uber","deliveroo","ubereats","tripadvisor","expedia","hotels.com","kayak.",
    "lastminute.com","travelweekly.com","guestreservations.com","agoda.com","trivago.","laterooms.","venere.",
    "mariages.net","zankyou.","thebash.com","helloasso.","eventbrite.",
    // Santé publique / admin
    "doctolib","clinique-publique","sante.gouv","hopital","hospital","aphp.fr","chu-","chru-","chu.",
    ".gov",".gouv","mairie-","prefecture","conseil-departemental","region.",
    // Sites CMS / plateformes
    "wix.com/site","squarespace.com","wordpress.com","shopify.com","webflow.io","strikingly.com",
    // Médias / presse
    "lefigaro","lemonde","leparisien","liberation.fr","lexpress.fr","lepoint.fr","huffingtonpost","bfmtv","20minutes","ouest-france",
    // Avis / notation
    "trustpilot","avis-verifies","google.fr","maps.google","notretemps.com","societe.ninja",
    // Artisans plateformes
    "selfcity.fr","depanneo.com","lesbonsartisans.fr","habitatpresto.com","houzz.com",
    // Registres / bases légales
    "gleif.org","infogreffe.fr","bodacc.fr","societe.com","pappers.fr","manageo.fr","verif.com",
    // Presse spécialisée / portails ville / guides
    "lebonbon.fr","sortiraparis.","lyoncapitale.fr","bordeaux-metropole","toulouse.fr",
    "timeout.com","thrillist.com","eater.com","infobel.","192.com","companieshouse.",
    "cuatrecasas.","linklaters.","cliffordchance.","freshfields.","deloitte.","pwc.com","kpmg.","ey.com",
    // Autres
    "cloudflare.com","sentry.io","jsdelivr.net","cdnjs.cloudflare","jsdelivr.com",
  ];

  const lower = url.toLowerCase();
  if (blocked.some((b) => lower.includes(b))) return true;

  // Filtre chemins d'agrégateurs : URL contenant des segments typiques de pages catégorie
  try {
    const path = new URL(url).pathname.toLowerCase();
    const badPathSegments = [
      "/lessons/","/search/","/record/","/annonce/","/offre-","/recherche/","/trouver-",
      "/liste-","/category/","/categories/","/tag/","/tags/","/page/","/results/",
      "/annuaire/","/directory/","/profils/","/profiles/","/members/","/membres/",
      "/jobs/","/emploi/","/recrutement/","/offres-emploi/",
    ];
    if (badPathSegments.some((seg) => path.includes(seg))) return true;

    // URL qui est une page "opticien à clermont" ou "/aeronautique-toulouse" → chemin sans sens pour un site business
    if (/\/[a-z-]+-[a-z-]+(\/|$)/.test(path) && path.split("/").length > 3) {
      const lastSegment = path.split("/").filter(Boolean).pop() ?? "";
      if (lastSegment.length > 30) return true; // chemin trop long = page SEO d'annuaire
    }
  } catch { /* skip */ }

  return false;
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
      // On ne retient que les leads avec un email (réel ou deviné) pour éviter le backlog mort
      if (!email) continue;
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
  return shuffled.slice(0, count).map((f, i) => {
    // Deviner info@domain pour le fallback statique (toujours envoyable)
    const domain = new URL(f.website).hostname.replace(/^www\./, "");
    return {
      businessName: f.businessName,
      website: f.website,
      address: f.country,
      country: f.country,
      language: f.language,
      sector: f.sector,
      placeId: `static-${i}-${Date.now()}`,
      email: `info@${domain}`,
      emailGuessed: true,
      phone: null,
    };
  });
}

// ── Point d'entrée ───────────────────────────────────────────────────────────
const DDG_OFFSETS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

export async function discoverLeads(count = 5): Promise<DiscoveredLead[]> {
  const MIN_DDG_LEADS = Math.max(3, Math.ceil(count / 5)); // seuil minimum avant de tenter les fallbacks

  // Sélection pondérée : 4 slots CH garantis + 8 slots aléatoires (CH = 25.5% click rate)
  const chTargets = TARGETS.filter(t => t.country === "CH").sort(() => Math.random() - 0.5).slice(0, 4);
  const otherTargets = TARGETS.filter(t => t.country !== "CH").sort(() => Math.random() - 0.5).slice(0, 8);
  const selected = [...chTargets, ...otherTargets].sort(() => Math.random() - 0.5);

  // Map url → meta pour préserver le bon pays/secteur par URL
  const urlMetaMap = new Map<string, { country: string; language: string; sector: string }>();

  for (const target of selected) {
    const offset = DDG_OFFSETS[Math.floor(Math.random() * DDG_OFFSETS.length)];
    console.log(`[lead-discovery] DDG: "${target.query}" offset=${offset}`);
    const urls = await searchDuckDuckGo(target.query, offset);
    for (const url of urls) {
      if (!urlMetaMap.has(url)) {
        urlMetaMap.set(url, { country: target.country, language: target.lang, sector: target.sector });
      }
    }
    if (urlMetaMap.size >= count * 5) break;
  }

  const ddgLeads: DiscoveredLead[] = [];
  if (urlMetaMap.size > 0) {
    for (const [url, meta] of urlMetaMap) {
      if (ddgLeads.length >= count) break;
      try {
        const hostname = new URL(url).hostname;
        const { name: businessName, email, phone, emailGuessed } = await extractSiteInfo(url);
        if (!email) continue;
        ddgLeads.push({
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
  }

  // DDG a retourné assez → on s'arrête là
  if (ddgLeads.length >= MIN_DDG_LEADS) {
    console.log(`[lead-discovery] DDG: ${ddgLeads.length} leads via ${selected.length} targets`);
    return ddgLeads;
  }

  // DDG insuffisant (throttling Vercel) → compléter avec l'annuaire
  console.warn(`[lead-discovery] DDG insuffisant (${ddgLeads.length}/${MIN_DDG_LEADS}) — tentative annuaire`);
  const remaining = count - ddgLeads.length;
  const dirTarget = DIRECTORY_SEARCHES[Math.floor(Math.random() * DIRECTORY_SEARCHES.length)];
  console.log(`[lead-discovery] Annuaire: ${dirTarget.url}`);
  const dirUrls = await scrapeDirectory(dirTarget.url);
  if (dirUrls.length > 0) {
    const dirLeads = await buildLeadsFromUrls(dirUrls, dirTarget, remaining);
    if (dirLeads.length > 0) {
      const combined = [...ddgLeads, ...dirLeads];
      console.log(`[lead-discovery] Combiné DDG+Annuaire: ${combined.length} leads`);
      return combined;
    }
  }

  // Fallback statique si tout échoue
  if (ddgLeads.length > 0) return ddgLeads;
  console.warn("[lead-discovery] Fallback statique");
  return getStaticFallback(count);
}
