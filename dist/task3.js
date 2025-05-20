"use strict";
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
class User {
    constructor(email, password) {
        this.id = User._idCounter++;
        this.email = email;
        if (!this.validatePassword(password)) {
            console.log("Password too short!");
            this._password = "";
        }
        else {
            this._password = password;
        }
    }
    changePassword(newPassword) {
        if (!this.validatePassword(newPassword)) {
            console.log("Password too short!");
        }
        else {
            this._password = newPassword;
        }
    }
    get passwordPreview() {
        if (this._password.length < 2)
            return this._password;
        return (this._password[0] +
            "•".repeat(this._password.length - 2) +
            this._password[this._password.length - 1]);
    }
    validatePassword(pw) {
        return pw.length >= 6;
    }
}
User._idCounter = 1000;
class Admin extends User {
    constructor(email, password) {
        super(email, password);
        this.isActive = true;
    }
    showProfile() {
        if (this.isActive) {
            console.log(`https://softserve/profile/${this.id}`);
        }
        else {
            console.log("https://softserve/login");
        }
    }
    print() {
        console.log("Admin");
    }
    updatePassword(newPassword) {
        this.changePassword(newPassword);
    }
}
const admin = new Admin('admin@gmail.com', 'Qwerty');
admin.updatePassword('Weak'); // Too short
console.log(admin.passwordPreview); // Q••••y
admin.updatePassword('Super-Pass'); // Valid
console.log(admin.passwordPreview); // S••••••••s
admin.showProfile(); // https://softserve/profile/1000
admin.isActive = false;
admin.showProfile(); // https://softserve/login
admin.print(); // Admin
