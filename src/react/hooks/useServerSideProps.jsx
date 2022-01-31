import React, { useContext } from "react";

export const ServerSidePropsContext = React.createContext({
  data: undefined,
});

export function useServerSideProps() {
  return useContext(ServerSidePropsContext);
}

export function ServerSidePropsContextProvider(props) {
  return (
    <ServerSidePropsContext.Provider value={props}>
      {props.children}
    </ServerSidePropsContext.Provider>
  );
}
