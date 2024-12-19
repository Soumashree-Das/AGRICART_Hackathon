import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

export default function Cust({ component: Component }) {
    const { loggedUser } = useContext(UserContext);

    return loggedUser?.loggedInUser ? <Component /> : null;
}
