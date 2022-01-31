import React, { useContext, useEffect, useState, useRef } from "react";
import { useLocation, matchRoutes } from "react-router-dom";
import routes from "../../routes";
export const ServerDataContext = React.createContext({
  data: undefined,
  loading: true,
});

export function useServerData(key) {
  const ctx = useContext(ServerDataContext);
  if (ctx.loading) {
    return ctx;
  }
  console.log("->", key, ctx);
  const entry = ctx.data.find((e) => e.key === key);
  return entry
    ? { loading: false, data: entry.data }
    : { loading: true, data: null };
}

export function ServerDataContextProvider(props) {
  console.log("ServerDataContextProvider", props);
  const [data, setData] = useState(props.data);
  const [loading, setLoading] = useState(!!props.loading);
  const didMountRef = useRef(false);
  const loc = useLocation();

  useEffect(() => {
    if (!didMountRef.current) {
      // first render
      didMountRef.current = true;
      return;
    }
    setLoading(true);
    const routeMatches = matchRoutes(routes, loc);
    const dataKeys = routeMatches
      .filter((routeMatch) => !!routeMatch.route.serverData)
      .map((routeMatch) => routeMatch.route.serverData);

    fetch("/ssr/data/" + dataKeys.join(","))
      .then((resp) => resp.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [loc]);

  return (
    <ServerDataContext.Provider
      value={{
        data,
        loading,
      }}
    >
      {props.children}
    </ServerDataContext.Provider>
  );
}
