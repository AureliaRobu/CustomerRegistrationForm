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
}

type Action =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_FIRST_NAME'; payload: string }
  | { type: 'SET_MIDDLE_NAME'; payload: string }
  | { type: 'SET_LAST_NAME'; payload: string }
  | { type: 'SET_PHONE_NUMBER'; payload: string }
  | { type: 'SET_EMAIL_ADDRESS'; payload: string }
  | { type: 'SET_PREFERRED_CONTACT'; payload: 'phone' | 'email' };

const initialState: CustomerFormData = {
  title: '',
  firstName: '',
  middleName: '',
  lastName: '',
  phoneNumber: '',
  emailAddress: '',
  preferredContact: 'email',
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Registration Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        <div className="flex flex-col space-y-4">
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
