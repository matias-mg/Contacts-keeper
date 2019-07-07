import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  SET_ALERT,
  REMOVE_ALERT
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Pep Pepsodent',
        email: 'pep@gmail.com',
        phone: '222-222-2222',
        type: 'professional'
      },
      {
        id: 1,
        name: 'Leonardo Dicaprio',
        email: 'leo@gmail.com',
        phone: '333-333-3333',
        type: 'professional'
      },
    ]
  }

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact

  // Delete contact

  // Set current contact

  // Clear current contact

  // Update contact

  // Filter contacts

  // Clear filter

  return (
    <ContactContext.Provider
    value={{
      contacts: state.contacts
    }}>
      <props.children></props.children>
    </ContactContext.Provider>
  )
}

export default ContactState;