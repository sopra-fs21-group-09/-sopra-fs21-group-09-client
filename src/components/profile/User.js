/**
 * User model TODO: where to place user?
 */
class User {
  constructor(data = {}) {

    this.id = null;
    this.username = null;
    this.token = null;
    this.name = null;
    this.password = null;
    this.color_coding = null;
    this.birthday = null;
    this.matrikel_nr = null;

    Object.assign(this, data);

  }
}
export default User;
