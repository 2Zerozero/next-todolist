'use client';

import { getTodos, updateTodo } from '@/app/lib/api/todos';
import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import { TodoListItem, UpdateTodoRequest } from '@/app/lib/types/types';

const TodoTemplate = () => {
  const [todos, setTodos] = useState<TodoListItem[]>([]);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const handleUpdateTodo = async (updatedTodo: UpdateTodoRequest) => {
    try {
      console.log('Sending update request:', updatedTodo); // 디버깅용
      const result = await updateTodo(updatedTodo);
      console.log('Update response:', result); // 디버깅용
      fetchTodos();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const completedTodos = todos.filter((todo) => todo.isCompleted);
  const uncompletedTodos = todos.filter((todo) => !todo.isCompleted);

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
