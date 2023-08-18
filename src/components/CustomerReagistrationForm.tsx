import React, { useState } from 'react';

interface CustomerRegistrationFormProps {
  onSubmit: (data: CustomerFormData) => void;
}

interface CustomerFormData {
  firstName: string;
  middleName: string;
  lastName: string;
}

const initialCustomerFormData: CustomerFormData = {
  firstName: '',
  middleName: '',
  lastName: '',
};

function CustomerRegistrationForm({ onSubmit }: CustomerRegistrationFormProps) {
  const [formData, setFormData] = useState<CustomerFormData>(
    initialCustomerFormData
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof CustomerFormData
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => handleChange(e, 'firstName')}
            className="border rounded p-2 w-1/3"
          />
          <input
            type="text"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={(e) => handleChange(e, 'middleName')}
            className="border rounded p-2 w-1/3"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => handleChange(e, 'lastName')}
            className="border rounded p-2 w-1/3"
          />
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
