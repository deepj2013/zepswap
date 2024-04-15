import { ToggleRightIcon } from "lucide-react";
import { useState } from "react";
import CategoryList from "./CategoryList";
import DashboardDetails from "./DashboardDetails";
const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [activetab, setActiveTab] = useState(1)
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" ,tab:1},
    { title: "Add Category", src: "Chart_fill",tab:2 },
    { title: "Add Subcatecory", src: "Chat",tab:3 },
    { title: "Add Product", src: "User",tab:4 },

  ];


  const renderComponent={
    1:<DashboardDetails/>,
    2:<CategoryList/>,
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={` ${
          open ? "w-52" : "w-20 "
        }  h-screen p-5  pt-8 relative duration-300 bg-background`}
      >
      

        <button onClick={() => setOpen(!open)}  >
        <ToggleRightIcon  className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}/>
        </button>
    
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
                onClick={()=>{
                    setActiveTab(Menu.tab)
                }}
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer font-semibold hover:bg-light-white text-gray-300 text20 items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <div>
              {renderComponent[activetab]}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;