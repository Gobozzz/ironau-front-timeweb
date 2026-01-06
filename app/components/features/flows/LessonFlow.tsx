"use client";

import api from "@api";
import { useEffect, useState } from "react";
import { NotFlow } from "./NotFlow";
import { Loader } from "@components/ui/Loader/Loader";
import styles from "./Flow.module.css";
import { LessonSidebarFlow } from "./LessonSidebarFlow";
import { FooterFlow } from "@components/layout/Footer/FooterFlow";
import { RoadMapExercises } from "./RoadMapExercises";
import { ExerciseLesson } from "./ExerciseLesson";

interface Props {
  id: number;
}

export function LessonFlow({ id }: Props) {
  const [flow, setFlow] = useState<LessonFlow | null>(null);
  const [loadingFlow, setLoadingFlow] = useState<boolean>(false);
  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  const [freshFlow, setFreshFlow] = useState<boolean>(false);

  function updateActiveExercise(id: number) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveExercise(id);
  }

  function refreshFlowForce() {
    setFreshFlow((prev) => !prev);
  }

  useEffect(() => {
    setLoadingFlow(true);
    api
      .get(`lessons/${id}/flow`)
      .then((data) => {
        setFlow(data.data);
        if (activeExercise === null) {
          setActiveExercise(data.data.exercises[0].id);
        }
      })
      .finally(() => {
        setLoadingFlow(false);
      });
  }, [freshFlow]);

  if (flow === null && loadingFlow) {
    return (
      <div className="w-full flex items-center h-[80vh] justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (flow === null) {
    return <NotFlow />;
  }

  return (
    <div className={styles.flow_inner}>
      <LessonSidebarFlow
        refreshFlowForce={refreshFlowForce}
        updateActiveExercise={updateActiveExercise}
        activeExercise={activeExercise}
        flow={flow}
      />
      <div className={styles.flow_work_place_inner}>
        <div className={styles.flow_work_place}>
          <RoadMapExercises
            exercises={flow.exercises}
            updateActiveExercise={updateActiveExercise}
            activeExercise={activeExercise}
          />
          {activeExercise && (
            <ExerciseLesson
              refreshFlowForce={refreshFlowForce}
              exercises={flow.exercises}
              activeExercise={activeExercise}
              id={activeExercise}
              updateActiveExercise={updateActiveExercise}
            />
          )}
        </div>
        <FooterFlow />
      </div>
    </div>
  );
}
