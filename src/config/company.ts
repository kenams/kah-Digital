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
  vatNumber: string;
  hosting: string;
  iban: string;
  quotePrefix: string;
  invoicePrefix: string;
  uid?: string; // For Swiss companies
  vat?: string; // For Swiss companies
}

export const companyConfig: CompanyConfig = {
  legalName: "KAH-Digital",
  brandName: "KAH-Digital",
  registrationStatus: "Entreprise individuelle",
  currency: "EUR",
  address: "Rue du Simplon 4",
  postalCode: "1006",
  city: "Lausanne",
  country: "Switzerland",
  email: "contact@kah-digital.ch",
  phone: "+33 7 59 55 84 14",
  siren: "",
  vatNumber: "",
  hosting: "Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789 (USA)",
  iban: "",
  quotePrefix: "DEV-",
  invoicePrefix: "INV-",
  uid: "", // Non applicable ici
  vat: "", // Non applicable ici
};
