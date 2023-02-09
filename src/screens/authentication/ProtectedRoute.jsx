import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import PageNotFound from '../PageNotFound'

const ProtectedRoute = () => {
    const { userInfo } = useSelector((state) => state.auth)
    // show unauthorized screen if no user is found in redux store
    if (!userInfo) {
        return (
            < PageNotFound />
        )
    }
    // returns child route elements
    return <Outlet />
}
export default ProtectedRoute