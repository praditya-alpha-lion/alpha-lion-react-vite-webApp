import React from 'react'

export default function CustomFilterInput({ table, type, operator, value, id, removeCondition, setFilterConditions }) {
    const handleInputChange = (type, value, id) => {
        setFilterConditions((prev) => {
            return prev.map((ele) => {
                if (ele.id === id) {
                    if (type === 'type') {
                        ele.type = value;
                    } else if (type === 'operator') {
                        ele.operator = value;
                    } else if (type === 'value') {
                        ele.value = value
                    }
                }
                return ele;
            })
        })
    }
    return (
        <div className='m-2'>
            <div className='flex border my-2 border-cyan-200 rounded-lg'>
                <select
                    placeholder='Select a type'
                    value={type}
                    onChange={(e) => handleInputChange('type', e.target.value, id)}
                    className='block w-60 p-2  bg-[#03001C] border border-gray-300 rounded-tl-md rounded-bl-md outline-none appearance-none text-white text-base'>
                    {table
                        .getHeaderGroups()
                        .map((headerGroup) =>
                            headerGroup.headers.map((header, i) => (
                                <option key={i}>{header.column.id}</option>
                            ))
                        )}
                </select>
                <select
                    value={operator}
                    onChange={(e) => handleInputChange('operator', e.target.value, id)}
                    placeholder='Select a condition'
                    className='block w-60 p-2  bg-[#03001C] border border-gray-300 outline-none appearance-none text-white text-base'>
                    <option>Contains</option>
                    {/* <option>Does Not Contains</option> */}
                </select>
                <input
                    value={value}
                    onChange={(e) => handleInputChange('value', e.target.value, id)}
                    className='block w-60 p-2  bg-[#03001C] border border-gray-300  text-white text-base'
                    type='text'
                    placeholder='Enter a Value'
                />
                <div onClick={() => removeCondition(id)} className='bg-[#2f2a40] border border-gray-300 rounded-tr-md rounded-br-md flex items-center hover:bg-[#413c52]'>
                    <span className='material-symbols-rounded text-white mx-2'>
                        delete
                    </span>
                </div>
            </div>
        </div>
    )
}



