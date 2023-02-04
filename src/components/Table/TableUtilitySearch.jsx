export default function TableUtilitySearching(globalFilter, setGlobalFilter) {
  return (
    <div className='w-60'>
      <label
        htmlFor='default-search'
        className='mb-2 text-sm font-medium bg-[#03001C] sr-only '>
        Search
      </label>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <svg
            aria-hidden='true'
            className='w-5 h-5 text-gray-500 dark:text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
          </svg>
        </div>
        <DebouncedInput
          type='search'
          id='default-search'
          className='block w-full p-2 pl-10 bg-[#03001C] border border-gray-300 rounded-lg  text-white text-base'
          placeholder='Search all columns'
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
        />
      </div>
    </div>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
