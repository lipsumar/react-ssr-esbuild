import { useRoutes } from "react-router-dom";
import routes from "../../routes";
import { ServerSidePropsContextProvider } from "../hooks/useServerSideProps";

export default function App(props) {
  console.log("App", props);
  const router = useRoutes(routes);

  return (
    <ServerSidePropsContextProvider value={props}>
      {router}
    </ServerSidePropsContextProvider>
  );
}
