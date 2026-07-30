export interface CompanyConfig {
  legalName: string;
  brandName: string;
  registrationStatus: string;
  currency: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  siren: string;
  apeCode: string;
  vatNumber: string;
  hosting: string;
  iban: string;
  quotePrefix: string;
  invoicePrefix: string;
  uid?: string;
  vat?: string;
}

// Entité active : micro-entreprise française (SIREN 953058427, immatriculée
// le 30/07/2026). La Sàrl suisse (domiciliation Lausanne signée) n'est pas
// encore inscrite au Registre du Commerce — à rebasculer ici une fois
// l'immatriculation suisse effective.
export const companyConfig: CompanyConfig = {
  legalName: "Namake Keita",
  brandName: "KAH Digital",
  registrationStatus: "Entreprise individuelle — France",
  currency: "EUR",
  address: "",
  postalCode: "31200",
  city: "Toulouse",
  country: "France",
  email: "contact@kah-digital.ch",
  phone: "+33 7 59 55 84 14",
  siren: "953 058 427",
  apeCode: "62.01Z",
  vatNumber: "",
  hosting: "Vercel Inc., 340 Pine Street, Suite 900, San Francisco, CA 94104 (USA)",
  iban: "",
  quotePrefix: "DEV-",
  invoicePrefix: "INV-",
  uid: "",
  vat: "",
};
