import { Draggable } from "@hello-pangea/dnd";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
  };
  index: number;
}

const TaskCard = ({ task, index }: TaskCardProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task-card bg-white p-4 rounded-lg shadow-sm mb-3"
        >
          <h3 className="text-sm font-medium text-gray-800">{task.title}</h3>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;