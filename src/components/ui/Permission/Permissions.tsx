import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Permission = {
  id: string;
  name: string;
  resource: string;
  action: string;
  attributes: string;
  createdBy: string;
  createdOn: string;
  updatedOn: string;
};

const permissionsData: Permission[] = [
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

export const permissionColumns: ColumnDef<Permission>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "resource",
    header: "Resource",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "attributes",
    header: "Attributes",
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
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
    enableHiding: false,
    cell: ({ row }) => {
      const permission = row.original;

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
              onClick={() => navigator.clipboard.writeText(permission.id)}
            >
              Copy Permission ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function Permissions() {
  const [data, setData] = React.useState<Permission[]>(permissionsData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns: permissionColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
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
                  colSpan={permissionColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import {
//   ColumnDef,
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   getFilteredRowModel,
//   flexRender,
// } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import AddPermission from "../AddPermission";
// import ConfirmationDialog from "../ConfirmationDialog";

// const initialData: Permission[] = [
//   {
//     id: "1",
//     name: "View Users",
//     resources: ["Users"],
//     actions: ["read own", "read any"],
//   },
//   {
//     id: "2",
//     name: "Edit Users",
//     resources: ["Users"],
//     actions: ["update own", "update any"],
//   },
// ];

// export type Permission = {
//   id: string;
//   name: string;
//   resources: string[];
//   actions: string[];
// };

// export const columns: ColumnDef<Permission>[] = [
//   {
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => {
//       const permission = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem onClick={() => alert(`Edit ${permission.name}`)}>
//               Edit
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem
//               onClick={() => openDeleteConfirmation(permission.id)}
//             >
//               Delete
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
//   {
//     accessorKey: "name",
//     header: "Name",
//   },
//   {
//     accessorKey: "resources",
//     header: "Resources",
//     cell: ({ row }) => row.original.resources.join(", "),
//   },
//   {
//     accessorKey: "actions",
//     header: "Actions",
//     cell: ({ row }) => row.original.actions.join(", "),
//   },
// ];

// export function Permissions() {
//   const [data, setData] = useState<Permission[]>(initialData);
//   const [isAddPermissionOpen, setIsAddPermissionOpen] = useState(false);
//   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
//     useState(false);
//   const [permissionIdToDelete, setPermissionIdToDelete] = useState<
//     string | null
//   >(null);

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//   });

//   const handleAddPermission = (newPermission: Permission) => {
//     setData((prevData) => [...prevData, newPermission]);
//     setIsAddPermissionOpen(false);
//   };

//   const openDeleteConfirmation = (permissionId: string) => {
//     setPermissionIdToDelete(permissionId);
//     setIsDeleteConfirmationOpen(true);
//   };

//   const handleDeletePermission = () => {
//     if (permissionIdToDelete) {
//       setData((prevData) =>
//         prevData.filter((permission) => permission.id !== permissionIdToDelete)
//       );
//       setIsDeleteConfirmationOpen(false);
//       setPermissionIdToDelete(null);
//     }
//   };

//   return (
//     <div className="p-2">
//       <div className="flex justify-between items-center py-4">
//         <Input
//           placeholder="Search..."
//           value={table.getState().globalFilter ?? ""}
//           onChange={(event) => table.setGlobalFilter(event.target.value)}
//           className="max-w-sm"
//         />
//         <Button onClick={() => setIsAddPermissionOpen(true)}>ADD</Button>
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       {isAddPermissionOpen && (
//         <AddPermission
//           onAddPermission={handleAddPermission}
//           onClose={() => setIsAddPermissionOpen(false)}
//         />
//       )}
//       {isDeleteConfirmationOpen && (
//         <ConfirmationDialog
//           title="Delete Permission"
//           description="Are you sure you want to delete this permission?"
//           onConfirm={handleDeletePermission}
//           onCancel={() => setIsDeleteConfirmationOpen(false)}
//         />
//       )}
//     </div>
//   );
// }
