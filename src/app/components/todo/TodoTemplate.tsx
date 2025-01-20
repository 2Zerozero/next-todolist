'use client';

import {
  CreateTodoRequest,
  TodoListItem,
  UpdateTodoRequest,
} from '@/app/lib/types/types';
import { createTodo, getTodos, updateTodo } from '@/app/lib/api/todos';
import React from 'react';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

const TodoTemplate = () => {
  const queryClient = useQueryClient();

  // 할 일 목록 조회
  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  const completedTodos = todos.filter((todo) => todo.isCompleted);
  const uncompletedTodos = todos.filter((todo) => !todo.isCompleted);

  // Mutation
  // 할 일 생성
  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // 할 일 수정
  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onMutate: async (newTodo) => {
      // 낙관적 업데이트
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData(['todos']);

      queryClient.setQueryData(['todos'], (old: TodoListItem[]) =>
        old.map((todo) =>
          todo.id === newTodo.id ? { ...todo, ...newTodo } : todo,
        ),
      );

      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      // 에러시 롤백
      queryClient.setQueryData(['todos'], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // Handler
  const handleCreateTodo = async (newTodo: CreateTodoRequest) => {
    try {
      await createTodoMutation.mutateAsync(newTodo);
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  const handleUpdateTodo = async (updatedTodo: UpdateTodoRequest) => {
    try {
      await updateTodoMutation.mutateAsync(updatedTodo);
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 xl:w-[1200px]">
      {/* 할 일 생성 */}
      <TodoInput onCreateTodo={handleCreateTodo} />
      {/* 할 일 리스트 */}
      <div className="flex w-full flex-col items-start gap-6 lg:flex-row">
        <TodoList
          title="Todo"
          todos={uncompletedTodos}
          onUpdateTodo={handleUpdateTodo}
        />
        <TodoList
          title="Done"
          todos={completedTodos}
          onUpdateTodo={handleUpdateTodo}
        />
      </div>
    </div>
  );
};

export default TodoTemplate;
