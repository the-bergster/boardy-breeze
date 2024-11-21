import { Draggable } from "@hello-pangea/dnd";
import { Pencil, Plus, Tag, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";
import { Badge } from "./ui/badge";
import type { LabelType } from "./Navbar";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    labels?: string[];
  };
  index: number;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, newTitle: string) => void;
  labels: LabelType[];
  onAddLabelToTask: (taskId: string, labelId: string) => void;
}

const TaskCard = ({ task, index, onDelete, onEdit, labels, onAddLabelToTask }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [isAddingLabel, setIsAddingLabel] = useState(false);

  const handleEdit = () => {
    onEdit(task.id, editedTitle);
    setIsEditing(false);
  };

  const taskLabels = task.labels || [];

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="task-card bg-white p-4 rounded-lg shadow-sm mb-3 group relative"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-800">{task.title}</h3>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Dialog open={isAddingLabel} onOpenChange={setIsAddingLabel}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Tag className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Label to Task</DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-wrap gap-2">
                        {labels.map((label) => (
                          <Button
                            key={label.id}
                            variant="outline"
                            style={{ 
                              backgroundColor: taskLabels.includes(label.id) ? label.color : 'transparent',
                              color: taskLabels.includes(label.id) ? 'white' : 'inherit',
                              borderColor: label.color
                            }}
                            onClick={() => {
                              onAddLabelToTask(task.id, label.id);
                              setIsAddingLabel(false);
                            }}
                          >
                            {label.name}
                          </Button>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:text-destructive"
                    onClick={() => onDelete(task.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {taskLabels.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {taskLabels.map((labelId) => {
                    const label = labels.find((l) => l.id === labelId);
                    if (!label) return null;
                    return (
                      <Badge
                        key={label.id}
                        style={{ backgroundColor: label.color }}
                        className="text-white text-xs"
                      >
                        {label.name}
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </Draggable>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Task title"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskCard;