import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // check if number and convert
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(e.target.value);
    }
    setValues({
      // copy existing values into it
      ...values,
      // update value that changed
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
}
