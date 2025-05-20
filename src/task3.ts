// Create classes that simulate a basic user management system with a user and an admin.
// There is an abstract class User with the following members:
// · id - unique integer number that starts from 1000 and increments for each user instance; cannot be changed after initialization
// · email - user's email address
// · password - user's password, only accessible inside this class
// · passwordPreview - getter for the password
// · changePassword - method that takes a new password and sets it to the class, only accessible inside this and derived classes
// · showProfile - empty method that must be implemented in derived classes
// The user password must contain at least 6 characters; otherwise, show the message: "Password too short!".
// The passwordPreview getter returns the password but shows only the first and the last characters, with all the other characters replaced by the '•' character. For example: "Qwerty" would be displayed as "Q••••y".
// There is also a class Admin that extends the User class and implements the Printable interface.
// This class has isActive boolean property and realises the showProfile method, which logs a URL address to the console depending on the active status:
// · active: "https://softserve/profile/{user_id}"
// · inactive: "https://softserve/login"
// The Printable interface has a print method that is used to display the class name in the console.

interface Printable {
  print(): void;
}

abstract class User {
  private static _idCounter = 1000;
  public readonly id: number;
  public email: string;
  private _password: string;

  constructor(email: string, password: string) {
    this.id = User._idCounter++;
    this.email = email;

    if (!this.validatePassword(password)) {
      console.log("Password too short!");
      this._password = "";
    } else {
      this._password = password;
    }
  }

  protected changePassword(newPassword: string): void {
    if (!this.validatePassword(newPassword)) {
      console.log("Password too short!");
    } else {
      this._password = newPassword;
    }
  }

  get passwordPreview(): string {
    if (this._password.length < 2) return this._password;
    return (
      this._password[0] +
      "•".repeat(this._password.length - 2) +
      this._password[this._password.length - 1]
    );
  }

  private validatePassword(pw: string): boolean {
    return pw.length >= 6;
  }

  abstract showProfile(): void;
}

class Admin extends User implements Printable {
  public isActive: boolean = true;

  constructor(email: string, password: string) {
    super(email, password);
  }

  public override showProfile(): void {
    if (this.isActive) {
      console.log(`https://softserve/profile/${this.id}`);
    } else {
      console.log("https://softserve/login");
    }
  }

  public print(): void {
    console.log("Admin");
  }

  public updatePassword(newPassword: string) {
    this.changePassword(newPassword);
  }
}

const admin = new Admin('admin@gmail.com', 'Qwerty');

admin.updatePassword('Weak');
console.log(admin.passwordPreview);

admin.updatePassword('Super-Pass');
console.log(admin.passwordPreview);

admin.showProfile();
admin.isActive = false;
admin.showProfile();

admin.print();

