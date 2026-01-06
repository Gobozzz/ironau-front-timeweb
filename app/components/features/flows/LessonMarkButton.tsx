"use client";

import { useState } from "react";
import { LessonMarkModal } from "@components/modals/Flow/LessonMarkModal";
import styles from "./Flow.module.css";

interface Props {
  flow: LessonFlow;
  refreshFlowForce: () => void;
}

export function LessonMarkButton({ flow, refreshFlowForce }: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <LessonMarkModal
        isModalOpen={openModal}
        handleClose={() => setOpenModal(false)}
        id={flow.lesson.id}
        refreshFlowForce={refreshFlowForce}
      />
      <button
        onClick={() => setOpenModal(true)}
        className={styles.sidebar_mark_button}
      >
        Оценить урок
      </button>
    </>
  );
}
