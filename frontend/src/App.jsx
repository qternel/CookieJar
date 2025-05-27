import { BrowserRouter } from "react-router-dom";
import Router from "./pages/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <Router />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
