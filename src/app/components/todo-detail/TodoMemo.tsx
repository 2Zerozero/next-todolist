'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface TodoMemoProps {
  initialMemo?: string;
  onChange: (memo: string) => void;
}

const TodoMemo = ({ initialMemo, onChange }: TodoMemoProps) => {
  const [memo, setMemo] = useState(initialMemo || '');

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMemo = e.target.value;
    setMemo(newMemo);
    onChange(newMemo);
  };

  return (
    <div
      className={cn(
        'flex h-[312px] flex-1 flex-col items-center p-4',
        "bg-[url('/todo/MemoBg.svg')] bg-cover",
      )}
    >
      <h2 className="font-bold text-amber-800">Memo</h2>
      <textarea
        className="h-full w-full resize-none items-center border-none bg-transparent p-5 text-center outline-none"
        placeholder="메모를 입력해주세요."
        value={memo}
        onChange={handleMemoChange}
      />
    </div>
  );
};

export default TodoMemo;
