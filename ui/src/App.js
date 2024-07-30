import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Homepage from './pages/HomePage'
import AddPage from './pages/AddPage';
const router=createBrowserRouter([
{
  path:"/",
  element: <Homepage/>,
},
{
  path:"/add",
  element: <AddPage/>,
},
]);

function App() {
  return (
    <div className="App">
        <RouterProvider router={router}/>

    </div>
  );
}

export default App;
