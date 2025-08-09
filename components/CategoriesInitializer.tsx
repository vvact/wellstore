"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "@/features/categorySlice";
import type { AppDispatch } from "@/lib/store";

export default function CategoriesInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return null;
}
