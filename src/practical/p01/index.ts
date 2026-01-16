import axios from 'axios';
interface User1 {
  id: number;
  name: string;
  username: string;
  email: string;
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
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
interface Postal {
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
export const getPostalAddress = async (): Promise<Postal[]> => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const { data } = await axios.get<User1[]>(url);

    if (!data || data.length === 0) {
      return [];
    }
    const format: Postal[] = data.map((user) => {
      return {
        id: user.id,
        name: user.name,
        phone: user.phone,
        address: user.address ? user.address : null,
      };
    });
    return format;
  } catch (error) {
    return [];
  }
};
getPostalAddress();