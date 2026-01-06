"use client";

import { Dialog, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import api from "@/app/api";
import { Loader } from "../../ui/Loader/Loader";
import { NewsCategoryTreeInModal } from "../../features/news/NewsCategoriesTreeInModal/NewsCategoryTreeInModal";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  close: () => void;
  selected_categories_ids: number[];
  changeSelectedCategory: (id: number) => void;
}

export function NewsCategoriesModal({
  open,
  close,
  selected_categories_ids,
  changeSelectedCategory,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<NewsCategoryShow[]>([]);

  useEffect(() => {
    setLoading(true);
    api
      .get("/news-categories/tree")
      .then((data) => setCategories(data.data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Dialog
      open={open}
      onClose={close}
      fullWidth={true}
      maxWidth={false}
      scroll="paper"
      keepMounted
      slots={{
        transition: Transition,
      }}
      sx={{
        "& .MuiDialog-container": {
          justifyContent: "center",
        },
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "280px",
          background: "var(--light-gray)",
          borderRadius: "12px",
          padding: "16px",
          overflowY: "auto",
        },
      }}
    >
      <div className="flex flex-col gap-10 items-center">
        {loading && <Loader size="base" />}
        {!loading &&
          categories.map((category) => (
            <NewsCategoryTreeInModal
              selected_categories_ids={selected_categories_ids}
              checked={selected_categories_ids.includes(category.id)}
              onChange={(id: number) => {
                changeSelectedCategory(id);
              }}
              key={category.id}
              category={category}
            />
          ))}
      </div>
    </Dialog>
  );
}
