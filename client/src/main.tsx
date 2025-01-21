import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'
import { configureStore } from '@reduxjs/toolkit'
import { api } from './State/api'
import { setupListeners } from '@reduxjs/toolkit/query'
import { Provider } from 'react-redux'

export const store = configureStore({
  reducer : { [api.reducerPath] : api.reducer },
  middleware : (getDefault) => getDefault().concat(api.middleware)
});

// It sets up listeners for automatic data fetching and cache invalidation using the setupListeners function.
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store = {store}>
    <App />
  </Provider>,
)
