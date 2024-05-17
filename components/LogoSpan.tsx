"use client"

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

export default function LogoSpan() {
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
      <span className="font-bold flex gap-2 items-center">
        <Image src={logoSrc} alt="QB + Coordinator Intelligence Platform" width={36} height={30} />
        QB Logs
      </span>
    </Link>
  );
}