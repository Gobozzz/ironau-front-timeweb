"use client";

import React, { useEffect } from "react";
import styles from "./Interesting.module.css";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchInteresting } from "@slices/interestingSlice";
import CustomSkeleton from "@components/ui/CustomSkeleton/CustomSkeleton";

interface Props {
  className?: string;
}

export function Interesting({ className = "" }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isLoading } = useSelector(
    (state: RootState) => state.interesting
  );

  useEffect(() => {
    if (items.length === 0 && !isLoading) {
      dispatch(fetchInteresting());
    }
  }, [items, isLoading, dispatch]);

  return (
    <section className={`${className} ${styles.wrapper}`}>
      <h3 className={styles.title}>Интересное</h3>
      <div className={styles.items}>
        {isLoading && (
          <>
            <CustomSkeleton height={50} />
            <CustomSkeleton height={50} />
            <CustomSkeleton height={50} />
          </>
        )}
        {!isLoading &&
          items.map((item, index) => (
            <p key={index} className={styles.item}>
              {item.content.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          ))}
      </div>
    </section>
  );
}
