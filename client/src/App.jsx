import Passage from './Passage';
import './App.css';

function App() {
  const props = {
    //Required:
    'data-demo': true,
    //Optional:
    'data-variant': 'inline',
    'data-submitText': 'Submit',
    'data-submitBg ': '#000',
    'data-submitColor': '#fff',
    'data-valorLogo': true,
    'data-cardholdName': true,
    'data-defaultCardholderName': '',
    'data-email': true,
    'data-defaultEmail': '',
    'data-phone': true,
    'data-defaultPhone': '',
    'data-billingAddress': true,
    'data-defaultAddress1': '',
    'data-defaultAddress2': '',
    'data-defaultCity': '',
    'data-defaultState': '',
  };
  return (
    <>
      <Passage props={props} />
    </>
  );
}

export default App;