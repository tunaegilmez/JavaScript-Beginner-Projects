const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

// // UI Objesini Başlatma
// // const ui = new UI();
// // Storage Objesini Başlatma
// // const storage = new Storage();

// Tüm Eventleri Yükleme
eventListeners();

function eventListeners() {
  form.addEventListener("submit", addFilm);
  document.addEventListener("DOMContentLoaded", function () {
    let films = Storage.getFilmsFromStorage();
    UI.loadAllFilms(films);
  });
  cardbody.addEventListener("click", deleteFilm);
  clear.addEventListener("click", clearAllFilms);
}

function addFilm(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (!title || !director || !url) {
    // Hata
    UI.displayMessages("Tüm Alanları Doldurun", "danger");
  } else {
    // Yeni Film
    const newFilm = new Film(title, director, url);

    UI.addFilmToUI(newFilm); // Arayüze Film Ekleme
    Storage.addFilmToStorage(newFilm); // Storage'a Film Ekleme
    UI.displayMessages("Film Eklendi", "success");
  }

  UI.clearInputs(titleElement, urlElement, directorElement);

  e.preventDefault();
}

function deleteFilm(e) {
  // console.log(e.target);
  if (e.target.id === "delete-film") {
    UI.deleteFilmFromUI(e.target);
    Storage.deleteFilmFromStorage(
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent
    );
    // console.log(
    //   e.target.parentElement.previousElementSibling.previousElementSibling
    //     .textContent
    // );

    UI.displayMessages("Silme işlemi başarılı.", "success");
  }
}

function clearAllFilms(e) {
  let hasFilms = localStorage.key("films");

  // console.log(hasFilms);

  if (!hasFilms) {
    UI.displayMessages("Listede zaten film yok", "warning");
  } else if (confirm("Tüm Filmler Kaldırılacak!")) {
    UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
  }
}
