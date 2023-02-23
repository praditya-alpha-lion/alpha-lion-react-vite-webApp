import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleAddViews } from '../../store/features/viewsSlice';

export default function HandelViewsUpdate({ table, rowHeight }) {
    const dispatch = useDispatch();
    useEffect(() => {
        let data = "Hello"
        dispatch(handleAddViews({ view: "driver", data: [data, rowHeight] }))
    })
    return <div>Hello</div>
}
