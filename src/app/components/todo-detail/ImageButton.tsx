import { cn } from '@/lib/utils';

interface ImageButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: 'white' | 'black';
  className?: string;
}

const ImageButton = ({
  icon,
  onClick,
  variant = 'white',
  className,
}: ImageButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-16 w-16 items-center justify-center rounded-full transition-colors',
        variant === 'white' ? 'bg-slate-200' : 'bg-slate-900',
        className,
      )}
    >
      <div
        className={cn(
          'h-8 w-8',
          variant === 'white' ? 'text-slate-500' : 'text-white',
        )}
      >
        {icon}
      </div>
    </button>
  );
};

export default ImageButton;
