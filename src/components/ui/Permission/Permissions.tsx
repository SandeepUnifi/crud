import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CiEdit } from "react-icons/ci";

import { MdDeleteOutline } from "react-icons/md";

import { useState } from "react";
import { Alert } from "../AlertDialogue/AlertDialogue";
import { EditPermission } from "./EditPermission";

const permissionsData = [
  {
    id: "1",
    name: "Admin Access",
    resource: "User Management",
    action: "Create",
    attributes: "*",
    createdBy: "admin",
    createdOn: "2023-01-01",
    updatedOn: "2023-01-10",
  },
  {
    id: "2",
    name: "Editor Access",
    resource: "Content Management",
    action: "Edit",
    attributes: "*",
    createdBy: "editor",
    createdOn: "2023-01-02",
    updatedOn: "2023-01-11",
  },
];

export const Permissions = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const handleAlertDialog = (id) => {
    setIsAlertOpen((p) => !p);
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Actions</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Resource</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Attributes</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Created on</TableHead>
            <TableHead>Updated on</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissionsData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex space-x-2">
                  <EditPermission
                    trigger={<CiEdit className="text-sky-500 h-6 w-6" />}
                  />
                  <Alert
                    trigger={
                      <MdDeleteOutline
                        className="text-red-500 h-6 w-6"
                        onClick={() => handleAlertDialog(item.id)}
                      />
                    }
                  />
                </div>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.resource}</TableCell>
              <TableCell>{item.action}</TableCell>
              <TableCell>{item.attributes}</TableCell>
              <TableCell>{item.createdBy}</TableCell>
              <TableCell>{item.createdOn}</TableCell>
              <TableCell>{item.updatedOn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
