import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const EditPermission = ({ trigger }) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit</AlertDialogTitle>
            <AlertDialogDescription>
              <Input placeholder="Name" className="mb-5" />
              <div className="mb-5">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Resources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="users">Users</SelectItem>
                    <SelectItem value="roles">Roles</SelectItem>
                    <SelectItem value="userroles">Users Roles</SelectItem>
                    <SelectItem value="permissins">Permissions</SelectItem>
                    <SelectItem value="rolepermissions">
                      Role Permissions
                    </SelectItem>
                    <SelectItem value="caregaps">Caregaps</SelectItem>
                    <SelectItem value="notes">Notes</SelectItem>
                    <SelectItem value="documents">Documents</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-5">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="users_own">Create Own</SelectItem>
                    <SelectItem value="roles_own">Read Own</SelectItem>
                    <SelectItem value="userroles_own">Update Own</SelectItem>
                    <SelectItem value="permissins_own">Delete Own</SelectItem>
                    <SelectItem value="users_any">Create Any</SelectItem>
                    <SelectItem value="roles_any">Read Any</SelectItem>
                    <SelectItem value="userroles_any">Update Any</SelectItem>
                    <SelectItem value="permissins_any">Delete Any</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-5">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Attibutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="users">All</SelectItem>
                    <SelectItem value="roles">Id</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
