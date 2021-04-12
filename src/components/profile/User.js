/**
 * User model TODO: where to place user?
 */
class User {
  constructor(data = {}) {

    this.id = null;
    this.username = null;
    this.token = null;
    this.status = null;
    this.password = null;
    this.matrikel_nr = null;
    this.color_coding = null;

/*  These are not necessary at the moment
    this.creationDate = null;
    this.birthday = null;
*/

    Object.assign(this, data);
  }
}
export default User;
