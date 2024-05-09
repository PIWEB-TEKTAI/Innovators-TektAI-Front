export type User = {
  id:string;
    email:string;
    FirstName:string;
    LastName:string;
    Description:string;
    occupation:string;
    phone:string;
    address:string;
    skills:Array<string>;
    userName:string;
    role:string;
    imageUrl:string;
    contry:string;
    Skills:Array<string>;
    company: {
      name: string,
      address: string,
      email: string,
      description:string,
      phone: string,
      professionnalFields: string,
      websiteUrl:string,
      creationDate:string,
      subscriptionType: string,
      subscriptionExpirationDate: Date
    },
    favories:Array<number>;


  };/*   email:string;
  password:string;
  token:string;*/ 