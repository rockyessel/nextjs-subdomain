import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.href;
  const hostname = request.headers.get('host');
  const subdomain = pathname?.split('.')[0];

  // Check if the request is to a subdomain
  if (!subdomain) {
    return NextResponse.next();
  }

  const modifiedPathname = pathname.replace(
    '/subdomain/',
    `/subdomain/${hostname?.split('.')[0]}/`
  );
  console.log('request', request);
  console.log('pathname', pathname.split('subdomain'));
  console.log('subdomain', subdomain);
  console.log('hostname', hostname);
  console.log('modifiedPathname', modifiedPathname);

  // Rewrite the request to the subdomain
  const newUrl = new URL(request.nextUrl.origin);
  newUrl.hostname = `${subdomain}.${request.nextUrl.hostname}`;
  console.log('newUrl hostname', newUrl.hostname);
  //   newUrl.pathname = ;
  console.log('newUrl p', newUrl.toString());

  return NextResponse.rewrite(modifiedPathname.toString());
}
