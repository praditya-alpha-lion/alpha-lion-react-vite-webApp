import React from 'react';
import { useDetectOutsideClick } from '../../../utilities/customHooks/useDetectOutsideClick';
import Switch from '../../utilities/Switch';

export default function TableUtilityHideFields({ table }) {
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
          // dispatch(handleAddViews({ view: "driver", data: table.getState() }))
        }}
      >
        <span className='material-symbols-rounded text-lg pr-1'>
          visibility_off
        </span>
        Hide Fields
      </div>
      {isHiddenToggle && <HideFields table={table} />}
    </div>
  );
}

const HideFields = ({ table }) => {
  return (
    <div className='absolute top-10 left-0 z-50 bg-[#03001C] w-[300px]  p-2 rounded-md max-h-96 overflow-y-scroll'>
      <label className='flex items-center text-base gap-4 cursor-pointer p-1 hover:bg-[#2f2a40] rounded-sm pl-2'>
        <Switch
          isOn={table.getIsAllColumnsVisible()}
          onColor='#1ec933'
          handleToggle={table.getToggleAllColumnsVisibilityHandler()}
          size='small'
        />
        <div>Toggle All</div>
      </label>

      {table.getAllLeafColumns().map((column, i) => {
        return (
          <label
            key={i}
            className='flex items-center text-base gap-4 p-1 hover:bg-[#2f2a40] rounded-sm pl-2 cursor-pointer w-full'
          >
            <Switch
              isOn={column.getIsVisible()}
              onColor='#1ec933'
              size='small'
              handleToggle={column.getToggleVisibilityHandler()}
            />
            <div className='capitalize truncate'>{column.id}</div>
          </label>
        );
      })}
    </div>
  );
};
