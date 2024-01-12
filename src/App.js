import "./App.css";
import Test from "./Test";
import { Provider } from "react-redux";
import { store } from "./utils/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Test />
      </div>
    </Provider>
  );
}

export default App;
