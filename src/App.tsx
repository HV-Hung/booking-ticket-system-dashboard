import "./App.css";
import { Route, Routes } from "react-router-dom";
import { User } from "./pages/user/User";
import Layout from "./components/Layout/Layout";
import { LogIn } from "./pages/auth/Login";
import { QueryClient, QueryClientProvider } from "react-query";
import { NotFound } from "./components/Layout/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<Layout />}>
          <Route path="/user" element={<User />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
