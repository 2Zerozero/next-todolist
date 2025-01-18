import { getTodos } from '@/app/lib/api/todos';
import React from 'react';

const TodoTemplate = async () => {
  const todos = await getTodos();
  return (
    <div className="flex items-center justify-center w-[1200px]">
      {/* 투두 생성 */}

      {/* 투두 리스트 */}
      <div className="flex flex-col items-center justify-center w-full h-full">
        {todos.map((todo) => (
          <div key={todo.id}>{todo.name}</div>
        ))}
      </div>
    </div>
  );
};

export default TodoTemplate;
