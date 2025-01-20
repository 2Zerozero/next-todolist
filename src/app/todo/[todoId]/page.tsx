'use client';

import { Button } from '@/app/components/common/Button';
import { getTodo, updateTodo, uploadImage } from '@/app/lib/api/todos';
import { CheckIcon, PlusIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import TodoHeader from '@/app/components/todo-detail/TodoHeader';
import { Todo } from '@/app/lib/types/types';
import TodoDetailMemo from '@/app/components/todo-detail/TodoMemo';
import TodoImageUpload from '@/app/components/todo-detail/TodoImageUpload';

const TodoPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { todoId } = useParams();
  const queryClient = useQueryClient();

  // Todo 상세 정보 조회
  const { data: todo, isLoading } = useQuery({
    queryKey: ['todo', todoId],
    queryFn: () => getTodo(Number(todoId)),
    enabled: !!todoId, // todoId가 있을 때만 조회
  });

  // 초기 상태 설정
  useEffect(() => {
    if (todo) {
      setIsChecked(todo.isCompleted);
    }
  }, [todo]);

  // Mutation

  // Handler
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  if (isLoading) return <div></div>;
  if (!todo) return <div></div>;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-[1024px] flex-col items-center justify-center px-4">
        {/* 투두 상세 페이지 헤더 */}
        <TodoHeader
          todo={todo as Todo}
          isChecked={isChecked}
          onCheckboxChange={handleCheckboxChange}
        />
        {/* 투두 상세 페이지 내용 */}
        <div className="flex w-full justify-between gap-4">
          {/* 이미지 업로드 */}
          <TodoImageUpload
            todoId={Number(todoId)}
            initialImageUrl={todo.imageUrl}
          />
          {/* 메모 */}
          <TodoDetailMemo />
        </div>
        {/* 버튼 */}
        <div className="flex gap-5">
          <Button
            label="수정 완료"
            icon={<CheckIcon className="h-6 w-6" />}
            intent="edit"
          />
          <Button
            label="삭제하기"
            icon={<XMarkIcon className="h-6 w-6" />}
            intent="delete"
          />
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
