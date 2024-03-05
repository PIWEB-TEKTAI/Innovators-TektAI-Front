export type User= {
  _id: string;
  FirstName: string;
  LastName: string;
  email: string;
  password: string;
  imageUrl?: string;
  phone?: string;
  address?: string;
  birthDate?: Date;
  occupation: string;
  Description?: string;
  Education?: string;
  skills?: Array<string>;
  country:string;
  company: {
    name: string;
    address: string;
    email: string;
    description: string;
    phone: string;
    professionnalFields: string
  };
  isEmailVerified?: boolean;
  isDeactivated?: boolean;

  state: 'validated' | 'not validated';
  role: 'super admin' | 'admin' | 'challenger' | 'company';
  isExternalUser:boolean;
  AlreadyCompany:boolean,
  isDemandingToSwitchAccount:boolean
}
