import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
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
import VerificationEmail from './pages/Authentication/VerificationEmail';
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
              <PageTitle title="eCommerce Dashboard | TektAi" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TektAi" />
              <Calendar />
            </>
          }
        />
          <Route
          path="/archive"
          element={
            <>
              <PageTitle title="Archive | TektAi" />
              < ListArchivee />
            </>
          }
        />
        <Route
          path="/modifierAdmin/:email" 
          Component={ModifierAdmin}
          element={
            <>
              <PageTitle title="Edit Admin | TektAi" />
              <Modifier1/>
            </>
          }
        />
         <Route
          path="/AdminList"
          element={
            <>
              <PageTitle title="Admin List | TektAi" />
              <ListesAdmin/>
            </>
          }
        />
         <Route
          path="/AddAdmin"
          element={
            <>
              <PageTitle title="Add Admin | TektAi" />
              <AddAdmin1/>
            </>
          }
        />
        <Route
          path="/ajouterChallenger"
          element={
            <>
              <PageTitle title="Add Challenger | TektAi" />
              <AddChallengerByAdmin />
            </>
          }
        />
        
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Challengers List | TektAi" />
              <ListesChallengers />
            </>
          }
        />
         <Route
          path="/companylist"
          element={
            <>
              <PageTitle title="Company List| TektAi" />
              <ListCompany />
            </>
          }
        />
         <Route
          path="/switchToCompany/:email" Component={A}
          element={
            <>
              <PageTitle title="Switch to company | TektAi" />
              <A />
            </>
          }
        />

        <Route
          path="/companyAdd"
          element={
            <>
              <PageTitle title="Add Company | TektAi" />
              <AddCompany />
            </>
          }
        /> 


        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TektAi" />
              <Profile />
            </>
          }
        />
        

        <Route
          path="/switchToCompany"
          element={
            <>
              <PageTitle title="SwitchToCompany | TektAi" />
              <SwitchToCompany />
            </>
          }
        />
        

        <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Profile Settings | TektAi" />
                <ProfileSettings />
              </>
          }
        />
        
          <Route
          path="/accountSwitchRequests"
          element={
            <>
              <PageTitle title="Account Switch Requests | TektAi" />
              <ListAccountSwitchRequest />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TektAi" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TektAi" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TektAi" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TektAi" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TektAi" />
              <SignUp />
            </>
          }
        /> 
         <Route
          path="/auth/forgotPassword"
          element={
            <>
              <PageTitle title="Signup | TektAi" />
              <ForgotPassword />
            </>
          }
        />
   

        <Route
          path="/auth/verifyEmail/:token/:id"
          element={
            <>
              <PageTitle title="Signup | TektAi" />
              <VerificationEmail />
            </>
          }
        />

        <Route
          path="/auth/ResendVerifEmail"
          element={
            <>
              <PageTitle title="Signup | TektAi" />
              <ResendEmailVerification />
            </>
          }
        />
  <Route
    path="/auth/resetPassword/:id/:token" // Include id and token as route parameters
    element={
      <>
        <PageTitle title="Reset Password | TektAi" />
        <ResetPassword />
      </>
    }
  />

           <Route
          path="/landing"
          element={
            <>
              <PageTitle title="Landing | TektAi" />
              <Landing />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
