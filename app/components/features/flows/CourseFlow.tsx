"use client";

import api from "@api";
import { useEffect, useState } from "react";
import { NotFlow } from "./NotFlow";
import { Loader } from "@components/ui/Loader/Loader";
import styles from "./Flow.module.css";
import { FooterFlow } from "@components/layout/Footer/FooterFlow";
import { RoadMapCourseExercises } from "./RoadMapCourseExercises";
import { CourseSidebarFlow } from "./CourseSidebarFlow";
import { ExerciseCourse } from "./ExerciseCourse";

interface Props {
  id: number;
}

export function CourseFlow({ id }: Props) {
  const [flow, setFlow] = useState<CourseFlow | null>(null);
  const [loadingFlow, setLoadingFlow] = useState<boolean>(false);
  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  const [freshFlow, setFreshFlow] = useState<boolean>(false);

  const [activeExercises, setActiveExercises] = useState<
    ExerciseFlowAsideInteraface[]
  >([]);

  function updateActiveExercise(id: number) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (flow !== null) {
      const lesson_include_exercise = flow.lessons.find((lesson) => {
        if (
          lesson.exercises.findIndex((exercise) => exercise.id === id) !== -1
        ) {
          return lesson;
        }
      });
      if (lesson_include_exercise !== undefined) {
        setActiveExercises(lesson_include_exercise.exercises);
      }
    }
    setActiveExercise(id);
  }

  function refreshFlowForce() {
    setFreshFlow((prev) => !prev);
  }

  useEffect(() => {
    setLoadingFlow(true);
    api
      .get(`courses/${id}/flow`)
      .then((data) => {
        setFlow(data.data);
        if (activeExercise === null) {
          setActiveExercises(data.data.lessons[0].exercises);
          setActiveExercise(data.data.lessons[0].exercises[0].id);
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
      <CourseSidebarFlow
        refreshFlowForce={refreshFlowForce}
        updateActiveExercise={updateActiveExercise}
        activeExercise={activeExercise}
        flow={flow}
      />
      <div className={styles.flow_work_place_inner}>
        <div className={styles.flow_work_place}>
          <RoadMapCourseExercises
            flow={flow}
            activeExercises={activeExercises}
            updateActiveExercise={updateActiveExercise}
            activeExercise={activeExercise}
          />
          {activeExercise && (
            <ExerciseCourse
              flow={flow}
              refreshFlowForce={refreshFlowForce}
              activeExercises={activeExercises}
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
