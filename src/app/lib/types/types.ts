// TODO
export type Todo = {
  id: number;
  tenantId: string;
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
};

// Pick<Type, Keys>
// 타입에서 원하는 키만 뽑아서 새로운 타입을 만들어준다.

// TODD 목록 조회
export type TodoListItem = Pick<Todo, 'id' | 'name' | 'isCompleted'>;

// 생성시 사용되는 타입
export type CreateTodoRequest = Pick<Todo, 'name'>;

// 수정시 사용되는 타입
export type UpdateTodoRequest = Pick<Todo, 'name' | 'memo' | 'imageUrl' | 'isCompleted'>;

// Image
export type Image = {
  url: string;
};
