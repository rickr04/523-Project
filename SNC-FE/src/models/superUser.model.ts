import { SubUser } from "./subUser.model";
export class SuperUser {
  _id: string;
  email: string;
  password: string;
  fname: string;
  lname: string;
  address: string;
  company: string;
  telephone: string;
  subusers: [SubUser]
}
