import { Component } from 'react';
import { Container } from './AppStyled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './FilterContacts';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  
formSubmitHandler = data => {
  const newContact = { ...data, id: nanoid() };
  this.state.contacts.find(
    ({ name }) => name.toLowerCase() === data.name.toLowerCase()
  )
    ? alert(`${data.name} is already in contacts`)
    : this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
};

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFiltredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContacts = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };
  render() {
    const { filter } = this.state;
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler}  />

        <h2>Contacts</h2>
        <Filter changeFilter={this.changeFilter} filter={filter} />
        <ContactList
          contacts={this.getFiltredContacts()}
          onDeleteContact={this.deleteContacts}
        />
      </Container>
    );
  }
}
