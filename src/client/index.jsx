import ReactDOM from "react-dom";
import App from "../react/components/App";
import { BrowserRouter } from "react-router-dom";

const serverData = JSON.parse(
  document.querySelector('script[id="server-data"]').innerHTML
);

ReactDOM.hydrate(
  <BrowserRouter>
    <App data={serverData} />
  </BrowserRouter>,
  document.getElementById("root")
);
