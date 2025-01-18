'use client';

import { getTodos, updateTodo } from '@/app/lib/api/todos';
import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import { TodoListItem, UpdateTodoRequest } from '@/app/lib/types/types';

const TodoTemplate = () => {
  // 상태관리
  const [todos, setTodos] = useState<TodoListItem[]>([]);
  const completedTodos = todos.filter((todo) => todo.isCompleted);
  const uncompletedTodos = todos.filter((todo) => !todo.isCompleted);

  // 할 일 목록 조회
  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  // Handler
  const handleUpdateTodo = async (updatedTodo: UpdateTodoRequest) => {
    // 낙관적 업데이트: 즉시 UI 반영
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === updatedTodo.id
          ? { ...todo, ...updatedTodo } // 모든 기존 속성 유지하면서 업데이트
          : todo
      )
    );

    try {
      await updateTodo(updatedTodo);
    } catch (error) {
      // 실패 시 원래 상태로 복구
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? { ...todo, isCompleted: !updatedTodo.isCompleted } : todo
        )
      );
      console.error('Failed to update todo:', error);
    }
  };

  // 컴포넌트 마운트 시 할 일 목록 조회
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="flex items-center justify-center w-[1200px]">
      {/* 할 일 생성 */}

      {/* 할 일 리스트 */}
      <div className="flex flex-col items-center justify-center w-full h-full gap-6 md:flex-row">
        <TodoList title="Todo" todos={uncompletedTodos} onUpdateTodo={handleUpdateTodo} />
        <TodoList title="Done" todos={completedTodos} onUpdateTodo={handleUpdateTodo} />
      </div>
    </div>
  );
};

export default TodoTemplate;
