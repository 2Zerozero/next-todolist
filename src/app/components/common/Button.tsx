import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

// 버튼 스타일
const buttonVariants = cva(
  // 공통 스타일
  'flex items-center justify-center border-2 border-slate-900 rounded-full font-bold text-[17px] leading-[17px]',
  {
    variants: {
      variant: {
        primary: [
          'w-[55px] h-[52px]', // 모바일
          'sm:w-[164px]', // 데스크탑
        ],
      },
      intent: {
        add: 'bg-slate-200 text-slate-900 active:bg-violet-600 active:text-white',
        edit: 'bg-slate-200 text-slate-900 active:bg-lime-300',
        delete: 'bg-rose-500 text-white active:bg-rose-600',
      },
    },
    defaultVariants: {
      variant: 'primary',
      intent: 'add',
    },
  }
);

// 버튼 컴포넌트 속성
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  label?: string;
  icon: React.ReactNode;
}

// 버튼 컴포넌트
export function Button({ label, intent, className, icon, ...props }: ButtonProps) {
  return (
    <div className="relative">
      {/* 그림자 역할 */}
      <div
        className={cn(
          'absolute rounded-full -z-10 top-1 left-1',
          // 사이즈
          'w-[55px] h-[52px]',
          'sm:w-[164px]',
          // 색상
          'bg-slate-900'
        )}
      />

      {/* 버튼 역할 */}
      <button className={cn(buttonVariants({ intent }), className)} {...props}>
        <div className="flex items-center justify-center gap-1">
          <div className="flex items-center justify-center">{icon}</div>
          <span className="hidden md:inline-block">{label}</span>
        </div>
      </button>
    </div>
  );
}
