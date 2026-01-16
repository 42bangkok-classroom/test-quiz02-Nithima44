import axios from 'axios';
interface User3{
  id: number;
  name: string;
  phone: string;
  address:{
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  [key: string]: any; 
}
interface filterUser {
  id: number;
  name: string;
  phone: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}
export const filterUserById = async (id: number): Promise<filterUser | string> => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const {data} = await axios.get<User3[]>(url);
    const foundUser = data.find((user) => user.id === id);
    if (!foundUser){
      return "Invalid id";
    }
    return{
      id: foundUser.id,
      name: foundUser.name,
      phone: foundUser.phone,
      address: foundUser.address,
    };

  } catch (error){
    return "Invalid id";
  }
};
filterUserById(1).then((result) => console.log(result));