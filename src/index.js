import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import dayjs from "dayjs";
import store from "store";
import "services/i18n";
import { App } from "App";
import { Overlay } from "layouts";
import "assets/styles/all.scss";
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			retry: false,
		},
		mutations: {
			retry: false,
		},
	},
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Router>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<App />

				<Overlay />
				<div id="modal-root"></div>

				{process.env.NODE_ENV === "development" && (
					<ReactQueryDevtools initialIsOpen={false} />
				)}
			</QueryClientProvider>
		</Provider>
	</Router>
);
