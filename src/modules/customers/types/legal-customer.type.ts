export interface LegalCustomerType {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  country: string;
  city: string;
  localAdministration: string;
  street: string;
  house: string;
  flat: string;
  postCode: string;
  companyDetails: {
    companyName: string;
    companyLegalCode: string;
    companyTaxCode: string;
    country: string;
    city: string;
    localAdministration: string;
    street: string;
    house: string;
    flat: string;
    postCode: string;
  };
}
