import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Dashboard from "../pages/dashboard";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";

function MainRouter(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route excat path="/signin" element={<SignIn />} />
                <Route excat path="/signup" element={<SignUp />} />
                <Route excat path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter;