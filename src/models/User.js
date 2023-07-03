class User {
  constructor({ id, firstName, lastName }) {
    Object.assign(this, { id, firstName, lastName });
  }
  
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default User;
