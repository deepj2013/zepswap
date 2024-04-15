import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import AddCategoryForm from "../AddCategoryForm";
 
export function AddCategory({open,handleOpen}) {

 
  return (
        <div className="fixed h-screen right-0 w-screen top-0 bg-background/80 flex justify-center flex-col items-center">
            <AddCategoryForm handleOpen={handleOpen}/>
        </div>
  );
}