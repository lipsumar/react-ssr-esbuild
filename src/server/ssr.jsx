import * as React from "react";
import * as Server from "react-dom/server";
import App from "../react/components/App";
import { matchRoutes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import routes from "../routes";
import dataLoaders from "./dataLoaders";

export default async function ssr(url) {
  const routeMatches = matchRoutes(routes, url) || [];
  console.log(routeMatches);
  const datas = await Promise.all(
    routeMatches
      .filter((routeMatch) => !!routeMatch.route.serverData)
      .map(async (routeMatch) => ({
        key: routeMatch.route.serverData,
        data: await dataLoaders[routeMatch.route.serverData](),
      }))
  );

  const html = Server.renderToString(
    <StaticRouter location={url}>
      <App data={datas} loading={false} />
    </StaticRouter>
  );
  return {
    html,
    props: datas,
  };
}
