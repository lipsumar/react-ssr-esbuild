import ReactDOM from "react-dom";
import App from "../react/components/App";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
const serverData = JSON.parse(
  document.querySelector('script[id="server-data"]').innerHTML
);

ReactDOM.hydrate(
  <HelmetProvider>
    <BrowserRouter>
      <App data={serverData} />
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById("root")
);
