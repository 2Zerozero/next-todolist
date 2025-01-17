import { API_URL } from '.';
import { CreateTodoRequest, TodoListItem } from '../../types/types';

// Todo 목록 조회
export const getTodos = async (): Promise<CreateTodoRequest[]> => {
  try {
    const response = await fetch(`${API_URL}/items`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Todo 상세 목록 조회
export const getTodo = async (itemId: number): Promise<TodoListItem> => {
  try {
    const response = await fetch(`${API_URL}/items/${itemId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
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
