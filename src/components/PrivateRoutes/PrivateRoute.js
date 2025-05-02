import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
    // const isLoggedIn = localStorage.getItem('isLoggedIn') === "true";
    // const user = JSON.parse(localStorage.getItem('user'));

    // console.log("User:", user);


    // return isLoggedIn ? <Component /> : <Navigate to="/login" />
    const { keycloak } = useKeycloak();

 const isLoggedIn = keycloak.authenticated;

 return isLoggedIn ? children : <Navigate to='/login' />;
}
export default PrivateRoute


