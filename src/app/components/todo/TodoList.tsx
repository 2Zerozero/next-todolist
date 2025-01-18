import React from 'react';
import TodoItem from './TodoItem';
import { TodoListItem, UpdateTodoRequest } from '@/app/lib/types/types';
import Image from 'next/image';

// Type
interface TodoListProps {
  title: string;
  todos: TodoListItem[]; // 배열로 받아온다.
  onUpdateTodo: (todo: UpdateTodoRequest) => Promise<void>;
}

const TodoList = ({ title, todos, onUpdateTodo }: TodoListProps) => {
  return (
    <div className="flex flex-col items-start w-full gap-5 min-h-[500px]">
      {/* 제목 */}
      <h2>
        <Image src={`/icon/${title}.svg`} alt={title} width={102} height={36} />
      </h2>
      {/* 할 일 리스트 */}
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdateTodo={onUpdateTodo} />
      ))}
    </div>
  );
};

export default TodoList;
