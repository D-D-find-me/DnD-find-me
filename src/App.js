import Header from "./components/Header/Header";
import routes from "./routes";
import './App.css';
import {useLocation} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query"

const queryClient = new QueryClient();


const App = () => {
  const location = useLocation();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      <Header />
      {routes}
      </QueryClientProvider>
    </div>
  );
};

export default App;
