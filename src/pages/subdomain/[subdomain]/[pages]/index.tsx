// pages/subdomain/[subdomain]/[page].tsx

import { UserData } from '@/interface';
import {
  getUserBySubdomain,
  userStaticPaths,
  userStaticPathsSubdomain,
} from '@/lib/users';
import { GetStaticPaths, GetStaticProps } from 'next';

// ...

export default function SubdomainPage(props: {
  data: UserData;
  pages: string;
}) {
  // Render your subdomain-specific page content using data

  console.log('SubdomainPage', props);

  switch (props.pages) {
    case 'about':
      return <>Hello, `about`</>;
    case 'contact':
      return <>Hello, `contact`</>;

    default:
      return <>Hello, `non`</>;
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of subdomains
  const subdomains = await userStaticPathsSubdomain(); // Replace with your actual data-fetching function

  // Define the list of pages within each subdomain
  const pages = [
    {
      page: 'about',
    },
    {
      page: 'contact',
    },
    // Add more pages as needed
  ];

  // Generate dynamic paths for subdomains and their pages
  const paths = subdomains.flatMap((subdomain) =>
    pages.map((page) => ({
      params: {
        subdomain: subdomain.username.toLowerCase(),
        pages: page.page,
      },
    }))
  );

  return {
    paths,
    fallback: false, // or true if you want to handle unknown pages
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { subdomain, pages } = params! as { subdomain: string; pages: string };
  // Fetch data for the specific subdomain and page
  const data = await fetchData(subdomain!, pages); // Replace with your data-fetching logic
  return {
    props: {
      data,
      pages,
    },
    revalidate: 3600, // Optional, set revalidation time
  };
};

async function fetchData(subdomain: string, pages: string) {
  console.log({ subdomain, pages });

  return await getUserBySubdomain(subdomain);
}

// import { useRouter } from 'next/router';
// import { UserData } from '@/interface';
// import { getUserBySubdomain, userStaticPaths } from '@/lib/users';
// import Link from 'next/link';

// export default function Index(props: UserData) {
//   const router = useRouter();

//   if (router.isFallback) {
//     return (
//       <>
//         <p>Loading...</p>
//       </>
//     );
//   }

//   console.log('Subdomain', props);

//   return (
//     <main>
//       <h1>User {props?.name}</h1>
//       <p>Company: {props?.company?.name}</p>
//       <p className='inline-flex flex-col gap-1'>
//         Address:
//         <span>City: {props?.address?.city}</span>
//         <span>Street: {props?.address?.street}</span>
//       </p>

//       <Link
//         href={`/subdomain/${props.username}/about`}
//         as={`/subdomain/${props.username}/about`}
//       >
//         {' '}
//         About me here
//       </Link>
//     </main>
//   );
// }

// // Getting the paths for all the subdomains in our database
// export async function getStaticPaths() {
//   const paths = await userStaticPaths();
//   return {
//     paths,
//     fallback: true,
//   };
// }

// // Getting data to display on each custom subdomain
// export async function getStaticProps(context: {
//   params: { subdomain: string };
// }) {
//   const user = await getUserBySubdomain(context.params.subdomain);
//   console.log('Subdomain: ', context.params.subdomain);
//   return {
//     props: user,
//     revalidate: 3600,
//   };
// }
