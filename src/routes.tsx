/**
 * Route configuration for the HeiaH education platform.
 *
 * Add these routes to App.tsx inside <Routes>, ABOVE the catch-all "*" route:
 *
 *   import PaymentSuccess from './pages/PaymentSuccess';
 *   import PaymentCancel from './pages/PaymentCancel';
 *   import CoursePlayer from './pages/CoursePlayer';
 *
 *   <Route path="/payment/success" element={<PaymentSuccess />} />
 *   <Route path="/payment/cancel" element={<PaymentCancel />} />
 *   <Route path="/course" element={<CoursePlayer />} />
 */

import { RouteObject } from 'react-router-dom';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import CoursePlayer from './pages/CoursePlayer';

export const appRoutes: RouteObject[] = [
  { path: '/payment/success', element: <PaymentSuccess /> },
  { path: '/payment/cancel', element: <PaymentCancel /> },
  { path: '/course', element: <CoursePlayer /> },
];
