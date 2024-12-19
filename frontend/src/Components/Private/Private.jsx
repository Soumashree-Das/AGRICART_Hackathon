import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

export default function Private({ component: Component }) {
    const loggedData = useContext(UserContext);

    return (
        loggedData.loggedUser !== null ? 
        <Component /> : 
        <Navigate to="/login" />
    );
}
