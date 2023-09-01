import React, { useReducer } from 'react';

interface CustomerRegistrationFormProps {
  onSubmit: (data: CustomerFormData) => void;
}

interface CustomerFormData {
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  preferredContact: 'phone' | 'email';
  postalType: 'poBox' | 'street';
  postalPOBox: string;
  postalStreetAddress: string;
  postalCity: string;
  postalPostCode: string;
  postalCountry: string;
  creditCards: CreditCardData[];
  interests: string[];
}

interface CreditCardData {
  nameOnCard: string;
  cardNumber: string;
  expiryDate: string;
}

type Action =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_FIRST_NAME'; payload: string }
  | { type: 'SET_MIDDLE_NAME'; payload: string }
  | { type: 'SET_LAST_NAME'; payload: string }
  | { type: 'SET_PHONE_NUMBER'; payload: string }
  | { type: 'SET_EMAIL_ADDRESS'; payload: string }
  | { type: 'SET_PREFERRED_CONTACT'; payload: 'phone' | 'email' }
  | { type: 'SET_POSTAL_TYPE'; payload: 'poBox' | 'street' }
  | { type: 'SET_POSTAL_PO_BOX'; payload: string }
  | { type: 'SET_POSTAL_STREET'; payload: string }
  | { type: 'SET_POSTAL_CITY'; payload: string }
  | { type: 'SET_POSTAL_POST_CODE'; payload: string }
  | { type: 'SET_POSTAL_COUNTRY'; payload: string }
  | {
      type: 'SET_CREDIT_CARD_NAME';
      payload: { index: number; nameOnCard: string };
    }
  | {
      type: 'SET_CREDIT_CARD_NUMBER';
      payload: { index: number; cardNumber: string };
    }
  | {
      type: 'SET_CREDIT_CARD_EXPIRY';
      payload: { index: number; expiryDate: string };
    }
  | { type: 'SET_CREDIT_CARDS'; payload: CreditCardData[] }
  | { type: 'DELETE_CREDIT_CARD'; payload: number }
  | { type: 'SET_INTEREST'; payload: string };

const initialState: CustomerFormData = {
  title: '',
  firstName: '',
  middleName: '',
  lastName: '',
  phoneNumber: '',
  emailAddress: '',
  preferredContact: 'email',
  postalType: 'street',
  postalPOBox: '',
  postalStreetAddress: '',
  postalCity: '',
  postalPostCode: '',
  postalCountry: '',
  creditCards: [],
  interests: [],
};

const formReducer = (
  state: CustomerFormData,
  action: Action
): CustomerFormData => {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_FIRST_NAME':
      return { ...state, firstName: action.payload };
    case 'SET_MIDDLE_NAME':
      return { ...state, middleName: action.payload };
    case 'SET_LAST_NAME':
      return { ...state, lastName: action.payload };
    case 'SET_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload };
    case 'SET_EMAIL_ADDRESS':
      return { ...state, emailAddress: action.payload };
    case 'SET_PREFERRED_CONTACT':
      return { ...state, preferredContact: action.payload };
    case 'SET_POSTAL_TYPE':
      return { ...state, postalType: action.payload };
    case 'SET_POSTAL_PO_BOX':
      return { ...state, postalPOBox: action.payload };
    case 'SET_POSTAL_STREET':
      return { ...state, postalStreetAddress: action.payload };
    case 'SET_POSTAL_CITY':
      return { ...state, postalCity: action.payload };
    case 'SET_POSTAL_POST_CODE':
      return { ...state, postalPostCode: action.payload };
    case 'SET_POSTAL_COUNTRY':
      return { ...state, postalCountry: action.payload };
    case 'SET_CREDIT_CARD_NAME':
      const updatedCreditCardsWithName = state.creditCards.map((card, index) =>
        index === action.payload.index
          ? { ...card, nameOnCard: action.payload.nameOnCard }
          : card
      );
      return { ...state, creditCards: updatedCreditCardsWithName };

    case 'SET_CREDIT_CARD_NUMBER':
      const updatedCreditCardsWithNumber = state.creditCards.map(
        (card, index) =>
          index === action.payload.index
            ? { ...card, cardNumber: action.payload.cardNumber }
            : card
      );
      return { ...state, creditCards: updatedCreditCardsWithNumber };

    case 'SET_CREDIT_CARD_EXPIRY':
      const updatedCreditCardsWithExpiry = state.creditCards.map(
        (card, index) =>
          index === action.payload.index
            ? { ...card, expiryDate: action.payload.expiryDate }
            : card
      );
      return { ...state, creditCards: updatedCreditCardsWithExpiry };
    case 'SET_CREDIT_CARDS':
      return { ...state, creditCards: action.payload };
    case 'DELETE_CREDIT_CARD':
      return {
        ...state,
        creditCards: state.creditCards.filter(
          (_, index) => index !== action.payload
        ),
      };
    case 'SET_INTEREST':
      const updatedInterests = state.interests.includes(action.payload)
        ? state.interests.filter((interest) => interest !== action.payload)
        : [...state.interests, action.payload];
      return { ...state, interests: updatedInterests };
    default:
      return state;
  }
};

