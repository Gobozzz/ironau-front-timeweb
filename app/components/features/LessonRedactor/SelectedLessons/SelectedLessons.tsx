"use client";

import styles from "./SelectedLessons.module.css";

import {
  DndContext,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { SelectedLesson } from "./SelectedLesson";

interface Props {
  selectedLessons: SelectedLessonRedactor[];
  isSelectedMode: boolean;
  setSelectedLessons: React.Dispatch<
    React.SetStateAction<SelectedLessonRedactor[]>
  >;
}

export function SelectedLessons({
  selectedLessons,
  isSelectedMode,
  setSelectedLessons,
}: Props) {
  if (!isSelectedMode) {
    return null;
  }

  // Sortable
  // Сенсоры для перетаскивания
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = selectedLessons.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = selectedLessons.findIndex((item) => item.id === over.id);
      const newSelectedLessons = [...selectedLessons];
      // Перестановка элементов
      const [movedItem] = newSelectedLessons.splice(oldIndex, 1);
      newSelectedLessons.splice(newIndex, 0, movedItem);
      setSelectedLessons(newSelectedLessons);
    }
  };

  // Sortable

  return (
    <div className={styles.inner}>
      <div className={styles.title_inner}>
        <div className={styles.count}>{selectedLessons.length}</div>
        <div className={styles.title}>Уроков выбрано</div>
      </div>
      <div className={styles.items}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={selectedLessons.map((sel) => sel.id)}
            strategy={rectSortingStrategy}
          >
            {selectedLessons.map((item, index) => (
              <SelectedLesson
                setSelectedLessons={setSelectedLessons}
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
