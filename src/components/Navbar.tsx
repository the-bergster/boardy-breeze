import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Plus, Tag } from "lucide-react";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

export interface LabelType {
  id: string;
  name: string;
  color: string;
}

interface NavbarProps {
  labels: LabelType[];
  onAddLabel: (label: LabelType) => void;
}

const Navbar = ({ labels, onAddLabel }: NavbarProps) => {
  const [newLabelName, setNewLabelName] = useState("");
  const [newLabelColor, setNewLabelColor] = useState("#9b87f5");

  const handleAddLabel = () => {
    if (!newLabelName.trim()) {
      toast.error("Please enter a label name");
      return;
    }

    const newLabel: LabelType = {
      id: crypto.randomUUID(),
      name: newLabelName,
      color: newLabelColor,
    };

    onAddLabel(newLabel);
    setNewLabelName("");
    toast.success("Label added successfully!");
  };

  return (
    <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-900">Boardy Breeze</h1>
      <div className="flex items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Tag className="h-4 w-4" />
              Manage Labels
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage Labels</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Current Labels</Label>
                <div className="flex flex-wrap gap-2">
                  {labels.map((label) => (
                    <Badge
                      key={label.id}
                      style={{ backgroundColor: label.color }}
                      className="text-white"
                    >
                      {label.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="labelName">New Label Name</Label>
                <Input
                  id="labelName"
                  value={newLabelName}
                  onChange={(e) => setNewLabelName(e.target.value)}
                  placeholder="Enter label name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="labelColor">Label Color</Label>
                <Input
                  id="labelColor"
                  type="color"
                  value={newLabelColor}
                  onChange={(e) => setNewLabelColor(e.target.value)}
                  className="h-10 p-1"
                />
              </div>
              <Button onClick={handleAddLabel} className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add Label
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};

export default Navbar;