function CustomerRegistrationForm({ onSubmit }: CustomerRegistrationFormProps) {
  const [formData, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addCreditCard = () => {
    if (formData.creditCards.length < 3) {
      dispatch({
        type: 'SET_CREDIT_CARDS',
        payload: [
          ...formData.creditCards,
          { nameOnCard: '', cardNumber: '', expiryDate: '' },
        ],
      });
    }
  };

  const deleteCreditCard = (index: number) => {
    dispatch({ type: 'DELETE_CREDIT_CARD', payload: index });
  };

  const toggleInterest = (interest: string) => {
    dispatch({ type: 'SET_INTEREST', payload: interest });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Registration Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <select
            value={formData.title}
            onChange={(e) =>
              dispatch({ type: 'SET_TITLE', payload: e.target.value })
            }
            className="border rounded p-2 w-1/6"
          >
            <option value="" disabled>
              Select Title
            </option>
            <option value="ms">Ms</option>
            <option value="mr">Mr</option>
            <option value="miss">Miss</option>
            <option value="mrs">Mrs</option>
            <option value="dr">Dr</option>
          </select>
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              dispatch({ type: 'SET_FIRST_NAME', payload: e.target.value })
            }
            className="border rounded p-2 w-1/4"
          />
          <input
            type="text"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={(e) =>
              dispatch({ type: 'SET_MIDDLE_NAME', payload: e.target.value })
            }
            className="border rounded p-2 w-1/4"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              dispatch({ type: 'SET_LAST_NAME', payload: e.target.value })
            }
            className="border rounded p-2 w-1/4"
          />
          <h2 className="text-lg font-semibold mb-2">Contact details</h2>
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) =>
              dispatch({ type: 'SET_PHONE_NUMBER', payload: e.target.value })
            }
            className="border rounded p-2 w-1/4"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.emailAddress}
            onChange={(e) =>
              dispatch({ type: 'SET_EMAIL_ADDRESS', payload: e.target.value })
            }
            className="border rounded p-2 w-1/4"
          />
          <h2 className="text-lg font-semibold mb-2">Preferred contact</h2>
          <div className="col-span-2">
            <label className="block mb-2" htmlFor="phone-radio-input">
              <input
                id="phone-radio-input"
                type="radio"
                value="phone"
                checked={formData.preferredContact === 'phone'}
                onChange={() =>
                  dispatch({ type: 'SET_PREFERRED_CONTACT', payload: 'phone' })
                }
                className="mr-2"
              />
              Phone
            </label>
            <label className="block mb-2" htmlFor="email-radio-input">
              <input
                id="email-radio-input"
                type="radio"
                value="email"
                checked={formData.preferredContact === 'email'}
                onChange={() =>
                  dispatch({ type: 'SET_PREFERRED_CONTACT', payload: 'email' })
                }
                className="mr-2"
              />
              Email
            </label>
          </div>
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-2">Address details</h2>
            <label className="block mb-2" htmlFor="poBox-radio">
              <input
                id="poBox-radio"
                type="radio"
                value="poBox"
                checked={formData.postalType === 'poBox'}
                onChange={() =>
                  dispatch({ type: 'SET_POSTAL_TYPE', payload: 'poBox' })
                }
                className="mr-2"
              />
              PO Box
            </label>
            <label className="block mb-2" htmlFor="street-radio">
              <input
                id="street-radio"
                type="radio"
                value="street"
                checked={formData.postalType === 'street'}
                onChange={() =>
                  dispatch({ type: 'SET_POSTAL_TYPE', payload: 'street' })
                }
                className="mr-2"
              />
              Street Address
            </label>
          </div>
          {formData.postalType === 'poBox' && (
            <div className="col-span-2">
              <input
                type="text"
                placeholder="PO Box"
                value={formData.postalPOBox}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_POSTAL_PO_BOX',
                    payload: e.target.value,
                  })
                }
                className="border rounded p-2 mr-2"
              />
              <input
                type="text"
                placeholder="City"
                value={formData.postalCity}
                onChange={(e) =>
                  dispatch({ type: 'SET_POSTAL_CITY', payload: e.target.value })
                }
                className="border rounded p-2 mr-2"
              />
              <input
                type="text"
                placeholder="Post Code"
                value={formData.postalPostCode}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_POSTAL_POST_CODE',
                    payload: e.target.value,
                  })
                }
                className="border rounded p-2 mr-2"
              />
              <input
                type="text"
                placeholder="Country"
                value={formData.postalCountry}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_POSTAL_COUNTRY',
                    payload: e.target.value,
                  })
                }
                className="border rounded p-2 mr-2"
              />
            </div>
          )}
          {formData.postalType === 'street' && (
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Street Address"
                value={formData.postalStreetAddress}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_POSTAL_STREET',
                    payload: e.target.value,
                  })
                }
                className="border rounded p-2 mr-2"
              />
              <input
                type="text"
                placeholder="City"
                value={formData.postalCity}
                onChange={(e) =>
                  dispatch({ type: 'SET_POSTAL_CITY', payload: e.target.value })
                }
                className="border rounded p-2 mr-2"
              />
              <input
                type="text"
                placeholder="Post Code"
                value={formData.postalPostCode}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_POSTAL_POST_CODE',
                    payload: e.target.value,
                  })
                }
                className="border rounded p-2 mr-2"
              />
              <input
                type="text"
                placeholder="Country"
                value={formData.postalCountry}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_POSTAL_COUNTRY',
                    payload: e.target.value,
                  })
                }
                className="border rounded p-2"
              />
            </div>
          )}
          <h2 className="text-lg font-semibold mb-2">Credit Card Details</h2>
          {formData.creditCards.map((card, index) => (
            <div key={index} className="border p-4 mb-4">
              <input
                type="text"
                placeholder="Name on Card"
                value={card.nameOnCard}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_CREDIT_CARD_NAME',
                    payload: { index, nameOnCard: e.target.value },
                  })
                }
                className="border rounded p-2 mb-2 mr-2"
              />
              <input
                type="text"
                placeholder="Card Number"
                value={card.cardNumber}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_CREDIT_CARD_NUMBER',
                    payload: { index, cardNumber: e.target.value },
                  })
                }
                className="border rounded p-2 mb-2 mr-2"
              />
              <input
                type="text"
                placeholder="Expiry Date"
                value={card.expiryDate}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_CREDIT_CARD_EXPIRY',
                    payload: { index, expiryDate: e.target.value },
                  })
                }
                className="border rounded p-2 mr-2"
              />
              <button
                type="button"
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => deleteCreditCard(index)}
              >
                Delete Card
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCreditCard}
            className="bg-green-500 text-white px-4 py-2 rounded w-1/12"
            disabled={formData.creditCards.length >= 3}
          >
            Add Credit Card
          </button>
          <h2 className="text-lg font-semibold mb-2 mt-4">Interests</h2>
          <label className="block mb-2" htmlFor="checkbox-sports">
            <input
              id="checkbox-sports"
              type="checkbox"
              value="sports"
              checked={formData.interests.includes('sports')}
              onChange={() => toggleInterest('sports')}
              className="mr-2"
            />
            Sports
          </label>
          <label className="block mb-2" htmlFor="checkbox-news">
            <input
              id="checkbox-news"
              type="checkbox"
              value="news"
              checked={formData.interests.includes('news')}
              onChange={() => toggleInterest('news')}
              className="mr-2"
            />
            News
          </label>
          <label className="block mb-2" htmlFor="checkbox-movies">
            <input
              id="checkbox-movies"
              type="checkbox"
              value="movies"
              checked={formData.interests.includes('movies')}
              onChange={() => toggleInterest('movies')}
              className="mr-2"
            />
            Movies
          </label>
          <label className="block mb-2" htmlFor="checkbox-comedy">
            <input
              id="checkbox-comedy"
              type="checkbox"
              value="comedy"
              checked={formData.interests.includes('comedy')}
              onChange={() => toggleInterest('comedy')}
              className="mr-2"
            />
            Comedy
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CustomerRegistrationForm;
