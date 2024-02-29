// Menunggu hingga DOM dimuat
document.addEventListener("DOMContentLoaded", function () {
  // Mendapatkan referensi ke elemen-elemen HTML yang diperlukan
  const inputBookForm = document.getElementById("inputBook");
  const inputBookTitle = document.getElementById("inputBookTitle");
  const inputBookAuthor = document.getElementById("inputBookAuthor");
  const inputBookYear = document.getElementById("inputBookYear");
  const inputBookIsComplete = document.getElementById("inputBookIsComplete");
  const incompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
  );
  const completeBookshelfList = document.getElementById(
    "completeBookshelfList"
  );
  const searchBookForm = document.getElementById("searchBook");
  const resetDataButton = document.getElementById("resetDataButton");

  const addDummyDataButton = document.getElementById("addDummyDataButton");

  // Fungsi untuk membuat tampilan buku dalam DOM
  function makeBook(id, title, author, year, isComplete) {
    const book = document.createElement("article");
    book.classList.add("book_item");
    book.dataset.bookid = id; // Set data-bookid attribute
    // Mengatur isi HTML untuk tampilan buku
    book.innerHTML = `
      <h3>${title}</h3>
      <p>Penulis: ${author}</p>
      <p>Tahun: ${year}</p>
      <div class="action">
        <button class="${isComplete ? "green" : "red"}">${
      isComplete ? "Belum selesai di Baca" : "Selesai dibaca"
    }</button>
        <button class="remove">Hapus buku</button>
      </div>
    `;
    // Menambahkan event listener untuk tombol hapus
    const removeButton = book.querySelector(".remove");
    removeButton.addEventListener("click", function () {
      removeBook(id);
    });
    // Menambahkan event listener untuk tombol ubah status
    const statusButton = book.querySelector(".action button");
    statusButton.addEventListener("click", function () {
      changeBookStatus(id);
    });
    return book;
  }

  // Fungsi untuk menambahkan buku ke rak yang sesuai
  function addBookToShelf(book, isComplete) {
    const shelf = isComplete ? completeBookshelfList : incompleteBookshelfList;
    shelf.appendChild(book);
  }

  // Fungsi untuk menambahkan buku baru
  function addBook(title, author, year, isComplete) {
    const timestamp = +new Date();
    
    const book = {
      id: timestamp,
      title: title,
      author: author,
      // Mengubah tahun tipe data menjadi number
      year: parseInt(year),
      isComplete: isComplete,
    };

    const bookElement = makeBook(timestamp, title, author, year, isComplete);
    addBookToShelf(bookElement, isComplete);
    updateLocalStorage();
  }

  // Fungsi untuk menghapus buku dari rak
  function removeBook(id) {
    const confirmation = confirm("Apakah Anda yakin ingin menghapus buku ini?");
    if (confirmation) {
      const bookElement = document.querySelector(
        `article[data-bookid="${id}"]`
      );
      bookElement.parentElement.removeChild(bookElement);
      updateLocalStorage();
    }
  }

  // Fungsi untuk mengubah status bacaan buku
  function changeBookStatus(id) {
    const bookElement = document.querySelector(`article[data-bookid="${id}"]`);
    const isComplete = !bookElement
      .querySelector(".action button")
      .classList.contains("green");

    const statusButton = bookElement.querySelector(".action button");
    statusButton.textContent = isComplete ? "Belum selesai di Baca" : "Selesai dibaca";
    statusButton.classList.toggle("green");
    statusButton.classList.toggle("red");
  
    const shelf = isComplete ? completeBookshelfList : incompleteBookshelfList;
    shelf.appendChild(bookElement);
  
    updateLocalStorage();
  }

  // Fungsi untuk menyimpan data buku ke penyimpanan lokal
  function updateLocalStorage() {
    const incompleteBooks = [];
    const completeBooks = [];

    // Mendapatkan data dari rak buku yang belum lengkap
    incompleteBookshelfList.querySelectorAll("article").forEach((book) => {
      const id = book.dataset.bookid;
      const title = book.querySelector("h3").innerText;
      const author = book
        .querySelector("p:nth-of-type(1)")
        .innerText.split(": ")[1];
      const year = book
        .querySelector("p:nth-of-type(2)")
        .innerText.split(": ")[1];
      const isComplete = false;
      incompleteBooks.push({ id, title, author, year, isComplete });
    });

    // Mendapatkan data dari rak buku yang sudah lengkap
    completeBookshelfList.querySelectorAll("article").forEach((book) => {
      const id = book.dataset.bookid;
      const title = book.querySelector("h3").innerText;
      const author = book
        .querySelector("p:nth-of-type(1)")
        .innerText.split(": ")[1];
      const year = book
        .querySelector("p:nth-of-type(2)")
        .innerText.split(": ")[1];
      const isComplete = true;
      completeBooks.push({ id, title, author, year, isComplete });
    });

    // Menyimpan data ke penyimpanan lokal sebagai string JSON
    localStorage.setItem("incompleteBooks", JSON.stringify(incompleteBooks));
    localStorage.setItem("completeBooks", JSON.stringify(completeBooks));
  }

  // Event Listener untuk menambahkan buku
  inputBookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = inputBookTitle.value;
    const author = inputBookAuthor.value;
    const year = inputBookYear.value;
    const isComplete = inputBookIsComplete.checked;
    addBook(title, author, year, isComplete);
    inputBookForm.reset();
  });

  // Event Listener untuk mencari buku
  searchBookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const searchTitle = document
      .getElementById("searchBookTitle")
      .value.trim()
      .toLowerCase();
    searchBooks(searchTitle);
  });

  // Event Listener untuk mereset data
  resetDataButton.addEventListener("click", function () {
    resetData();
  });

  // Event Listener untuk menambahkan data dummy buku
  addDummyDataButton.addEventListener("click", function () {
    addDummyData(addBook); // Memanggil fungsi addDummyData dengan fungsi addBook sebagai argumen
  });

  // Fungsi untuk mencari buku berdasarkan judul
  function searchBooks(title) {
    const allBooks = document.querySelectorAll(".book_item");
    allBooks.forEach((book) => {
      const bookTitle = book.querySelector("h3").innerText.trim().toLowerCase();
      if (bookTitle.includes(title)) {
        book.style.display = "block";
      } else {
        book.style.display = "none";
      }
    });
  }

  // Fungsi untuk memuat buku dari penyimpanan lokal saat halaman dimuat
  function loadBooks() {
    const incompleteBooks =
      JSON.parse(localStorage.getItem("incompleteBooks")) || [];
    const completeBooks =
      JSON.parse(localStorage.getItem("completeBooks")) || [];

    incompleteBooks.forEach((book) => {
      const bookElement = makeBook(
        book.id,
        book.title,
        book.author,
        book.year,
        book.isComplete
      );
      addBookToShelf(bookElement, false);
    });

    completeBooks.forEach((book) => {
      const bookElement = makeBook(
        book.id,
        book.title,
        book.author,
        book.year,
        book.isComplete
      );
      addBookToShelf(bookElement, true);
    });
  }

  // Memuat buku dari penyimpanan lokal saat halaman dimuat
  loadBooks();
});
