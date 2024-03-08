import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Landing from './pages/landing/landing';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import ProfileSettings from './pages/Profile/ProfileSettings';
import ResendEmailVerification from './pages/Authentication/ResendEmailVerification';
import ListesChallengers from './pages/SuperAdmin/ListesChallengers';
import AddChallengerByAdmin from './pages/SuperAdmin/AddChallengerByAdmin';
import ListCompany from './pages/SuperAdmin/ListesCompany'
import AddCompany from './pages/SuperAdmin/AddCompany'
import Modifier1 from './pages/SuperAdmin/ModiferChallenger'
import A from './pages/SuperAdmin/UpdateChallengerToCompany'
import ModifierAdmin from './pages/SuperAdmin/ModiferChallenger';
import ListesAdmin from './pages/SuperAdmin/ListesAdmin';
import AddAdmin1 from './pages/SuperAdmin/AddAdmin';
import Profile from './pages/Profile/Profile';
import SwitchToCompany from './pages/Profile/SwitchToCompany';
import ListAccountSwitchRequest from './pages/SuperAdmin/ListAccountSwitchRequest';
import { User } from './types/User';
import { getProfile } from './services/user.service';
import { useNavigate } from 'react-router-dom';
import ListArchivee from "./pages/SuperAdmin/ListArchive"
import StepperForm1 from './pages/Authentication/stepperForm';
import EmailVerification from './pages/Authentication/EmailVerification';
import SignIn from './pages/Authentication/Signin';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [connectedUser, setconnectedUser] = useState<User | null>(null);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    const fetchAuthenticationStatus = async () => {
      try {
        const connectedUser = await getProfile();
        setconnectedUser(connectedUser);
        setAuthenticated(true);

      } catch (error) {
        setAuthenticated(false);
      } 
    };

    fetchAuthenticationStatus();
    console.log(authenticated)

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
          path="/archive"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              < ListArchivee />
            </>
          }
        />
        <Route
          path="/modifierAdmin/:email" 
          Component={ModifierAdmin}
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Modifier1/>
            </>
          }
        />
         <Route
          path="/AdminList"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ListesAdmin/>
            </>
          }
        />
         <Route
          path="/AddAdmin"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AddAdmin1/>
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
          path="/switchToCompany"
          element={
            <>
              <PageTitle title="SwitchToCompany | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SwitchToCompany />
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
          path="/accountSwitchRequests"
          element={
            <>
              <PageTitle title="Account Switch Requests" />
              <ListAccountSwitchRequest />
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
          path="/auth/signup1"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <StepperForm1 />
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
          path="/auth/ResendVerifEmail"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ResendEmailVerification />
            </>
          }
        />

        <Route
          path="/auth/verifyEmail/:id"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <EmailVerification />
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
