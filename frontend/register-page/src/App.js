import './App.css';
import Greeting from './components/Greeting';
import LoginButton from './components/navbar/LoginButton';
import LogoutButton from './components/navbar/LogoutButton';
import SubscriptionGroup from './components/subscription/SubscriptionGroup';
import Navbar from './components/navbar/Navbar';
function App() {
  return (
    <>
      <Navbar className="bg-dark-green"/>  
      <header className="bg-dark-green">
        <Greeting />
      </header>
      <section className="bg-light-yellow">
        <SubscriptionGroup />
      </section>
    </>
  );
}

export default App;
