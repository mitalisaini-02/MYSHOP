import React from 'react'
import { NavLink } from 'react-router-dom';
import { CgAdd } from "react-icons/cg";
import { FaRegListAlt } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
const Sidebar = () => {
    return (
        <div className='min-h-screen border-r-2 w-[18%]'>
            <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
                <NavLink to="/add" className="flex items-center gap-2 p-2 border-r-0 border border-gray-700 rounded-l">
                    <CgAdd className='w-[max(10%,80px)]' />
                    <p className='hidden md:block'>Add item</p>

                </NavLink>
                <NavLink to="/list" className="flex items-center gap-2 p-2 border-r-0 border border-gray-700 rounded-l">
                    <GoChecklist className='w-[max(10%,80px)]' />
                    <p className='hidden md:block'>List item</p>

                </NavLink>
                <NavLink to="/order" className="flex items-center gap-2 p-2 border-r-0 border border-gray-700 rounded-l">
                    <FaRegListAlt className='w-[max(10%,80px)]' />
                    <p className='hidden md:block'>orders</p>

                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
