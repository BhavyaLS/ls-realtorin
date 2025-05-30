// src/app/(components)/dynamicheader.jsx
'use client';

import { usePathname } from 'next/navigation';
import Header from './header';
import AdminHeader from './adminheader';

export default function DynamicHeader() {
  const pathname = usePathname();
  return pathname.startsWith('/admin') ? pathname.endsWith('/admin/signin') ? "" :<AdminHeader /> : <Header />;
}
