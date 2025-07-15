import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import PageWrapper from './components/PageWrapper';
import {headerLoader} from './components/Header/Header';
import HomePage from "./components/Home/HomePage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <PageWrapper />,
        loader: headerLoader,
        children: [
            {
                index: true,
                element: <HomePage />
                // loader:
            }
        ]
    },
    {
        path: "*",
        element: <Navigate
            to="/"
            replace={true} />
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
