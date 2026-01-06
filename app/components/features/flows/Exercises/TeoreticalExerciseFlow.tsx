"use client";

import api from "@api";
import { EditorShow } from "@components/shared/Editor/EditorShow/EditorShow";
import { useEffect } from "react";

interface Props {
  exercise: ExerciseFlow;
  refreshFlowForce: () => void;
  courseId?: number | null;
}

export function TeoreticalExerciseFlow({
  exercise,
  refreshFlowForce,
  courseId = null,
}: Props) {
  useEffect(() => {
    if (!exercise.is_complete) {
      api
        .post(
          `/exercises/execute/${exercise.id}${courseId !== null ? `/${courseId}` : ''}`,
          {
            answer: "answer_teoretical",
          }
        )
        .then((data) => refreshFlowForce());
    }
  }, []);

  return (
    <div>
      <EditorShow blocks={exercise.content.blocks} />
    </div>
  );
}
