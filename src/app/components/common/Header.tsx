import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className="w-full flex items-center justify-center border-b border-slate-200">
      <Link href="/" className="flex items-center justify-start w-[1200px] h-[60px]">
        {/* 로고 */}
        <Image src="/logo/Logo.svg" alt="logo" width={152} height={40} className="hidden sm:block" />
        <Image src="/logo/LogoSmall.svg" alt="logo" width={71} height={40} className="block sm:hidden" />
      </Link>
    </div>
  );
};

export default Header;
