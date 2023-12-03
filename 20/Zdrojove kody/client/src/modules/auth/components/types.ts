export interface RegisterProps {
  email: string;
  password: string;
  passwordCheck: string;
  companyName: string;
  companyIco: string;
  individualTitle: string;
  individualFirstName: string;
  individualSurname: string;
  individualTitleAfterName: string;
}

export interface LoginProps {
  email: string;
  password: string;
}
