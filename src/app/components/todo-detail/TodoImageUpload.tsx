'use client';

import React, { useRef, useState, useEffect } from 'react';
import ImageButton from './ImageButton';
import Image from 'next/image';
import { PencilIcon, PlusIcon } from '@heroicons/react/16/solid';
import { uploadImage } from '@/app/lib/api/todos';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface TodoImageUploadProps {
  todoId: number;
  initialImageUrl?: string;
  onImageUrlChange: (url: string | undefined) => void;
}

const TodoImageUpload = ({
  todoId,
  initialImageUrl,
  onImageUrlChange,
}: TodoImageUploadProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // imageUrl이 변경될 때마다 부모에게 알림
  useEffect(() => {
    onImageUrlChange(imageUrl);
  }, [imageUrl, onImageUrlChange]);

  // Mutation
  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const imageData = await uploadImage(file);
      return imageData;
    },
    onSuccess: (data) => {
      setImageUrl(data.url);
      queryClient.invalidateQueries({ queryKey: ['todo', todoId] });
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadImageMutation.mutateAsync(file);
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  console.log(imageUrl);
  return (
    <div className="relative flex h-[312px] w-[384px] items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        id="imageUpload"
      />

      {imageUrl ? (
        <div className="relative h-full w-full">
          <Image
            src={imageUrl}
            alt="업로드된 이미지"
            fill
            className="rounded-3xl object-cover"
            unoptimized
          />
        </div>
      ) : (
        <Image
          src="/icon/ImageDefault.svg"
          alt="이미지 업로드"
          width={64}
          height={64}
        />
      )}

      <label
        htmlFor="imageUpload"
        className="absolute bottom-4 right-4 cursor-pointer"
      >
        <ImageButton
          icon={imageUrl ? <PencilIcon /> : <PlusIcon />}
          variant={imageUrl ? 'black' : 'white'}
          onClick={handleButtonClick}
        />
      </label>
    </div>
  );
};

export default TodoImageUpload;
