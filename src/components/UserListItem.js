import React from 'react';
import PropTypes from 'prop-types';
import User from '../models/User';

export default class UserListItem extends React.Component {
  render() {
    const { user, onEdit, onDelete } = this.props;

    return <React.Fragment>
      <td className="text-center">{user.id}</td>
      <td className="text-center">{user.getFullName()}</td>
      <td className="text-center">
        <button className="my-2 mx-2" onClick={() => onEdit(user)}>Edit</button>
        <button className="btn-danger my-2" onClick={() => onDelete(user)}>Delete</button>
      </td>
    </React.Fragment>
  }
}

UserListItem.propTypes = {
  user: PropTypes.instanceOf(User).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
