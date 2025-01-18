import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/16/solid';
import { Button } from '../common/Button';
import { CreateTodoRequest } from '@/app/lib/types/types';

interface TodoInputProps {
  onCreateTodo: (todo: CreateTodoRequest) => Promise<void>;
}

const TodoInput = ({ onCreateTodo }: TodoInputProps) => {
  const [inputValue, setInputValue] = useState('');

  // Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 기본 동작 방지
    console.log('Input value:', inputValue); // 입력값 확인
    if (!inputValue.trim()) return; // 비어있는 경우 반환

    try {
      await onCreateTodo({ name: inputValue });
      setInputValue(''); // 입력 필드 초기화
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 flex w-full items-center justify-center gap-5"
    >
      <div className="relative w-full">
        <input
          className="h-[52px] w-full rounded-full border-2 border-slate-900 pl-5 outline-none"
          type="text"
          placeholder="할 일을 입력하세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {/* 그림자 영역 */}
        <div className="absolute left-1 top-1 -z-10 h-[52px] w-full rounded-full bg-slate-900"></div>
      </div>
      <Button
        icon={<PlusIcon className="h-6 w-6" />}
        label="추가하기"
        type="submit"
      />
    </form>
  );
};

export default TodoInput;
