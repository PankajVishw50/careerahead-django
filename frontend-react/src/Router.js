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
import SetupPage from './routes/SetupPage';
import UserDashboardPage from './routes/UserDashboard';
import CounsellorDashboard from './routes/CounsellorDashboard';
import MarketPage from './routes/MarketPage';
import CounsellorProfileView from './components/CounsellorProfileView';
import CounsellorPost from './routes/CounsellorPost';
import Dashboard from './routes/Dashboard';

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
                                path: '/dashboard',
                                element: <Dashboard/>,
                            },
                            {
                                path: '/user/dashboard',
                                element: <UserDashboardPage/>
                            },
                            {
                                path: '/market',
                                element: <MarketPage/>
                            },
                            {
                                path: '/counsellor/:counsellorId',
                                element: <CounsellorPost/>
                            },
                            {
                                element: <CounsellorLayout/>,
                                children: [
                                    {
                                        path: 'counsellor/dashboard',
                                        element: <CounsellorDashboard/>
                                    },
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
            },

            {
                element: <UserLayout/>,
                children: [
                    {
                        path: 'setup',
                        element: <SetupPage/>,
                    },
                ]
            }
        ]
    }
]);

export default router;