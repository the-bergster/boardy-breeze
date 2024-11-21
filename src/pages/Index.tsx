import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Column from "@/components/Column";
import { toast } from "sonner";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", title: "Take out the garbage" },
    "task-2": { id: "task-2", title: "Watch my favorite show" },
    "task-3": { id: "task-3", title: "Charge my phone" },
    "task-4": { id: "task-4", title: "Cook dinner" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

const Index = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = data.columns[source.droppableId];
    const destColumn = data.columns[destination.droppableId];

    if (sourceColumn === destColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });
    } else {
      const sourceTaskIds = Array.from(sourceColumn.taskIds);
      sourceTaskIds.splice(source.index, 1);
      const newSourceColumn = {
        ...sourceColumn,
        taskIds: sourceTaskIds,
      };

      const destTaskIds = Array.from(destColumn.taskIds);
      destTaskIds.splice(destination.index, 0, draggableId);
      const newDestColumn = {
        ...destColumn,
        taskIds: destTaskIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newSourceColumn.id]: newSourceColumn,
          [newDestColumn.id]: newDestColumn,
        },
      });
    }
  };

  const handleAddTask = (columnId: string) => {
    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    const newTask = {
      id: newTaskId,
      title: `New task ${Object.keys(data.tasks).length + 1}`,
    };

    const column = data.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.push(newTaskId);

    setData({
      ...data,
      tasks: {
        ...data.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...data.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    });

    toast.success("Task added successfully!");
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Trello Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            return (
              <Column
                key={column.id}
                column={column}
                tasks={data.tasks}
                onAddTask={handleAddTask}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Index;