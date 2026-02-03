export class User {
  email: string;
  password: string;
  roles: Roles;

  constructor(email: string, password: string, roles: Roles) {
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}

export enum Roles {
  Admin = 'ADMIN',
  User = 'USER',
  Customer = 'CUSTOMER',
}
