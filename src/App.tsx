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
import AddChallengerByAdmin from './pages/SuperAdmin/AddChallengerByAdmin';
import ListCompany from './pages/SuperAdmin/ListesCompany'
import AddCompany from './pages/SuperAdmin/AddCompany'
import Modifier1 from './pages/SuperAdmin/ModiferChallenger'
import A from './pages/SuperAdmin/UpdateChallengerToCompany'
import ModifierAdmin from './pages/SuperAdmin/ModiferChallenger';
import ListesAdmin from './pages/SuperAdmin/List';
import AddAdmin1 from './pages/SuperAdmin/AddAdmin';
import Profile from './pages/Profile/Profile';
import SwitchToCompany from './pages/Profile/SwitchToCompany';
import ListAccountSwitchRequest from './pages/SuperAdmin/ListAccountSwitchRequest';
import { User } from './types/User';
import { useNavigate } from 'react-router-dom';
import ListArchivee from "./pages/SuperAdmin/ListArchive"
import EmailVerification from './pages/Authentication/EmailVerification';
import SignIn from './pages/Authentication/SignIn';
import TermsConditions from './pages/TermsConditions/TermsConditions';
import AddTermsConditions from './pages/TermsConditions/AddTermsConditions';
import { useAuth } from './components/Auth/AuthProvider';
import PrivateRoute from './components/Auth/PrivateRoute';
import AuthRoutes from './components/Auth/AuthRoutes';
import AboutUs from "./pages/SuperAdmin/AboutUs"
import Teams from './pages/landing/teams';
import NotFound from './pages/NotFound';
import EditChallenge from './pages/Challenge/EditChallenge';
import ChallengeList from "./pages/SuperAdmin/ListesChallenge";

import ChallengeListFront from "./pages/competitions/challengesListFront";

import Competitions from './pages/landing/Competitions';
import AddChallenge from './pages/Challenge/AddChallenge';
import ChallengeDetails from './pages/Challenges/challengedetails';
import ChallengeDetailsCompany from './pages/Challenges/challengedetailscompany';
import ChallengeStatistics from './pages/Challenges/challengesstatics';
import AddChallengeAdmin from './pages/SuperAdmin/AddChallengeAdmin';




function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [connectedUser, setconnectedUser] = useState<User | null>(null);

  const { pathname } = useLocation();

  const navigate = useNavigate();
  const { authenticated} = useAuth();




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
          path="/List"
          element={
            <>
              <PageTitle title="Admin List | TektAi" />
              <ListesAdmin/>
            </>
          }
        />

<Route
          path="/ListChallenge"
          element={
            <>
              <PageTitle title="Admin List | TektAi" />
              <ChallengeList/>
            </>
          }
        />         <Route
          path="/AddAdmin"
          element={
            <>
              <PageTitle title="Add Admin | TektAi" />
              <AddAdmin1/>
            </>
          }
        />


<Route
          path="/LCFront"
          element={
            <>
              <PageTitle title="Add Admin | TektAi" />
              <ChallengeListFront/>
            </>
          }
        />
        <Route
          path="/Addchallenger"
          element={
            <>
              <PageTitle title="Add Challenger | TektAi" />
              <AddChallengerByAdmin />
            </>
          }
        />
        
        <Route
          path="/Addchallenger"
          element={
            <>
              <PageTitle title="Challengers List | TektAi" />
             
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
          path="/Addcompany"
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
              <PrivateRoute requiredRoles={["challenger","company"]} component={

                <Profile/>
              }/>
            </>
          }
        />


        <Route
          path="/challenge/edit/:id"
          element={
            <>
              <PrivateRoute requiredRoles={["company"]} component={

                <EditChallenge/>
              }/>
            </>
          }
        />
        
        <Route
          path="/challenge/add"
          element={
            <>
              <PrivateRoute requiredRoles={["company"]} component={

                <AddChallenge/>
              }/>
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
              <AuthRoutes component={<SignIn/>}/>
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
          path="/auth/ResendVerifEmail"
          element={
            <>
              <PageTitle title="Signup | TektAi" />
              <ResendEmailVerification />
            </>
          }
        />

        <Route
          path="/auth/verifyEmail/:id"
          element={
            <>
              <PageTitle title="Signup | TektAi" />
              <EmailVerification />
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
       <Route
            path="/challenge/details/:id"
            element={
            <>
              <PageTitle title="Challenge | TektAi" />
              <ChallengeDetails />
            </>
          }
        />
           <Route
            path="/admin/addChallenge"
            element={
            <>
              <PageTitle title="Admin : Add Challeng | TektAi" />
              <AddChallengeAdmin />
            </>
          }
        />
         <Route
            path="/challenge/statistics"
            element={
            <>
              <PageTitle title="Challenge | TektAi" />
              <ChallengeStatistics />
            </>
          }
        />
           <Route
            path="/challengecompany/details/:id"
            element={
            <>
              <PageTitle title="Challenge | TektAi" />
              <ChallengeDetailsCompany />
            </>
          }
        />

          <Route
            path="/teams"
            element={
            <>
              <PageTitle title="Teams | TektAi" />
              <Teams />
            </>
          }
        />

<Route
            path="/Competitions"
            element={
            <>
              <PageTitle title="Competitions | TektAi" />
              <Competitions/>
            </>
          }
        />

        <Route
          path="/updateTermsConditions"
          element={
            <>
              <PageTitle title="Terms conditions | TektAi" />
              <AddTermsConditions />
            </>
          }
        />


        <Route
          path="/termsConditions"
          element={
            <>
              <PageTitle title="Terms conditions | TektAi" />
              <TermsConditions />
            </>
          }
        />


        <Route
          path="/Editaboutus"
          element={
            <>
              <PageTitle title="About Us | TektAi" />
              <AboutUs/>
            </>
          }
        />


        <Route
          path="*"
          element={
            <>
              <PageTitle title="About Us | TektAi" />
              <NotFound/>
            </>
          }
        />

      </Routes>
    </>
  );
}

export default App;
