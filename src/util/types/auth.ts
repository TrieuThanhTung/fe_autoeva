export type UserRegistrationPayload = {
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
  phone_number: string;
};

export type UserLoginPayload = {
  email: string, 
  password: string
};
