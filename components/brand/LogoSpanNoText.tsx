"use client"

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LogoSpanNoText() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine the actual theme taking into account the system preference
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const logoSrc = currentTheme === 'dark'
    ? '/qblogs_logo_darkmode.svg'
    : '/qblogs_logo_lightmode.svg';

  if (!mounted) {
    return null; // or a placeholder/loading state if preferred
  }

  return (
    <Link href={"/"}>
      <Image src={logoSrc} alt="QB + Coordinator Intelligence Platform" width={32} height={28} />
    </Link>
  );
}