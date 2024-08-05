import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import "./AssignUserRole.module.css";

type Role = {
  id: string;
  name: string;
  description: string;
};

const initialRoles: Role[] = [
  {
    id: "1",
    name: "Access Control",
    description: "Having complete access",
  },
  {
    id: "2",
    name: "Editor",
    description: "Can edit content",
  },
  {
    id: "3",
    name: "Viewer",
    description: "Can view content",
  },
  {
    id: "4",
    name: "Moderator",
    description: "Can moderate content",
  },
];

interface AssignRolesProps {
  roles: Role[];
  selectedRoles: string[];
  onRoleSelect: (roleId: string) => void;
  onClose: () => void;
}

const AssignRoles: React.FC<AssignRolesProps> = ({
  roles = initialRoles,
  selectedRoles,
  onRoleSelect,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal modal-z-index">
      <div className="modal-content ">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-xl font-semibold">ADD</h1>
          <input
            type="text"
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded max-w-sm"
          />
        </div>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.length ? (
                filteredRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <Button
                        variant="ghost"
                        onClick={() => onRoleSelect(role.id)}
                      >
                        {selectedRoles.includes(role.id) ? (
                          <Minus className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No roles found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignRoles;
