'use client';

import { TodoListItem, UpdateTodoRequest } from '@/app/lib/types/types';
import React, { useEffect, useState } from 'react';

// Type
interface TodoItemProps {
  todo: TodoListItem; // 단일 투두 아이템
  onUpdateTodo: (todo: UpdateTodoRequest) => Promise<void>;
}

const TodoItem = ({ todo, onUpdateTodo }: TodoItemProps) => {
  // 상태 관리
  const [isChecked, setIsChecked] = useState<boolean>(todo.isCompleted);

  // useEffect를 사용하여 todo.isCompleted가 변경될 때 상태 업데이트
  useEffect(() => {
    setIsChecked(todo.isCompleted);
  }, [todo.isCompleted]);

  // 할 일 상태 변경 handler
  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className={'flex items-center justify-start w-full h-[50px] border-2 border-slate-900 rounded-full pl-2'}>
      <label className="flex items-center justify-center gap-3">
        {/* 체크 박스 */}
        <input type="checkbox" className="peer hidden" onChange={handleCheckboxChange} checked={isChecked} />
        <div className="w-8 h-8 border-2 border-slate-900 rounded-full peer-checked:bg-slate-900" />
        {/* 할 일 제목 */}
        <span className="peer-checked:line-through">{todo.name}</span>
      </label>
    </div>
  );
};

export default TodoItem;
