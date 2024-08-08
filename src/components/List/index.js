import React, { useState } from "react";

function List({ contacts }) {
  const [filterText, setFilterText] = useState("");

  const filtered = contacts.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filterText.toLocaleLowerCase())
    );
  });

  console.log(filtered, "filtered");

  return (
    <div>
      <input className="inputs"
        value={filterText}
        placeholder="  Filter contacts"
        onChange={(e) => {
          setFilterText(e.target.value);
        }}
      />

      <ul>
        {filtered.map((contact, i) => (
          <li key={i}>
            <span>{contact.fullname}</span>
            <span>{contact.phone_number}</span>
          </li>
        ))}
      </ul>
      <span>Total contacts:{filtered.length}</span>
    </div>
  );
}

export default List;
