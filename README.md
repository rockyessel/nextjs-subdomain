# Subdomains with Next.js - Local Environment Starter

This is a starter template for creating a Next.js application with subdomain support in a local development environment. You can use this template as a foundation for building applications that require subdomain routing.

## Features

- Dynamic subdomain routing: Access different content based on subdomains (e.g., `keyword.localhost:3000`).
- User data simulation: Utilizes a mock user API to demonstrate subdomain-based data rendering.

## Getting Started

Follow these steps to get started with this Next.js subdomain template:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/nextjs-subdomain-template.git
Install dependencies:
```js
    cd nextjs-subdomain-template
    npm install
```

Start the development server:
```js
npm run dev
```
Access your application using subdomains:

Open your web browser and navigate to *.localhost:3000.
Try accessing subdomains like keyword.localhost:3000.
Usage
Customizing Subdomain Data
This template includes a simulated user API.
The "about" page (/about) displays different data based on the subdomain.
Customize data for each subdomain by modifying the getUserBySubdomain function in lib/users.js.
Adding Your Own Pages
Extend the project by adding your own pages and components under the pages directory.
Follow the subdomain routing logic in the middleware.js file to create dynamic subdomain-based pages.
Contributing
Feel free to contribute to this project by opening issues or submitting pull requests. Your contributions are welcome!

License
This project is licensed under the MIT License - see the LICENSE file for details.