import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import "antd-mobile/bundle/css-vars-patch.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
