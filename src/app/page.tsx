import { PlusIcon } from '@heroicons/react/16/solid';
import { Button } from './components/common/Button';
import { getTodos } from './lib/api/todos';
import Header from './components/common/Header';

export default async function Home() {
  const todos = await getTodos();

  return (
    <div className="flex flex-col items-center justify-center">
      <Header />

      <div className="flex items-center justify-center w-[1200px] h-[60px]">
        {todos.map((todo) => (
          <div key={todo.id}>{todo.name}</div>
        ))}
        <Button label="추가하기" icon={<PlusIcon width={20} height={20} />} />
      </div>
    </div>
  );
}
