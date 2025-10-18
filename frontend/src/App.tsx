import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppRoutes from './routes/AppRoutes'


const queryClient = new QueryClient()


function App() {
return (
<QueryClientProvider client={queryClient}>
<div className="min-h-screen flex flex-col">
<AppRoutes />
</div>
</QueryClientProvider>
)
}


export default App