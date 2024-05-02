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
import EditChallengeAdmin from './pages/SuperAdmin/EditChallenge';
import AddChallengeAdmin from './pages/SuperAdmin/AddChallengeAdmin';
import TeamsAdmin from './pages/SuperAdmin/TeamsAdmin';
import TeamDetailsAdmin from './pages/SuperAdmin/TeamDetailsAdmin';
import NotificationUser from './pages/Profile/notificationsUser';
import TeamList from './pages/Teams/TeamList';
import Preferences from './pages/Profile/Preferences';
import MyInvitations from './pages/Teams/MyInvitations';
import TeamDetails from './pages/Teams/teamDetails';
import MyTeams from './pages/Teams/MyTeams';
import TeamsDetails from './pages/Teams/teamsDetails';
import OtherUserProfile from './pages/Profile/otherUserProfile';
import Statistique from './components/Charts/statistique';
import PreferencesPage from './components/SidebarClient/PreferencesPage';
import ParticipantChallangeCompany from './pages/Challenges/ParticipantsChallangeCompany';
import ListSub from './pages/SuperAdmin/ListSubmissions';
import DetailSubmission from './pages/SuperAdmin/DetailsSubmissions';
import ChallengesParticiption from './pages/SuperAdmin/Participations';
import Allsubmissiions from './pages/SuperAdmin/AllSubmissions'
import Favories from './pages/competitions/favories'
import SubmissionDetails from './pages/Challenges/submissiondetails';
import DiscussionList from './components/Chat/DiscussionList';
import DiscussionDetails from './components/Chat/DiscussionDetails';




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
        {/* Auth Routes */}
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
              <AuthRoutes component={<SignUp/>}/>
            </>
          }
        /> 

         <Route
          path="/auth/forgotPassword"
          element={
            <>
              <PageTitle title="Signup | TektAi" />
              <AuthRoutes component={<ForgotPassword/>}/>

            </>
          }
        />
  

        <Route
          path="/auth/ResendVerifEmail"
          element={
            <>
              <PageTitle title="Signup | TektAi" />
              <AuthRoutes component={<ResendEmailVerification/>}/>

            </>
          }
        />

        <Route
          path="/auth/verifyEmail/:id"
          element={
            <>
              <PageTitle title="Signup | TektAi" />
              <AuthRoutes component={<EmailVerification/>}/>

            </>
          }
        />

        <Route
          path="/auth/resetPassword/:id/:token" // Include id and token as route parameters
          element={
            <>
              <PageTitle title="Reset Password | TektAi" />
              <AuthRoutes component={<ResetPassword/>}/>
            </>
          }
        />
        {/*Admin Routes*/}
        <Route
          path='dashboard'
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TektAi" />
              <PrivateRoute requiredRoles={["superAdmin","admin"]} component={
                      <ECommerce />

                    }/>
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
          path="/Favories"
          element={
            <>
              <PageTitle title="Calendar | TektAi" />
              <Favories/>
            </>
          }
        />

