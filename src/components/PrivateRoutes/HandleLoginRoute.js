import { Navigate } from "react-router-dom";

const HandleLoginRoute = ({ Component }) => {
    const user = JSON.parse(localStorage.getItem('isLoggedIn'))
    console.log("User", user);

    return user ? <Navigate to="/projects" /> : <Component />
}
export default HandleLoginRoute;