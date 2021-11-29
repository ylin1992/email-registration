import './App.css';
import Greeting from './components/Greeting';
import SubscriptionGroup from './components/subscription/SubscriptionGroup';
import Navbar from './components/navbar/Navbar';
import Description from './components/description/Description';
function App() {
  return (
    <>
      <section className="bg-dark-green">
        <Navbar /> 
      </section>
      <header className="bg-dark-green">
        <Greeting />
      </header>
      <section className="bg-light-yellow">
        <Description />
      </section>
      <section className="bg-dark-yellow">
        <SubscriptionGroup />
      </section>
    </>
  );
}

export default App;
