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

  export const calculateROI=(roi,time,maturity,amount)=>{
    let roiAmount=roi*time/100
    let maturityAmount= amount*maturity/100
    let total = amount+roiAmount+maturityAmount
    return Math.floor(total)

  }


  const colors = [
    '#ECF8EF',
    '#F9F3E3',
    '#EBEEFC',
    '#EEF9FD',
    '#EBE7FF'
  ];
  
  export const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  
