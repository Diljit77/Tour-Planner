import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const queryClient = new QueryClient()


function App() {
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