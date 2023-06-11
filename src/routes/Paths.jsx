import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Routeguard from "../components/Routeguard";
import CreateContact from "../components/CreateContact";
import Detail from "../components/Detail";
import Edit from "../components/Edit";
import FormPage from "../pages/FormPage";
import UserProfile from "../pages/UserProfile";

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
        <Route path={"/userProfile"} element={<UserProfile />} />
        <Route path={"/create"} element={<CreateContact />} />
        <Route path={"/detail/:id"} element={<Detail />} />
        <Route path={"/edit/:id"} element={<Edit />} />
        <Route path={"/formPage"} element={<FormPage />} />
      </Routes>
    </div>
  );
};

export default Paths;
