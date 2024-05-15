import Link from 'next/link';

export const BtnLink = ({ href, text }: { href: string, text: string }) => {
  return (
    <Link href={href}>
      <a className="px-8 py-2 w-full md:w-1/2 bg-neutral-100 text-emerald-700 underline mt-4 text-center">
        {text}
      </a>
    </Link>
  );
};
