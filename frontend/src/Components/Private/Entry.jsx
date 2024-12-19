import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function Entry({ component: Component }) {
    const { loggedUser } = useContext(UserContext);

    // Check if the user is not logged in (i.e., `loggedUser` is null or an empty object)
    const isUserLoggedIn = loggedUser && Object.keys(loggedUser).length > 0;

    return !isUserLoggedIn ? <Component /> : null;
}
