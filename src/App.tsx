import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile/Profile';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Landing from './pages/landing/landing';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import ProfileSettings from './pages/Profile/ProfileSettings';
import VerificationEmail from './pages/Authentication/VerificationEmail';
import ResendEmailVerification from './pages/Authentication/ResendEmailVerification';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Profile Settings" />
              <ProfileSettings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        /> 
         <Route
          path="/auth/forgotPassword"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ForgotPassword />
            </>
          }
        />
   

        <Route
          path="/auth/verifyEmail/:token/:id"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <VerificationEmail />
            </>
          }
        />

        <Route
          path="/auth/ResendVerifEmail"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ResendEmailVerification />
            </>
          }
        />
  <Route
    path="/auth/resetPassword/:id/:token" // Include id and token as route parameters
    element={
      <>
        <PageTitle title="Reset Password | TailAdmin - Tailwind CSS Admin Dashboard Template" />
        <ResetPassword />
      </>
    }
  />

           <Route
          path="/landing"
          element={
            <>
              <PageTitle title="Landing | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Landing />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
