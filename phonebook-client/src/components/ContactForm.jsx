import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/ContactForm.css";

const ContactForm = ({ fetchContacts, currentContact, setCurrentContact }) => {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Efecto para actualizar el formulario cuando se selecciona un contacto para editar
  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name);
      setLastName(currentContact.lastname);
      setAge(currentContact.age);
      setEmail(currentContact.email);
      setPhone(currentContact.phone);
    }
  }, [currentContact]);
  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentContact) {
        // Actualizar contacto existente
        await axios.patch(
          `http://localhost:3001/contacts/${currentContact._id}`,
          { name, lastname, age, email, phone }
        );
        setCurrentContact(null);
      } else {
        // Crear nuevo contacto
        await axios.post("http://localhost:3001/contacts", {
          name,
          lastname,
          age,
          email,
          phone,
        });
      }
      fetchContacts();
      setName("");
      setLastName("");
      setAge("");
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error("Error saving contact", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label> Last Name</label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <button type="submit">
        {currentContact ? "Update Contact" : "Add Contact"}
      </button>
    </form>
  );
};
export default ContactForm;
