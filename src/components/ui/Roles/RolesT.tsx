import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CiEdit } from "react-icons/ci";
import { TbShieldPlus } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { Alert } from "../AlertDialogue/AlertDialogue";
import { useState } from "react";
import { EditRole } from "./EditRole";
import { RolesShieldAdd } from "./RolesShieldAdd";

const initialData = [
  {
    id: "1",
    name: "Admin",
    description: "Administrator role",
    isDisabled: false,
    createdBy: "admin",
    createdOn: "2023-01-01",
    updatedOn: "2023-01-10",
  },
  {
    id: "2",
    name: "Editor",
    description: "Editor role",
    isDisabled: false,
    createdBy: "admin",
    createdOn: "2023-01-02",
    updatedOn: "2023-01-11",
  },
];

export const Rolet = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const handleAlertDialog = (id) => {
    setIsAlertOpen((p) => !p);
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Action</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>isDisabled</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Created on</TableHead>
            <TableHead>Updated on</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex space-x-2">
                  <RolesShieldAdd
                    trigger={
                      <TbShieldPlus className="text-green-500 h-6 w-6" />
                    }
                  />

                  <EditRole
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
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.isDisabled ? "Yes" : "No"}</TableCell>
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
