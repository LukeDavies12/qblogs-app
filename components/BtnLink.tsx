import Link from 'next/link';

export const BtnLink = ({ href, text, extraStyles }: { href: string, text: string, extraStyles?: string }) => {
  const className = `px-8 py-2 bg-neutral-100 text-emerald-700 underline text-center ${extraStyles}`;

  return (
    <Link href={href} className={className}>
      {text}
    </Link >
  );
};
