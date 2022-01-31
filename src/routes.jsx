import About from "./react/components/About";
import AppLayout from "./react/components/AppLayout";
import Greet from "./react/components/Greet";

const routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        exact: true,
        element: <Greet />,
        serverData: "greet",
      },
      {
        path: "/about",
        exact: true,
        element: <About />,
        serverData: "about",
      },
    ],
  },
];

export default routes;
