import { Provider } from 'react-redux';
import './App.css';
import Body from './components/Body';
import appStore from './utils/appStore';

function App() {
  return (
    <Provider store={appStore}>
      <div className="App">
        <header className="App-header">
          <Body />
        </header>
      </div>
    </Provider>
  );
}

export default App;
