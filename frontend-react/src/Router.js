import {Navigate, createBrowserRouter, redirect, useLoaderData, useNavigate, useOutletContext} from 'react-router-dom'
import {App, AppLoader} from './App'
import BaseLayout from './layouts/BaseLayout';
import UserLayout from './layouts/UserLayout';
import CounsellorLayout from './layouts/CounsellorLayout';
import { useContext, useEffect } from 'react';
import LoginPage from './routes/LoginPage';
import LogoutPage from './routes/LogoutPage';
import Welcome from './routes/Welcome';
import SignInPage from './routes/SignInPage';
import EmailVerificationPage from './routes/EmailVerificationPage';

const router = createBrowserRouter([
    {
        element: <App/>,
        loader: AppLoader,
        children: [
            {
                index: true,
                element: <></>,
                loader: () => {
                    return redirect('/welcome');
                }
            },
            {
                path: 'logout',
                element: <LogoutPage/>,
                loader: async () => {
                    await fetch('/auth/logout')
                    return true
                },
            },
            {
                element: <BaseLayout/>,
                children: [
                    {
                        path: 'welcome',
                        element: <Welcome/>,
                    },
                    {
                        path: 'login',
                        element: <LoginPage/>,
                    },
                    {
                        path: 'signin',
                        element: <SignInPage/>,
                    },
                    {
                        element: <UserLayout/>,
                        children: [
                            {
                                path: 'email/verification',
                                element: <EmailVerificationPage/>,
                            },
                            {
                                element: <CounsellorLayout/>,
                                children: [
                                    {
                                        path: 'about',
                                        element: <h1>About Page</h1>
                                    },
                                ],
                            },
                            
                            {
                                path: 'profile',
                                element: <h1>Profile Page</h1>
                            },
                        ]
                    },
                ]
            }
        ]
    }
]);

export default router;