import { UserData } from '@/interface';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const data = await response.json();
      return data;
    }

    fetchUsers().then((userData) => setUsers(userData));
  }, []);

  console.log(users.map((user) => user.username));
  return (
    <main>
      <div>
        {users &&
          users?.map((user) => (
            <div key={user.username}>
              <Link
                href={
                  window.location.protocol +
                  '//' +
                  user.username +
                  '.' +
                  window.location.host
                }
              >
                {user.username}
              </Link>
            </div>
          ))}
      </div>

      <Link href='/a/register'>Register</Link>
    </main>
  );
}
