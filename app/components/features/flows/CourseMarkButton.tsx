"use client";

import { useState } from "react";
import styles from "./Flow.module.css";
import { CourseMarkModal } from "@components/modals/Flow/CourseMarkModal";

interface Props {
  flow: CourseFlow;
  refreshFlowForce: () => void;
}

export function CourseMarkButton({ flow, refreshFlowForce }: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <CourseMarkModal
        isModalOpen={openModal}
        handleClose={() => setOpenModal(false)}
        id={flow.course.id}
        refreshFlowForce={refreshFlowForce}
      />
      <button
        onClick={() => setOpenModal(true)}
        className={styles.sidebar_mark_button}
      >
        Оценить курс
      </button>
    </>
  );
}
