'use client';

import { cn } from '@/lib/utils';
import { TodoListItem, UpdateTodoRequest } from '@/app/lib/types/types';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Type
interface TodoItemProps {
  todo: TodoListItem; // 단일 투두 아이템
  onUpdateTodo: (todo: UpdateTodoRequest) => Promise<void>;
}

const TodoItem = ({ todo, onUpdateTodo }: TodoItemProps) => {
  const router = useRouter();
  // 상태 관리
  const [isChecked, setIsChecked] = useState<boolean>(todo.isCompleted);

  // useEffect를 사용하여 todo.isCompleted가 변경될 때 상태 업데이트
  useEffect(() => {
    setIsChecked(todo.isCompleted);
  }, [todo.isCompleted]);

  // Handler
  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    const newStatus = e.target.checked;
    setIsChecked(newStatus);

    try {
      await onUpdateTodo({
        id: todo.id,
        isCompleted: newStatus,
      });
    } catch (error) {
      setIsChecked(!newStatus);
      console.error('Failed to update todo status:', error);
    }
  };

  const handleRouteClick = () => {
    router.push(`/todo/${todo.id}`);
  };

  return (
    <div
      className={cn(
        `flex h-[50px] w-full items-center justify-start gap-3 rounded-full border-2 border-slate-900 pl-2`,
        `${isChecked ? 'bg-violet-100' : 'bg-white'}`,
      )}
      onClick={handleRouteClick}
    >
      {/* 체크 박스 */}
      <label
        className="flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          className="peer hidden"
          onChange={handleCheckboxChange}
          checked={isChecked}
        />
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-slate-900 peer-checked:border-none peer-checked:bg-violet-600">
          {isChecked && (
            <Image src="/icon/Check.svg" alt="Check" width={20} height={14} />
          )}
        </div>
      </label>

      {/* 할 일 제목 */}
      <span className={cn(isChecked && 'text-slate-500 line-through')}>
        {todo.name}
      </span>
    </div>
  );
};

export default TodoItem;
