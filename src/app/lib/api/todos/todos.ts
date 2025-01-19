import { API_URL } from '.';
import {
  CreateTodoRequest,
  Todo,
  TodoListItem,
  UpdateTodoRequest,
} from '../../types/types';

// Todo 생성
export const createTodo = async (
  request: CreateTodoRequest,
): Promise<TodoListItem> => {
  try {
    const response = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText}`,
      );
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Todo 수정
export const updateTodo = async (
  request: UpdateTodoRequest,
): Promise<UpdateTodoRequest> => {
  try {
    const { id, ...updateData } = request; // id를 분리
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData), // id를 제외한 데이터만 전송
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText}`,
      );
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Todo 목록 조회
export const getTodos = async (): Promise<TodoListItem[]> => {
  try {
    const response = await fetch(`${API_URL}/items`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText}`,
      );
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Todo 상세 목록 조회
export const getTodo = async (itemId: number): Promise<Todo> => {
  try {
    const response = await fetch(`${API_URL}/items/${itemId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText}`,
      );
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Todo 항목 삭제
export const deleteTodo = async (itemId: number) => {
  try {
  } catch (error) {
    console.error(error);
    throw error;
  }
};
