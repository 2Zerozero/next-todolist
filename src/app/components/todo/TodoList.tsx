import React from 'react';
import TodoItem from './TodoItem';
import { TodoListItem, UpdateTodoRequest } from '@/app/lib/types/types';
import Image from 'next/image';
import EmptyState from './EmptyState';

// Type
interface TodoListProps {
  title: 'Todo' | 'Done';
  todos: TodoListItem[]; // 배열로 받아온다.
  onUpdateTodo: (todo: UpdateTodoRequest) => Promise<void>;
}

const TodoList = ({ title, todos, onUpdateTodo }: TodoListProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-5">
      {/* 제목 */}
      <h2 className="flex h-10 items-center justify-center gap-2">
        <Image src={`/icon/${title}.svg`} alt={title} width={100} height={36} />
      </h2>
      {/* 할 일 리스트 */}
      <div className="flex w-full flex-col items-center justify-center gap-5">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onUpdateTodo={onUpdateTodo} />
          ))
        ) : (
          <EmptyState type={title} />
        )}
      </div>
    </div>
  );
};

export default TodoList;
