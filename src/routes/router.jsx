import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import CreateEmployeePage from '../pages/CreateEmployeePage';
import EmployeeListPage from '../pages/EmployeeListPage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <CreateEmployeePage />,
            },
            {
                path: '/list',
                caseSensitive: true,
                element: <EmployeeListPage />,
            },
            {
                path: '/404',
                element: <NotFoundPage />,
            },
            {
                path: '*',
                element: <Navigate to="/404" replace />,
            },
        ],
    },
]);
