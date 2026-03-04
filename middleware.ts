import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Tüm pathname'leri eşleştir, API routes ve static files hariç
  matcher: ['/', '/(tr|en|ar)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};