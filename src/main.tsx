import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from '../src/storage/Store';
import ReactDOM from 'react-dom';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
