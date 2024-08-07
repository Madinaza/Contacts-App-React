import React, { useEffect, useState } from "react";

const initialFormValue = { fullname: "", phone_number: "" };

function Form({ addContacts, contacts }) {
  const [form, setForm] = useState(initialFormValue);

  useEffect(() => {
    setForm(initialFormValue);
  }, [contacts]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (form.fullname === "" || form.phone_number === "") {
      return false;
    }

    addContacts([...contacts, form]);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          name="fullname"
          value={form.fullname}
          onChange={onChange}
          placeholder="FullName:"
        />
      </div>
      <div>
        <input
          name="phone_number"
          value={form.phone_number}
          onChange={onChange}
          placeholder="Phone Number:"
        />
      </div>
      <div>
        <button className="btn">Add</button>
      </div>
    </form>
  );
}

export default Form;
