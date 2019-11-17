import React, { useState, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const { name, email, phone, type } = contact;

  const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault();
    contactContext.addContact(contact);
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Add contact</h2>
      <input type="text" name="name" value={name} placeholder="Name" onChange={onChange} />
      <input type="email" name="email" value={email} placeholder="Email" onChange={onChange} />
      <input type="text" name="phone" value={phone} placeholder="Phone Number" onChange={onChange} />
      <h5>Contact type</h5>
      <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} /> Personal{' '}
      <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange} /> Professional
      <div>
        <input type="submit" value="Add contact" className="btn btn-primary btn-block" />
      </div>
    </form>
  )
}

export default ContactForm;