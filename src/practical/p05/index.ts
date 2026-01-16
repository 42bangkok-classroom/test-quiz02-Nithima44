import axios from 'axios';
interface User5 {
  id: number;
  name: string;
  phone: string;
  address?: {
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
interface SafeOp {
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
  } | null;
}
export const safeFetchUser = async (userId: number): Promise<SafeOp | null> => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const { data } = await axios.get<User5[]>(url);
    if (!data || !Array.isArray(data)) {
      return null;
    }
    const foundUser = data.find((user) => user.id === userId);
    if (!foundUser) {
      return null;
    }
    const userAddress = foundUser.address || null;
    return {
      id: foundUser.id,
      name: foundUser.name,
      address: userAddress, 
      phone: foundUser.phone, 
    };
  } catch (error) {
    return null;
  }
};
safeFetchUser(1).then((result) => console.log(result));
