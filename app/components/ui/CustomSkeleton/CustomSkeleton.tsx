"use client";

import { Skeleton } from "@mui/material";

const CustomSkeleton = ({ ...props }) => (
  <Skeleton
    {...props}
    sx={{
      background: props.color || "var(--color-sceleton)",
    }}
  />
);

export default CustomSkeleton;
