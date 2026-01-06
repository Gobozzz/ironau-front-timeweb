"use client";

import { Dispatch, SetStateAction, useRef } from "react";
import { TeoreticalExercise } from "../Exercises/TeoreticalExercise";
import { TextExercise } from "../Exercises/TextExercise";
import styles from "./EditExercises.module.css";
import { ExerciseTypes } from "@enums";
import CustomSkeleton from "@/app/components/ui/CustomSkeleton/CustomSkeleton";
import { SingleChoiseExercise } from "../Exercises/SingleChoiseExercise";
import { MultipleChoiseExercise } from "../Exercises/MultipleChoiseExercise";
import { PassWordsExercise } from "../Exercises/PassWordsExercise";
import { ErrorsInput } from "@/app/components/ui/ErrorsInput/ErrorsInput";

import {
  DndContext,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Exercise } from "../Exercises/Exercise";

interface Props {
  exercises: EditExercise[];
  setExercises: Dispatch<SetStateAction<EditExercise[]>>;
  loadingExercise: boolean;
  errors: ServerErrors;
  setErrors: Dispatch<SetStateAction<ServerErrors>>;
}

export function EditExercises({
  exercises,
  setExercises,
  loadingExercise,
  errors,
  setErrors,
}: Props) {
  // Sortable
  // Сенсоры для перетаскивания
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = exercises.findIndex(
        (item) => item.id === active.id || item.tempId === active.id
      );
      const newIndex = exercises.findIndex(
        (item) => item.id === over.id || item.tempId === over.id
      );
      const newExercises = [...exercises];
      // Перестановка элементов
      const [movedItem] = newExercises.splice(oldIndex, 1);
      newExercises.splice(newIndex, 0, movedItem);
      setExercises(newExercises);
    }
  };
  // Sortable

  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  function updateExercise(idOrTempId: string | number, data: EditExercise) {
    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      setExercises((prev) =>
        prev.map((ex) => {
          if (
            (ex.id !== undefined && ex.id === idOrTempId) ||
            (ex.tempId !== undefined && ex.tempId === idOrTempId)
          ) {
            return {
              ...ex,
              ...data,
            };
          }
          return ex;
        })
      );
    }, 300);

    return () => {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current);
      }
    };
  }

  function deleteExercise(idOrTempId: string | number) {
    setExercises((prev) =>
      prev.filter((ex) => ex.tempId !== idOrTempId && ex.id !== idOrTempId)
    );
    const index = exercises.findIndex(
      (exercise) => exercise.id === idOrTempId || exercise.tempId === idOrTempId
    );
    if (index !== -1) {
      Object.keys(errors).forEach((key) => {
        if (key.startsWith(`exercises.${index}`)) {
          delete errors[key];
        }
      });
      setErrors(errors);
    }
  }

  return (
    <div className={styles.inner}>
      <ErrorsInput errors={errors.message} />
      {loadingExercise && (
        <>
          <CustomSkeleton height={320} />
          <CustomSkeleton height={320} />
          <CustomSkeleton height={320} />
        </>
      )}
      {!loadingExercise && exercises.length === 0 && (
        <div className="flex-auto h-80 flex items-center justify-center">
          <div className="font-text-medium">
            Выберите любое упражнение из меню слева
          </div>
        </div>
      )}
      {!loadingExercise && exercises.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={exercises.map((ex) => ex.id || ex.tempId || 1)}
            strategy={rectSortingStrategy}
          >
            {exercises.map((exercise, index) => (
              <Exercise key={exercise.id || exercise.tempId}>
                {(exercise.type === ExerciseTypes.TEORETICAL && (
                  <TeoreticalExercise
                    errors={errors}
                    setErrors={setErrors}
                    idOrTempId={exercise.id || exercise.tempId || ""}
                    data={exercise}
                    index={index}
                    updateExercise={updateExercise}
                    deleteExercise={deleteExercise}
                  />
                )) ||
                  (exercise.type === ExerciseTypes.TEXT && (
                    <TextExercise
                      errors={errors}
                      setErrors={setErrors}
                      idOrTempId={exercise.id || exercise.tempId || ""}
                      data={exercise}
                      index={index}
                      updateExercise={updateExercise}
                      deleteExercise={deleteExercise}
                    />
                  )) ||
                  (exercise.type === ExerciseTypes.SINGLE && (
                    <SingleChoiseExercise
                      errors={errors}
                      setErrors={setErrors}
                      idOrTempId={exercise.id || exercise.tempId || ""}
                      data={exercise}
                      index={index}
                      updateExercise={updateExercise}
                      deleteExercise={deleteExercise}
                    />
                  )) ||
                  (exercise.type === ExerciseTypes.MULTIPLE && (
                    <MultipleChoiseExercise
                      errors={errors}
                      setErrors={setErrors}
                      idOrTempId={exercise.id || exercise.tempId || ""}
                      data={exercise}
                      index={index}
                      updateExercise={updateExercise}
                      deleteExercise={deleteExercise}
                    />
                  )) ||
                  (exercise.type === ExerciseTypes.PASS_WORD && (
                    <PassWordsExercise
                      errors={errors}
                      setErrors={setErrors}
                      idOrTempId={exercise.id || exercise.tempId || ""}
                      data={exercise}
                      index={index}
                      updateExercise={updateExercise}
                      deleteExercise={deleteExercise}
                    />
                  ))}
              </Exercise>
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
