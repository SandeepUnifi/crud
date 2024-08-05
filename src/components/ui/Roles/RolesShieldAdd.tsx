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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";

const dummyData = [
  {
    Actions: false,
    Name: "Sk",
    Resource: "caregaps",
    Action: "create:any",
    attributes: "*",
  },
  {
    Actions: false,
    Name: "NK",
    Resource: "admin",
    Action: "delete:any",
    attributes: "All",
  },
  {
    Actions: false,
    Name: "VK",
    Resource: "user",
    Action: "read:any",
    attributes: "one",
  },
];

{
  /* <FaPlusCircle /> */
  //   <FaMinusCircle />
}
export const RolesShieldAdd = ({ trigger }) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add</AlertDialogTitle>
            <AlertDialogDescription>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Actions</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Attributes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyData.map((item) => (
                    <TableRow>
                      <TableCell>
                        {item.Actions ? <FaMinusCircle /> : <FaPlusCircle />}
                      </TableCell>
                      <TableCell>{item.Name}</TableCell>
                      <TableCell>{item.Resource}</TableCell>
                      <TableCell>{item.Action}</TableCell>
                      <TableCell>{item.attributes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
