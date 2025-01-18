import { PlusIcon } from '@heroicons/react/16/solid';
import { Button } from './components/common/Button';
import { getTodos } from './lib/api/todos';

export default async function Home() {
  const todos = await getTodos();

  return (
    <div>
      <h1>Todo List</h1>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.name}</div>
      ))}
      <Button label="추가하기" icon={<PlusIcon width={20} height={20} />} />
    </div>
  );
}
