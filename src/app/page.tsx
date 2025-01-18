import Header from './components/common/Header';
import TodoTemplate from './components/todo/TodoTemplate';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Header />

      <TodoTemplate />
    </div>
  );
}
