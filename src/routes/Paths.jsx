import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Routeguard from "../components/Routeguard";
import CreateContact from "../components/CreateContact";
import Detail from "../components/Detail";
import Edit from "../components/Edit";
import Favourite from "../components/Favourite";
import FormPage from "../pages/FormPage";


const Paths = () => {
	return (
		<div>
			<Routes>
				<Route
					path={"/"}
					element={
						<Routeguard>
							{" "}
							<Home />
						</Routeguard>
					}
				/>
				{/* <Route path={"/register"} element={<Register />} /> */}
				<Route path={"/formPage"} element={<FormPage />} />
				<Route path={"/create"} element={<CreateContact />} />
				<Route path={"/detail/:id"} element={<Detail />} />
				<Route path={"/edit/:id"} element={<Edit />} />
				<Route path={"/favourite"} element={<Favourite />} />
			</Routes>
		</div>
	);
};

export default Paths;
