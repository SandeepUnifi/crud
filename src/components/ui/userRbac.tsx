import React, { useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddUser from "./AddUser";
import ConfirmationDialog from "./ConfirmationDialog";
import EditUserDetail from "./UserAction/EditUserDetail";
import AssignRoles from "./UserAction/AssignUserRole";
// import AssignRoles from "./UserAction/AssignRoles";

const initialUsers = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    username: "jdoe",
    email: "jdoe@example.com",
    phone: "123-456-7890",
    timezone: "UTC",
    createdBy: "admin",
    isDisabled: false,
    createdOn: "2024-01-01",
    updatedOn: "2024-02-01",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    username: "jsmith",
    email: "jsmith@example.com",
    phone: "123-456-7891",
    timezone: "UTC",
    createdBy: "admin",
    isDisabled: false,
    createdOn: "2024-01-05",
    updatedOn: "2024-02-05",
  },
  // Add more users if needed
];

const initialRoles = [
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

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  timezone: string;
  createdBy: string;
  isDisabled: boolean;
  createdOn: string;
  updatedOn: string;
};

export function UserRbac() {
  const [data, setData] = useState<User[]>(initialUsers);
  const [roles, setRoles] = useState(initialRoles);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [isAssignRolesOpen, setIsAssignRolesOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleAddUser = (newUser: User) => {
    setData((prevData) => [...prevData, newUser]);
    setIsAddUserOpen(false);
  };

  const handleEditUser = (updatedUser: User) => {
    setData((prevData) =>
      prevData.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsEditUserOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setIsConfirmDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setData((prevData) =>
        prevData.filter((user) => user.id !== userToDelete)
      );
      setUserToDelete(null);
    }
    setIsConfirmDialogOpen(false);
  };

  const cancelDelete = () => {
    setUserToDelete(null);
    setIsConfirmDialogOpen(false);
  };

  const handleAssignRoles = (userId: string) => {
    setSelectedUser(userId);
    setIsAssignRolesOpen(true);
  };

  const handleRoleSelection = (roleId: string) => {
    setSelectedRoles((prevSelected) =>
      prevSelected.includes(roleId)
        ? prevSelected.filter((id) => id !== roleId)
        : [...prevSelected, roleId]
    );
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "timezone",
      header: "Timezone",
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
    },
    {
      accessorKey: "isDisabled",
      header: "Status",
      cell: ({ row }) => (row.original.isDisabled ? "Disabled" : "Active"),
    },
    {
      accessorKey: "createdOn",
      header: "Created On",
    },
    {
      accessorKey: "updatedOn",
      header: "Updated On",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setUserToEdit(user);
                  setIsEditUserOpen(true);
                }}
              >
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => alert(`Edit Password for ${user.id}`)}
              >
                Edit Password
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAssignRoles(user.id)}>
                Assign Roles
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteUser(user.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-2">
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Search..."
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setIsAddUserOpen(true)}>ADD</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {isAddUserOpen && (
        <AddUser
          onAddUser={handleAddUser}
          onClose={() => setIsAddUserOpen(false)}
        />
      )}
      {isEditUserOpen && userToEdit && (
        <EditUserDetail
          onClose={() => setIsEditUserOpen(false)}
          initialData={userToEdit}
        />
      )}
      {isConfirmDialogOpen && (
        <ConfirmationDialog
          isOpen={isConfirmDialogOpen}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          message="Please confirm to delete the record."
        />
      )}
      {isAssignRolesOpen && selectedUser && (
        <AssignRoles
          roles={roles}
          selectedRoles={selectedRoles}
          onRoleSelect={handleRoleSelection}
          onClose={() => setIsAssignRolesOpen(false)}
        />
      )}
    </div>
  );
}
