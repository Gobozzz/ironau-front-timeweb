"use client";

interface Props {}

export function NotFlow({}: Props) {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center text-center select-none">
      Учебный материал не найден или находится на модерации, попробуйте позже
    </div>
  );
}
