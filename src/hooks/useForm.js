import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = function (event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    try {
      event.preventDefault();
      callback();
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
