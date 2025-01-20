import { API_URL } from '.';
import { Image } from '../../types/types';

// 이미지 업로드
export const uploadImage = async (image: File): Promise<Image> => {
  // 이미지 크기 체크 (5MB 이하)
  if (image.size > 5 * 1024 * 1024) {
    throw new Error('File size must be less than 5MB');
  }
  // 이미지 업로드
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await fetch(`${API_URL}/images/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText}`,
      );
    }

    // API 응답이 { "url": "string" } 형식인지 확인
    if (!data.url) {
      throw new Error('Invalid response format');
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
