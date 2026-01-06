import type { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren<unknown>) {
  return <div className="max-w-[1780px] mx-auto px-2.5 pt-15">{children}</div>;
}
