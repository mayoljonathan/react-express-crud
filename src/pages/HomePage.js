import React from 'react';
import { Link } from "react-router-dom";
import UserList from '../components/UserList';
import User from '../models/User';
import UserAPI from '../api/UserAPI';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      users: [],
		};
		
		this.userAPI = new UserAPI();

		this.getUsers = this.getUsers.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}
	
	componentDidMount() {
		this.getUsers();
	}

	render() {
		const { isLoading } = this.state;

		return <div>
			<div className="flex flex-wrap justify-between items-center">
				<h1>List of Users</h1>
				<div>
					<button className="m-1" disabled={isLoading} onClick={this.getUsers}>Refresh</button>
					<Link to="/add-user">
						<button className="btn-primary m-1">Add User</button>
					</Link>
				</div>
			</div>
			
			<UserList
				users={this.state.users}
				isLoading={this.state.isLoading}
				onEdit={this.onEdit}
				onDelete={this.onDelete}
			/>
		</div>;
	}

	async getUsers() {
		this.setState({ isLoading: true });

		try {
			const response = await this.userAPI.getUsers();
			if (response.status === 200) {
				const users = response.data.data.map((user) => new User({ ...user }));
				this.setState({ users });
			}
			this.setState({ isLoading: false });
		} catch (e) {
			alert(e.toString());
			this.setState({ isLoading: false });
		}
	}

	onEdit(user) {
		this.props.history.push(`/edit-user/${user.id}`);
  }
  
  async onDelete(user) {
		const didConfirm = window.confirm(`Delete ${user.getFullName()}?`);

		if (didConfirm) {
			this.setState({ isLoading: true });
			
			try {
				await this.userAPI.deleteUser(user.id);
				this.getUsers();
			} catch (e) {
				this.setState({ isLoading: false });
				alert(e.response.data?.message);
			}
		}
  }
}

