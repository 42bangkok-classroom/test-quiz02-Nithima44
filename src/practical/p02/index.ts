import axios from 'axios';
interface User2 {
  id: number;
  name?: string;
  phone?: string;
  username?: string;
  email?: string;
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
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
interface formatUser {
  id: number;
  name: string | null;
  phone: string | null;
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
export const addUser = async (newData: User2 | null): Promise<formatUser[]> => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const { data } = await axios.get<User2[] & { id: number }[]>(url);
    const format: formatUser[] = data.map((user) => ({
      id: user.id,
      name: user.name ?? null,
      phone: user.phone ?? null,
      address: user.address ?? null,
    }));
    if (!newData) {
      return format;
    }
    const lastId = format.length > 0 ? format[format.length - 1].id : 0;
    const newId = lastId + 1;
    const newEntry: formatUser = {
      id: newId,
      name: newData.name ?? null,
      address: newData.address ?? null,
      phone: newData.phone ?? null,
    };
    format.push(newEntry);
    return format;
  } catch (error) {
    return [];
  }
};