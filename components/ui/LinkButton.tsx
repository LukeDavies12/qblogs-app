import { Button } from "@/components/ui/button";
import Link from 'next/link';
import React from 'react';

interface LinkButtonProps {
  href: string;
  label: string;
  className?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ href, label, className = "px-2" }) => {
  return (
    <Link href={href}>
      <Button variant="link" className={className}>
        {label}
      </Button>
    </Link>
  );
};