<Route
          path="/AllSubmissions"
          element={
            <>
              <PageTitle title="SwitchToCompany | TektAi" />
              <Allsubmissiions />
            </>
          }
        />



 <Route
          path="/submission-details/:id"
          element={
            <>
              <PageTitle title="Archive | TektAi" />
              < DetailSubmission />
            </>
          }
        />

  <Route
          path="/submissions/:id"
          element={
            <>
              <PageTitle title="Archive | TektAi" />
              < ListSub />
            </>
          }
        />

 <Route
          path="/Participtions/:id"
          element={
            <>
              <PageTitle title="Archive | TektAi" />
              < ChallengesParticiption />
            </>
          }
        />
        
          <Route
          path="/archive"
          element={
            <>
              <PageTitle title="Archive | TektAi" />
              <PrivateRoute requiredRoles={["superAdmin","admin"]} component={

            < ListArchivee />
            }/>
            </>           
          }
        />
        <Route
          path="/modifierAdmin/:email" 
          Component={ModifierAdmin}
          element={
            <>
              <PageTitle title="Edit Admin | TektAi" />
              <PrivateRoute requiredRoles={["superAdmin","admin"]} component={

              <Modifier1/>
              }/>
            </>
          }
        />
          <Route
          path="/statistics" 
          element={
            <>
              <PageTitle title="Statistics| TektAi" />
              <ChallengeStatistics/>
            </>
          }
        />
       
         <Route
          path="/List"
          element={
            <>
              <PageTitle title="Admin List | TektAi" />
              <PrivateRoute requiredRoles={["superAdmin","admin"]} component={
                <ListesAdmin/>
              }/>   
            </>
          }
        />

    <Route
          path="/ListChallenge"
          element={
            <>
              <PageTitle title="Admin List | TektAi" />
              <PrivateRoute requiredRoles={["superAdmin","admin"]} component={

              <ChallengeList/>
              }/>        
            </>
          }
        />         <Route
          path="/AddAdmin"
          element={
            <>
              <PageTitle title="Add Admin | TektAi" />
              <PrivateRoute requiredRoles={["superAdmin","admin"]} component={

                < AddAdmin1 />
                }/>
             
            </>
          }
        />
         <Route
          path="/Addchallenger"
          element={
            <>
              <PageTitle title="Add Challenger | TektAi" />
              <PrivateRoute requiredRoles={["superAdmin","admin"]} component={

                < AddChallengerByAdmin />
                }/>
            </>
          }
        />
        <Route
          path="/companylist"
          element={
            <>
              <PageTitle title="Company List| TektAi" />
              <PrivateRoute requiredRoles={["superAdmin","admin"]} component={

              < ListCompany />
              }/>
            </>
          }
        />
        <Route
          path="/switchToCompany/:email" Component={A}
          element={
            <>
              <PageTitle title="Switch to company | TektAi" />
              <PrivateRoute requiredRoles={["superAdmin","admin"]} component={

            < A />
            }/> 
          </>
          }
        />
        <Route
          path="/Addcompany"
          element={
            <>
              <PageTitle title="Add Company | TektAi" />
              <PrivateRoute requiredRoles={["superAdmin","admin"]} component={

              < AddCompany />
              }/> 
            </>
          }
        /> 
          <Route
          path="/accountSwitchRequests"
          element={
            <>
              <PageTitle title="Account Switch Requests | TektAi" />
              <PrivateRoute requiredRoles={["superAdmin","admin"]} component={

              <ListAccountSwitchRequest/>
              }/>
            </>
          }
        />
        <Route
            path="/admin/addChallenge"
            element={
            <>
              <PageTitle title="Admin : Add Challeng | TektAi" />
              <PrivateRoute requiredRoles={["superAdmin","admin"]} component={

              <AddChallengeAdmin/>
              }/>
            </>
          }
        />
        <Route
          path="/updateTermsConditions"
          element={
            <>
              <PageTitle title="Terms conditions | TektAi" />
              <PrivateRoute requiredRoles={["superAdmin","admin"]} component={

              <AddTermsConditions />
              }/>
            </>
          }
        />


        <Route
          path="/termsConditions"
          element={
            <>
              <PageTitle title="Terms conditions | TektAi" />
              <PrivateRoute requiredRoles={["superAdmin","admin"]} component={

              <TermsConditions/>
              }/>
            </>
          }
        />


        <Route
          path="/Editaboutus"
          element={
            <>
              <PageTitle title="About Us | TektAi" />
              <PrivateRoute requiredRoles={["superAdmin","admin"]} component={

            <AboutUs/>
            }/>
            </>
          }
        />


        <Route
          path="/EditChallengeAdmin/:id"
          element={
            <>
              <PageTitle title="Edit Challenge Admin | TektAi" />
              <PrivateRoute requiredRoles={["superAdmin","admin"]} component={

              <EditChallengeAdmin/>
              }/>
            </>
          }
        />

    {/* user routes */}
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
          path="/profile"
          element={
            <>
              <PageTitle title="Profile| TektAi" />

              <PrivateRoute requiredRoles={["challenger","company"]} component={

                <Profile/>
              }/>
            </>
          }
        />
           <Route
          path="/teams/myInvitations"
          element={
            <>
               <PageTitle title="My Invitations | TektAi" />

              <PrivateRoute requiredRoles={["challenger"]} component={

                <MyInvitations/>
              }/>
            </>
          }
        />
            <Route
          path="/visit/user/:userId"
          element={
            <>
               <PageTitle title="User Profile | TektAi" />

              <PrivateRoute requiredRoles={["challenger","company","admin","superAdmin"]} component={

                <OtherUserProfile/>
              }/>
            </>
          }
        />
           <Route
          path="/teams/teamDetails/:teamId"
          element={
            <>
              <PageTitle title="Team Details| TektAi" />
              <PrivateRoute requiredRoles={["challenger","company","admin","superAdmin"]} component={

                <TeamDetails/>
              }/>
            </>
          }
        />
       <Route
          path="/teams/myTeams"
          element={
            <>
              <PageTitle title="My Teams | TektAi" />
              <PrivateRoute requiredRoles={["challenger"]} component={

                <MyTeams/>
              }/>
            </>
          }
        />

        <Route
          path="/preferences"
          element={
            <>
              <PageTitle title="Preferences| TektAi" />
              <Preferences/>
            </>
          }
        />


        <Route
          path="/notifications"
          element={
            <>
              <PageTitle title="My Notifications | TektAi" />
              <PrivateRoute requiredRoles={["challenger","company"]} component={

                <NotificationUser/>
              }/>
            </>
          }
        />



        <Route
          path="/challenge/edit/:id"
          element={
            <>
              <PageTitle title="Edit Challenge | TektAi" />
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
              <PageTitle title="Add Challenge | TektAi" />
              <PrivateRoute requiredRoles={["company"]} component={

                <AddChallenge/>
              }/>
            </>
          }
        />
        

          <Route path="/preferences" Component={PreferencesPage}
          element={
            <>


            </>
          }
        
          />

