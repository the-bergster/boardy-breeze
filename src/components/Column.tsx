import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface ColumnProps {
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
  tasks: {
    [key: string]: {
      id: string;
      title: string;
    };
  };
  onAddTask: (columnId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string, newTitle: string) => void;
}

const Column = ({ column, tasks, onAddTask, onDeleteTask, onEditTask }: ColumnProps) => {
  return (
    <div className="bg-muted/50 p-4 rounded-lg w-80">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg text-gray-700">{column.title}</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAddTask(column.id)}
          className="h-8 w-8 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[200px] transition-colors ${
              snapshot.isDraggingOver ? "column-drop-active" : ""
            }`}
          >
            {column.taskIds.map((taskId, index) => (
              <TaskCard
                key={taskId}
                task={tasks[taskId]}
                index={index}
                onDelete={onDeleteTask}
                onEdit={onEditTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;