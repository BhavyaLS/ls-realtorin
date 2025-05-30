// src/app/(components)/dynamicfooter.jsx
'use client';

import { usePathname } from 'next/navigation';
import Footer from './footer';

export default function DynamicFooter() {
  const pathname = usePathname();
  return pathname.startsWith('/admin') ? null : <Footer />;
}
