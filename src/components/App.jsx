import { useState, useEffect } from 'react';
import shortid from 'shortid';

import { Box } from './Box';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import { initialContacts } from 'constants';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    return savedContacts.length ? savedContacts : initialContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const getFilteredContacts = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const addContact = ({ name, number }) => {
    setContacts(state => {
      return [
        ...state,
        {
          id: shortid.generate(),
          name,
          number,
        },
      ];
    });
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const updateFilter = e => {
    setFilter(e.target.value);
  };

  const filteredContacts = getFilteredContacts();
  return (
    <Box
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // fontSize: 40,
        // color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} onSubmit={addContact}></ContactForm>
      <h2>Contacts</h2>
      <Filter name={filter} onChange={updateFilter}></Filter>
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      ></ContactList>
    </Box>
  );
};
