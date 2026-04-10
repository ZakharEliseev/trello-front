import { SetStateAction } from "react";

import {
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { cardsApi } from "../../TaskCard/api";
import { TaskCardList } from "../../TaskCard/models/types";

interface Props {
  items: TaskCardList | undefined;
  setItems: React.Dispatch<SetStateAction<TaskCardList | undefined>>;
}

export const useDragEnd = ({ items, setItems }: Props) => {
  const [updateTaskCard] = cardsApi.useUpdateTaskCardMutation();
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over, delta } = event;

    if (!over || active.id === over.id || !items) return;

    const activeItem = items.find((i) => i.id === active.id);
    if (!activeItem) return;

    const overItem = items.find((i) => i.id === over.id);
    const newTableId = overItem ? overItem.table_id : Number(over.id);

    const columnItems = items
      .filter((i) => i.table_id === newTableId)
      .sort((a, b) => Number(a.position) - Number(b.position));

    const overIndex = columnItems.findIndex((i) => i.id === over.id);
    const activeIndex = columnItems.findIndex((i) => i.id === active.id);

    let targetIndex = overIndex;

    if (activeItem.table_id === newTableId) {
      if (delta.y > 0) {
        targetIndex = overIndex + 1;
      } else {
        targetIndex = overIndex;
      }

      if (activeIndex !== -1 && activeIndex < targetIndex) {
        targetIndex = targetIndex - 1;
      }
    }

    let itemsForPosition = [...columnItems];
    if (activeItem.table_id === newTableId) {
      itemsForPosition = itemsForPosition.filter((i) => i.id !== active.id);
    }

    let newPosition: number;

    if (itemsForPosition.length === 0) {
      newPosition = 1;
    } else if (targetIndex <= 0) {
      newPosition = Number(itemsForPosition[0].position) / 2;
    } else if (targetIndex >= itemsForPosition.length) {
      newPosition =
        Number(itemsForPosition[itemsForPosition.length - 1].position) + 1;
    } else {
      newPosition =
        (Number(itemsForPosition[targetIndex - 1].position) +
          Number(itemsForPosition[targetIndex].position)) /
        2;
    }

    const updatedItem = {
      ...activeItem,
      table_id: newTableId,
      position: newPosition,
    };

    const otherItems = items.filter((i) => i.id !== active.id);
    const newItems = [...otherItems, updatedItem];

    newItems.sort((a, b) => {
      if (a.table_id !== b.table_id) {
        return a.table_id - b.table_id;
      }
      return Number(a.position) - Number(b.position);
    });

    setItems(newItems);

    await updateTaskCard({
      id: Number(active.id),
      table_id: newTableId,
      position: newPosition,
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),

    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return { handleDragEnd, sensors };
};
