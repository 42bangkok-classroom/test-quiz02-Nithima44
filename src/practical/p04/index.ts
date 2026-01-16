import axios from 'axios';
interface User4 {
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
interface todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
interface UserWithTodos extends User4 {
  todos: todos[];
}
export const getTodosbyUserId = async (id: number): Promise<UserWithTodos | string> => {
  try {
    const usersUrl = 'https://jsonplaceholder.typicode.com/users';
    const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
    const [usersResponse, todosResponse] = await Promise.all([
      axios.get<User4[]>(usersUrl),
      axios.get<todos[]>(todosUrl)
    ]);
    const users = usersResponse.data;
    const todos = todosResponse.data;
    const foundUser = users.find((user) => user.id === id);
    if (!foundUser) {
      return "Invalid id";
    }
    const userTodos = todos.filter((todo) => todo.userId === id);
    const result: UserWithTodos = {
      id: foundUser.id,
      name: foundUser.name,
      phone: foundUser.phone,
      address: foundUser.address,
      todos: userTodos,
    };
    return result;

  } catch (error) {
    return "Invalid id";
  }
};
getTodosbyUserId(-1).then((result) => console.log(result));