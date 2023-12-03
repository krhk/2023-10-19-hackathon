export interface User {
  id: number;
  email: string;
  password: string;
  is_company: boolean;
}

export interface IndividualUser extends User {
  idividual_title_before_name: string;
  idividual_name: string;
  idividual_surname: string;
  idividual_title_after_name: string;
}

export interface CompanyUser extends User {
  company_name: string;
  company_ico: string;
}
