import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./app/store";
import Routes from "./Routes";
let persistor = persistStore(store);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
          <ToastContainer
            position="bottom-right"
            autoClose={false}
            newestOnTop
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
          />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
