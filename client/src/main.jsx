import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'; // Import Tailwind CSS
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/Store.js'
import {Toaster} from './components/ui/toaster.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* store is here connected -redux setup*/}
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>



)
