class Storage {
  static getSearchedUsersFromStorage() {
    //Tüm kullanıcıları al
    let users;

    if (!localStorage.getItem("searched")) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("searched"));
    }

    return users;
  }

  static addSearchedUserToStorage(username) {
    //Kullanıcı ekle
    let users = this.getSearchedUsersFromStorage();

    if (users.indexOf(username) === -1) {
      users.push(username);
    }

    localStorage.setItem("searched", JSON.stringify(users));
  }

  static clearAllSearchedUsersFromStorage() {
    //Tüm kullanıcıları sil
    localStorage.removeItem("searched");
  }
}
