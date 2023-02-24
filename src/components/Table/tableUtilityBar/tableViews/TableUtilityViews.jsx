import React from 'react'
import { useDetectOutsideClick } from '../../../../utilities/customHooks/useDetectOutsideClick';

export default function TableUtilityViews({ table }) {
    // Create a ref that we add to the element for which we want to detect outside clicks
    const hiddenFields = React.useRef();
    // Call hook passing in the ref and a function to call on outside click
    const [isHiddenToggle, setIsHiddenToggle] = React.useState(false);

    useDetectOutsideClick(hiddenFields, () => setIsHiddenToggle(false));

    return (
        <div
            ref={hiddenFields}
            className='flex items-center bg-[#03001C] rounded-md text-white p-1 px-2 text-lg hover:bg-opacity-50 cursor-pointer relative '
        >
            <div
                className='flex items-center'
                onClick={() => {
                    setIsHiddenToggle(!isHiddenToggle);
                }}
            >
                <span className='material-symbols-rounded text-lg pr-1'>menu</span>
                Views
            </div>
            {isHiddenToggle && <HideFields table={table} />}
        </div>
    );
}

const HideFields = ({ table }) => {
    return (
        <div className='absolute top-[2.90rem] -left-2 z-50 bg-[#03001C] w-[300px]  p-2 rounded-md h-[calc(100vh_-_3.5rem)] overflow-y-scroll'>
            <label className='flex items-center text-base gap-4 cursor-pointer p-1 hover:bg-[#2f2a40] rounded-sm pl-2'>
                <div>Personal Views</div>
            </label>
            <label className='flex items-center text-base gap-4 cursor-pointer p-1 hover:bg-[#2f2a40] rounded-sm pl-2'>
                <div>Others Views</div>
            </label>
        </div>
    );
};

