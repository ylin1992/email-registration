import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import SubscriptionGroup from './components/subscription/SubscriptionGroup';
function App() {
  return (
    <>
      <LoginButton />
      <LogoutButton />
      <Profile />
      <SubscriptionGroup />
    </>
  );
}

export default App;
