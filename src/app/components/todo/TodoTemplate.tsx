'use client';

import {
  CreateTodoRequest,
  TodoListItem,
  UpdateTodoRequest,
} from '@/app/lib/types/types';
import { createTodo, getTodos, updateTodo } from '@/app/lib/api/todos';
import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import TodoInput from './TodoInput';

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
  // 할 일 생성
  const handleCreateTodo = async (newTodo: CreateTodoRequest) => {
    try {
      // 1. createTodo API 호출하고 결과 대기
      const createdTodo = await createTodo(newTodo);

      // 2. 성공하면 새로운 todo를 현재 목록에 추가
      setTodos((prev) => [...prev, createdTodo]); // 기존 목록에 새 항목 추가
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  // 할 일 수정
  const handleUpdateTodo = async (updatedTodo: UpdateTodoRequest) => {
    // 낙관적 업데이트: 즉시 UI 반영
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === updatedTodo.id
          ? { ...todo, ...updatedTodo } // 모든 기존 속성 유지하면서 업데이트
          : todo,
      ),
    );

    try {
      await updateTodo(updatedTodo);
    } catch (error) {
      // 실패 시 원래 상태로 복구
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id
            ? { ...todo, isCompleted: !updatedTodo.isCompleted }
            : todo,
        ),
      );
      console.error('Failed to update todo:', error);
    }
  };
  // 컴포넌트 마운트 시 할 일 목록 조회
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="flex w-[1200px] flex-col items-center justify-center gap-10">
      {/* 할 일 생성 */}
      <TodoInput onCreateTodo={handleCreateTodo} />
      {/* 할 일 리스트 */}
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 md:flex-row">
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
