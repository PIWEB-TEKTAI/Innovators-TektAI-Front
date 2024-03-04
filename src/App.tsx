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
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Landing from './pages/landing/landing';
import SignUpForm from './pages/Authentication/SignUpForm';
import AccountType from './pages/Authentication/AccountType';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import ListesChallengers from './pages/SuperAdmin/ListesChallengers';
import AddChallengerByAdmin from './pages/SuperAdmin/AddChallengerByAdmin';
import ListCompany from './pages/SuperAdmin/ListesCompany'
import AddCompany from './pages/SuperAdmin/AddCompany'
import Modifier1 from './pages/SuperAdmin/ModiferAll'
import A from './pages/SuperAdmin/UpdateChallengerToCompany'
import ModifierAdmin from './pages/SuperAdmin/ModiferAll';


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
          path="/modifier-admin" 
          Component={ModifierAdmin}
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Modifier1/>
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
          path="/ajouterChallenger"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AddChallengerByAdmin />
            </>
          }
        />
        
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ListesChallengers />
            </>
          }
        />
         <Route
          path="/companylist"
          element={
            <>
              <PageTitle title="TEktai" />
              <ListCompany />
            </>
          }
        />
         <Route
          path="/switchToCompany/:email" Component={A}
          element={
            <>
              <PageTitle title="TEktai" />
              <A />
            </>
          }
        />

<Route
          path="/companyAdd"
          element={
            <>
              <PageTitle title="TEktai" />
              <AddCompany />
            </>
          }
        />        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="TEktai" />
              <Settings />
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
          path="/auth/signup2"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUpForm />
            </>
          }
        /> <Route
          path="/auth/signup3"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AccountType/>
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
          path="/auth/resetPassword"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
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
