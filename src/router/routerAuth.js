//权限判断
import { Navigate } from 'react-router-dom'

const RouterAuth = ({children}) => {
    const token = localStorage.getItem('token')
    if(!token){
        return <Navigate to="/login" />
    }
    return (
        children
    )
}
export default RouterAuth