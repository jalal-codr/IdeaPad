
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.ts';





ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
      <Provider store={store}>
      <App />
      </Provider>
  {/* </React.StrictMode>, */}
  </BrowserRouter>

)
