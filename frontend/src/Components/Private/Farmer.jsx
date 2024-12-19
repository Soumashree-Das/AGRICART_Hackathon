import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

export default function Farmer({ component: Component }) {
    const { loggedUser } = useContext(UserContext);

    return loggedUser?.loggedInFarmer ? <Component /> : null;
}
