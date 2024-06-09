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
  

  export function getRandomColorDarkColor() {
    // Generate random values for red, green, and blue
    var r = Math.floor(Math.random() * 256); // Random value between 0 and 255
    var g = Math.floor(Math.random() * 256); // Random value between 0 and 255
    var b = Math.floor(Math.random() * 256); // Random value between 0 and 255
  
    // Convert RGB to a hexadecimal color representation
    var hexColor = '#' + r.toString(16) + g.toString(16) + b.toString(16);
  
    return hexColor;
  }
  