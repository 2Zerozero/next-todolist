'use client';

import { getTodo } from '@/app/lib/api/todos';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

const TodoPage = () => {
  const { todoId } = useParams();

  // Todo 상세 정보 조회
  const { data: todo, isLoading } = useQuery({
    queryKey: ['todo', todoId],
    queryFn: () => getTodo(Number(todoId)),
    enabled: !!todoId, // todoId가 있을 때만 조회
  });

  return (
    <div>
      <div>{todo?.name}</div>
      <div>{todo?.memo}</div>
      <div>{todo?.imageUrl}</div>
    </div>
  );
};

export default TodoPage;