<Route path="/Participants" 
          element={
            <>
              <PrivateRoute requiredRoles={["company"]} component={

                <ParticipantChallangeCompany/>
              }/>
            </>
          }
        
          />

        <Route
          path="/switchToCompany"
          element={
            <>
              <PageTitle title="SwitchToCompany | TektAi" />
              <PrivateRoute requiredRoles={["company","challenger"]} component={
            <SwitchToCompany/>
            }/>   
            
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
          path="/TeamsAdmin" 
          element={
            <>
              <PageTitle title="Teams | TektAi" />
              <TeamsAdmin />
            </>
          }
        />
        <Route
          path="/TeamsAdmin/teamDetails/:teamId"
          element={
            <>
              <PrivateRoute requiredRoles={["admin","superAdmin"]} component={

                <TeamDetailsAdmin/>
              }/>
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
            index
            path='/'
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
            path="/DiscussionList"
            element={
            <>
              <PageTitle title="Discussion | TektAi" />
              <DiscussionList />
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
              <PrivateRoute requiredRoles={["company","challenger"]} component={

              <ChallengeDetailsCompany/>
              }/>
            </>
          }
        />
           <Route
            path="/submission/details/:id"
            element={
            <>
              <PageTitle title="Challenge | TektAi" />
              <SubmissionDetails />
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
              <PrivateRoute requiredRoles={["challenger","company"]} component={

              <Competitions/>
              }/>
            </>
          }

          
        />
  <Route
          path="/statistique"
element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Statistique/>
            </>
          }
        />

        <Route
          path="/teamList"
          element={
            <>
              <PageTitle title=" Team List | TektAi" />
              <TeamList/>
            </>
          }
        />


        <Route
          path="/teamDetails/:id"
          element={
            <>
              <PageTitle title=" Team Details | TektAi" />
              <TeamsDetails/>
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
