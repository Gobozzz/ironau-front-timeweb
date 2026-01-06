"use client";

import { Provider } from "react-redux";
import { store } from "@/app/redux/store";
import { ThemeProvider } from "@/app/theme/theme-provider";
import UserAuthLayout from "./UserAuthLayout";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <UserAuthLayout>{children}</UserAuthLayout>
      </ThemeProvider>
    </Provider>
  );
}
