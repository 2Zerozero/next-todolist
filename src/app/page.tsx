import { getTodos } from './lib/api/todos';

export default async function Home() {
  const todos = await getTodos();

  return (
    <div>
      <h1>Todo List</h1>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.name}</div>
      ))}
    </div>
  );
}
