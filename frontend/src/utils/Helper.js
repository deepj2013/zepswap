import { toast } from "react-toastify"

export const errorToast=(msg)=>{
    return toast.error(msg,{
      autoClose:1000
    })
  }
  
  export const sucessToast=(msg)=>{
    return toast.success(msg,{
      autoClose:1000
    })
  }