import { Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';

function PrivateRoute({ children }) {

    const cookies = new Cookies();
    const isLoggedIn = cookies.get('isloggedin');

    if (isLoggedIn == 'false') {
        return <Navigate to="/login"/>
    }

    return children;
}

export { PrivateRoute };