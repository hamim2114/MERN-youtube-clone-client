import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import {MAIN_URL} from './utils/BaseUrl'

axios.defaults.baseURL = MAIN_URL

ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <App />
      </PersistGate>
   </Provider>
);
