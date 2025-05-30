// src/app/(components)/layoutwrapper.jsx
'use client';

import { usePathname } from 'next/navigation';
import DynamicHeader from './dynamicheader';
import DynamicFooter from './dynamicfooter';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isAdminSignin = pathname === '/admin/signin';

  return (
    <div className={`flex min-h-screen ${isAdmin ? isAdminSignin ? '' : 'flex-row gap-4 p-4' : 'flex-col'}`}>
      <DynamicHeader />
      <main className="flex-1">{children}</main>
      <DynamicFooter />
    </div>
  );
}
