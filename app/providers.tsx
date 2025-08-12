"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store";
import CategoriesInitializer from "@/components/CategoriesInitializer";
import AuthInitializer from "@/components/AuthInitializer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CategoriesInitializer />
       <AuthInitializer />
      {children}
    </Provider>
  );
}
