'use client';

import { Button } from '@/app/components/common/Button';
import { getTodo, updateTodo, uploadImage } from '@/app/lib/api/todos';
import { CheckIcon, PlusIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import TodoHeader from '@/app/components/todo-detail/TodoHeader';
import { Todo } from '@/app/lib/types/types';
import TodoImageUpload from '@/app/components/todo-detail/TodoImageUpload';
import TodoMemo from '@/app/components/todo-detail/TodoMemo';

const TodoPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { todoId } = useParams();
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [memo, setMemo] = useState<string>('');
  const router = useRouter();

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
  const updateTodoMutation = useMutation({
    mutationFn: () => {
      return updateTodo({
        id: Number(todoId),
        memo: memo,
        imageUrl: imageUrl,
        isCompleted: isChecked,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo', todoId] });
    },
  });

  // Handler
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleUpdateClick = async () => {
    try {
      await updateTodoMutation.mutateAsync();
      router.push('/');
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
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
            onImageUrlChange={setImageUrl}
          />
          {/* 메모 */}
          <TodoMemo initialMemo={todo?.memo} onChange={setMemo} />
        </div>
        {/* 버튼 */}
        <div className="flex w-full items-center justify-end gap-5">
          <Button
            label="수정 완료"
            icon={<CheckIcon className="h-6 w-6" />}
            intent="edit"
            onClick={handleUpdateClick}
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
