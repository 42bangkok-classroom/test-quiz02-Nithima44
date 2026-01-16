import axios from "axios";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface User2 {
  id: number;
  name?: string;
  phone?: string;
  username?: string;
  email?: string;
  address?: Address | null; 
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface FormatUser {
  id: number;
  name: string | null;
  phone: string | null;
  address: Address | null;
}

type NewUser = Omit<User2, "id">;

export const addUser = async (
  newData: NewUser | null
): Promise<FormatUser[]> => {
  try {
    const url = "https://jsonplaceholder.typicode.com/users";
    const { data } = await axios.get<User2[]>(url);

    const result: FormatUser[] = data.map((user) => ({
      id: user.id,
      name: user.name ?? null,
      phone: user.phone ?? null,
      address: user.address ?? null,
    }));

    if (!newData) {
      return result;
    }

    const lastId = result.length > 0 ? result[result.length - 1].id : 0;

    result.push({
      id: lastId + 1,
      name: newData.name ?? null,
      phone: newData.phone ?? null,
      address: newData.address ?? null,
    });

    return result;
  } catch {
    return [];
  }
};
