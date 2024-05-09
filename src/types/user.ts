export type User = {
    id: number;
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
      professionnalFields: string
    },


  };/*   email:string;
  password:string;
  token:string;*/ 