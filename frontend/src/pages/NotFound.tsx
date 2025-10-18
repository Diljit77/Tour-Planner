
import { Link } from 'react-router-dom'


export default function NotFound(){
return (
<div className="min-h-[60vh] flex items-center justify-center">
<div className="text-center">
<h1 className="text-4xl font-bold">404</h1>
<p className="mt-2 text-gray-600">Page not found</p>
<Link to="/" className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded">Go home</Link>
</div>
</div>
)
}