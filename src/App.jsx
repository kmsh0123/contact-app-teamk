import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./container/Layout";
import { Suspense, lazy } from "react";
import PageLoading from "./pages/Loading";
import SidebarProvider from "./context/SidebarConext";
import ThemeProvider from "./context/ThemeContext";
import AppTheme from "./container/AppTheme";
import Paths from "./routes/Paths";
import "./index.css"
import { useSelector } from "react-redux";

const Home = lazy(() => import("./pages/Home"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <Home /> }],
  },
  // {
  // 	path: "/login",
  // 	element: add login page
  // },
]);

function App() {
const {mode} = useSelector(state=>state.darkMode);

  return (
    <div className={`w-full h-screen flex flex-col ${mode ? "bg-white" : "bg-slate-900"}`}>
      {/* <SidebarProvider>
        <ThemeProvider>
          <AppTheme>
            <Suspense fallback={<PageLoading />}>
              <RouterProvider router={router} />
            </Suspense>
          </AppTheme>
        </ThemeProvider>
      </SidebarProvider> */}
      <Paths />
    </div>
  );
}

export default App;
