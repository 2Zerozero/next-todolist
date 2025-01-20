import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className="flex w-full items-center justify-center border-b border-slate-200 px-4">
      <Link
        href="/"
        className="flex h-[60px] w-[1200px] items-center justify-start"
      >
        {/* 로고 */}
        <Image
          src="/logo/Logo.svg"
          alt="logo"
          width={152}
          height={40}
          priority
          className="hidden sm:block"
        />
        <Image
          src="/logo/LogoSmall.svg"
          alt="logo"
          width={71}
          height={40}
          priority
          className="block sm:hidden"
        />
      </Link>
    </div>
  );
};

export default Header;
