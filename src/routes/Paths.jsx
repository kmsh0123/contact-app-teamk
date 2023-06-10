import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Routeguard from "../components/Routeguard";
import CreateContact from "../components/CreateContact";
import Detail from "../components/Detail";
import Edit from "../components/Edit";
import Favourite from "../components/Favourite";


const Paths = () => {
<<<<<<< HEAD
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
        <Route path={"/register"} element={<Register />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/create"} element={<CreateContact />} />
        <Route path={"/detail/:id"} element={<Detail />} />
        <Route path={"/edit/:id"} element={<Edit />} />
      </Routes>
    </div>
  );
=======
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
				<Route path={"/register"} element={<Register />} />
				<Route path={"/login"} element={<Login />} />
				<Route path={"/create"} element={<CreateContact />} />
				<Route path={"/detail/:id"} element={<Detail />} />
				<Route path={"/edit/:id"} element={<Edit />} />
				<Route path={"/favourite"} element={<Favourite />} />
			</Routes>
		</div>
	);
>>>>>>> 79617543421c5a178c97943a924b381b4474f9fb
};

export default Paths;
