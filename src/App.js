import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import PageWrapper from './components/PageWrapper';
import {headerLoader} from './components/Header/Header';
import {useEffect, lazy, Suspense} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Loaders
import {loader as homePageLoader} from './components/Home/HomePage';
import {loader as aboutLoader} from './components/Static Pages/About/AboutPage';
import {loader as servicesLoader} from './components/Categories/Services/ServicePage';
import {loader as serviceDetailLoader} from './components/Categories/Services/ServiceDetailPage';
import {loader as blogListLoader} from './components/Categories/BlogPosts/BlogListPage';
import {loader as blogPostLoader} from './components/Categories/BlogPosts/BlogPostPage';

// Lazy load page components
const HomePage = lazy(() => import('./components/Home/HomePage'));
const AboutPage = lazy(() => import('./components/Static Pages/About/AboutPage'));
const ServicesPage = lazy(() => import('./components/Categories/Services/ServicePage'));
const ServiceDetailPage = lazy(() => import('./components/Categories/Services/ServiceDetailPage'));
const BlogListPage = lazy(() => import('./components/Categories/BlogPosts/BlogListPage'));
const BlogPostPage = lazy(() => import('./components/Categories/BlogPosts/BlogPostPage'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <PageWrapper />,
        loader: headerLoader,
        children: [
            {
                index: true,
                element: (
                    <HomePage />
                ),
                loader: homePageLoader,
            },
            {
                path: 'about',
                element: (
                    <Suspense fallback={<div>Loading About page...</div>}>
                        <AboutPage />
                    </Suspense>
                ),
                loader: aboutLoader,
            },
            {
                path: 'services',
                element: (
                    <Suspense fallback={<div>Loading Services...</div>}>
                        <ServicesPage />
                    </Suspense>
                ),
                loader: servicesLoader,
            },
            {
                path: 'services/:slug',
                element: (
                    <Suspense fallback={<div>Loading Service details...</div>}>
                        <ServiceDetailPage />
                    </Suspense>
                ),
                loader: serviceDetailLoader,
            },
            {
                path: 'blog',
                element: (
                    <Suspense fallback={<div>Loading Blog list...</div>}>
                        <BlogListPage />
                    </Suspense>
                ),
                loader: blogListLoader,
            },
            {
                path: 'blog/:slug',
                element: (
                    <Suspense fallback={<div>Loading Blog post...</div>}>
                        <BlogPostPage />
                    </Suspense>
                ),
                loader: blogPostLoader,
            },
        ],
    },

    // Catch-all redirect
    {
        path: '*',
        element: <Navigate
            to="/"
            replace />,
    },
]);

function App() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
            offset: 200,
        });
    }, []);

    return <RouterProvider router={router} />;
}

export default App;
