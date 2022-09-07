import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import {applicationStore} from "./store/ApplicationStore";
import SearchManager from "./views/SearchManager/SearchManager";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

function App() {
  return (
    <QueryClientProvider client = {queryClient}>
      <Provider store={applicationStore}>
        <div className="App">
           <SearchManager />
        </div>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
