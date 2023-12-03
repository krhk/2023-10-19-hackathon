export interface UserApiResponse {
  id: number;
  email: string;
  password: string;
  is_company: boolean;
  idividual_title_before_name: string;
  idividual_name: string;
  idividual_surname: string;
  idividual_title_after_name: string;
  company_name: string;
  company_ico: string;
}

export function get_user() {
  const item = localStorage.getItem("user");
  if (item == null || item.length === 0) {
    return null;
  }
  return JSON.parse(item);
}

export function is_user_logged_in() {
  return get_user() != null;
}

export function set_user(user: UserApiResponse) {
  return localStorage.setItem("user", JSON.stringify(user));
}
