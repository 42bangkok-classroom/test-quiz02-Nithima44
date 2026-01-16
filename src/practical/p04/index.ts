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

interface User {
  id: number;
  name: string;
  phone: string;
  address: Address;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface UserWithTodos {
  id: number;
  name: string;
  phone: string;
  address: Address;
  todos: Todo[];
}

export const getTodosByUserId = async (
  id: number
): Promise<UserWithTodos | string> => {
  try {
    const usersUrl = "https://jsonplaceholder.typicode.com/users";
    const todosUrl = "https://jsonplaceholder.typicode.com/todos";

    const [usersRes, todosRes] = await Promise.all([
      axios.get<User[]>(usersUrl),
      axios.get<Todo[]>(todosUrl),
    ]);

    const user = usersRes.data.find((u) => u.id === id);

    if (!user) {
      return "Invalid id";
    }
    const userTodos = todosRes.data.filter((todo) => todo.userId === id);

    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address,
      todos: userTodos,
    };
  } catch (error) {
    return "Invalid id";
  }
};