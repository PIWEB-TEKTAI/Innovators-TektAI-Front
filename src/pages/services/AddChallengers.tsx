import axios from "axios";
import { useState, useEffect } from "react";

interface User {
    email: {
      type: string;
      required: boolean;
      unique: boolean;
    };
    FirstName: string;
    LastName: string;
    password: string;
    imageUrl: string;
    phone: string;
    address: string;
    birthDate: Date | null;
    occupation: string;
    Description: string;
    Education: string;
    Skills: string;
    isEmailVerified: boolean;
    state: 'validated' | 'not validated' | 'blocked';
    role: 'super admin' | 'admin' | 'challenger' | 'company';
  }
  
  
  // ... (previous imports)
  
  export default function FetchData()
  {
    const [data, setData] = useState<User[]>([]);
  
  
    useEffect(() => {
       axios.post<User[]>('http://localhost:3000/Admin/AddChallengerByAdmin').then(response=>setData(response.data))
       .catch(err=>console.log(err));
      }, []);
    }  