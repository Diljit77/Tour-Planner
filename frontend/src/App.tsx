import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useAuthStore } from './store/useAuthStore';



const queryClient = new QueryClient()

function App() {
      const loadAuth = useAuthStore((state) => state.loadFromStorage);

  useEffect(() => {
    loadAuth();
  }, []);

return (
<QueryClientProvider client={queryClient}>
          <ToastContainer
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
<div className="min-h-screen flex flex-col">
<AppRoutes />
</div>
</QueryClientProvider>
)
}


export default App