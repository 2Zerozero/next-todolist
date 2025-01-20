'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Todo } from '@/app/lib/types/types';

interface TodoDetailHeaderProps {
  todo: Todo;
  isChecked: boolean;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TodoDetailHeader = ({
  todo,
  isChecked,
  onCheckboxChange,
}: TodoDetailHeaderProps) => {
  return (
    <div
      className={cn(
        'flex h-16 w-full items-center justify-center rounded-full border-2 border-slate-900',
        isChecked ? 'bg-violet-200' : 'bg-white',
      )}
    >
      <label className="flex items-center justify-center gap-3">
        <input
          type="checkbox"
          className="peer hidden"
          onChange={onCheckboxChange}
          checked={isChecked}
        />
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-slate-900 bg-yellow-50 peer-checked:border-none peer-checked:bg-violet-600">
          {isChecked && (
            <Image src="/icon/Check.svg" alt="Check" width={20} height={14} />
          )}
        </div>
        <span className="text-xl font-bold underline">{todo.name}</span>
      </label>
    </div>
  );
};

export default TodoDetailHeader;
