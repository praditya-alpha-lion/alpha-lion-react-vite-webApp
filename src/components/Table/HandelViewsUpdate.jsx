import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleAddViews } from '../../store/features/viewsSlice';

export default function HandelViewsUpdate({ table, rowHeight }) {
    // useEffect(() => {
    //     console.log(table.getState(), rowHeight)
    // }, [])
    const updatedViewsData = [table.getState(), rowHeight]
    const dispatch = useDispatch();

    return (

        <div onLoad={() => {
            // dispatch(handleAddViews({ view: "driver", data: updatedViewsData }))
        }

        }>

        </div>
    )
}
