export interface Users {
  name: string;
  surname: string;
  nick: string;
  hobbies: string[];
  birthdayDate: string;
  description: string;
  email: string;
  password: string;
  photo:File;
  googleId?: string;
}
