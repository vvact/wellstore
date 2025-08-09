"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store";
import CategoriesInitializer from "@/components/CategoriesInitializer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CategoriesInitializer />
      {children}
    </Provider>
  );
}
