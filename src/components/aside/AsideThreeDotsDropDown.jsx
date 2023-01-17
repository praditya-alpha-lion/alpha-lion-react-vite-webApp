// import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFilterChange } from "../../store/features/globalStateManagementSlice";

export default function AsideThreeDotsDropDown() {
  const filter = useSelector((state) => state.globalStateManagement.filter);
  const dispatch = useDispatch();

  return (
    <div className='z-10 relative'>
      {/* <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex w-full items-center justify-center rounded-full p-2 bg-black bg-opacity-20 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {
                filter.map((element) => {
                  return (
                    <div key={element.name} className="w-full flex items-center rounded-md px-2 py-2 text-sm justify-between">
                      <div className="">
                        {element.name}
                      </div>
                      <label className="inline-flex relative items-center cursor-pointer">
                        <input type="checkbox" defaultValue="" className="sr-only peer" onChange={(e) => dispatch(handleFilterChange(element))} checked={element.isSelected} />
                        <div className="w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                      </label>
                    </div>
                  )
                })
              }
            </div>
          </Menu.Items >
        </Transition >
      </Menu > */}
    </div>
  );
}
