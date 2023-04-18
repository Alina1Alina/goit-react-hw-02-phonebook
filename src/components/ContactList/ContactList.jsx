import { Component } from 'react';
import { DeleteItem, Span } from './StyledListContact';
import PropTypes from 'prop-types';

export class ContactList extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.contacts.map(({ id, name, number }) => (
            <li key={id}>
              <Span>
                {name}: {number}
              </Span>
              <DeleteItem
                type="button"
                onClick={() => this.props.onDeleteContact(id)}
              >
                Delete
              </DeleteItem>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
};
