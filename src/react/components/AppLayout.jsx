import { Link, Outlet } from "react-router-dom";
import { ServerDataContextProvider } from "../hooks/useServerData";
import { useServerSideProps } from "../hooks/useServerSideProps";

function WithServerData(props) {
  const ssrProps = useServerSideProps();
  console.log("WithServerData", ssrProps);
  return (
    <ServerDataContextProvider data={ssrProps.value.data}>
      {props.children}
    </ServerDataContextProvider>
  );
}

const AppLayout = () => {
  return (
    <WithServerData>
      <div css={{ maxWidth: 600, margin: "0 auto" }}>
        <div>
          <Link to="/">The app</Link> - <Link to="/about">about</Link>
        </div>
        <hr />
        <Outlet />
      </div>
    </WithServerData>
  );
};
export default AppLayout;
