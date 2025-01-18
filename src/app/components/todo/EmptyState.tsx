import Image from 'next/image';

interface EmptyStateProps {
  type: 'Todo' | 'Done';
}

const EmptyState = ({ type }: EmptyStateProps) => {
  const messages = {
    Todo: {
      text: '할 일이 없어요.\nTODO를 새롭게 추가해주세요!',
      image: '/empty/TodoEmpty.svg',
    },
    Done: {
      text: '아직 완료된 일이 없어요.\n할 일을 체크해보세요!',
      image: '/empty/DoneEmpty.svg',
    },
  };

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center">
      <div className="relative h-[120px] w-[120px] md:h-[240px] md:w-[240px]">
        <Image
          src={messages[type].image}
          alt={`empty-${type.toLowerCase()}`}
          fill
          className="object-contain"
        />
      </div>
      <span className="whitespace-pre-line text-center font-bold text-slate-400">
        {messages[type].text}
      </span>
    </div>
  );
};

export default EmptyState;
