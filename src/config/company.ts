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
  uid?: string;
  vat?: string;
}

export const companyConfig: CompanyConfig = {
  legalName: "KAH Digital Sàrl",
  brandName: "KAH Digital",
  registrationStatus: "Sàrl — immatriculation RC Vaud en cours",
  currency: "CHF",
  address: "Rue de Bourg 27",
  postalCode: "1003",
  city: "Lausanne",
  country: "Switzerland",
  email: "contact@kah-digital.ch",
  phone: "+33 7 59 55 84 14",
  siren: "",
  vatNumber: "",
  hosting: "Vercel Inc., 340 Pine Street, Suite 900, San Francisco, CA 94104 (USA)",
  iban: "",
  quotePrefix: "DEV-",
  invoicePrefix: "INV-",
  uid: "",
  vat: "",
};
