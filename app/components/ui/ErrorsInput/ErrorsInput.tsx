"use client";

interface Props {
  className?: string;
  errors: string[] | undefined;
}

export function ErrorsInput({ className = "", errors }: Props) {
  if (errors === undefined) {
    return <></>;
  }
  return (
    <div data-error-input className={`flex flex-col gap-1 my-1 ${className}`}>
      {errors.map((error, index) => (
        <div
          key={index}
          className="text-sm text-red-600! max-[1200px]:text-[12px]"
        >
          {error}
        </div>
      ))}
    </div>
  );
}
