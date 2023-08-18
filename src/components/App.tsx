import './App.css';
import CustomerRegistrationForm from './CustomerReagistrationForm';

export default function App() {
  return (
    <div className="app">
      <CustomerRegistrationForm onSubmit={(data) => console.log(data)} />
    </div>
  );
}
