import { UserData } from '@/interface';

export const getAllUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data: UserData[] = await response.json();
  return data;
};

export const getUserBySubdomain = async (username: string) => {
  const users = await getAllUsers();
  const foundUser = users.find((user) => user.username.toLowerCase() === username.toLowerCase());
  if (foundUser) return foundUser;
  else return { error: 'User not found.' };
};

export const userStaticPaths = async () => {
  const users = await getAllUsers();
  return users.map((user) => {
    return { params: { subdomain: user.username.toLowerCase() } };
  });
};
export const userStaticPathsSubdomain = async () => {
  const users = await getAllUsers();
  return users.map((user) => {
    return { username: user.username };
  });
};


