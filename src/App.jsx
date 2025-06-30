import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './app/Routes'

function App() {
  return (
    <BrowserRouter>     
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App