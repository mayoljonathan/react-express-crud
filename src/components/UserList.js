import React from 'react';
import PropTypes from 'prop-types';
import User from '../models/User';
import UserListItem from './UserListItem';
import InfoText from './InfoText';

export default class UserList extends React.Component {
  render() {
    const { isLoading, users, onEdit, onDelete } = this.props;

    const hasUsers = users.length > 0;
    const UserTable = (
      <table>
        <thead>
          <tr>
            <th key="id">ID</th>
            <th key="name">Name</th>
            <th key="action">Action</th>
          </tr>
        </thead>
        <tbody>
          { users.map(user => 
              <tr key={user.id}>
                <UserListItem 
                  user={user} 
                  onEdit={onEdit} 
                  onDelete={onDelete}
                />
              </tr>
            )
          }
        </tbody>
      </table>
    );
    
    return <div style={{padding: `24px 0px`}}>
      { isLoading 
        ? <InfoText message='Loading ...'/>
        : !hasUsers ? <InfoText message='No data available'/> : UserTable
      } 
    </div>;
  }
}

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(User)).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};