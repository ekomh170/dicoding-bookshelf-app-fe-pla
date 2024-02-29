// Fungsi untuk menambahkan data dummy buku
function addDummyData(addBook) {
    const dummyBooks = [
      { "title": "Laskar Pelangi", "author": "Andrea Hirata", "year": 2005, "isComplete": true },
      { "title": "Ayat-Ayat Cinta", "author": "Habiburrahman El Shirazy", "year": 2004, "isComplete": true },
      { "title": "Bumi Manusia", "author": "Pramoedya Ananta Toer", "year": 1980, "isComplete": true },
      { "title": "Perahu Kertas", "author": "Dewi Lestari (Dee)", "year": 2008, "isComplete": true },
      { "title": "Ronggeng Dukuh Paruk", "author": "Ahmad Tohari", "year": 1982, "isComplete": true },
      { "title": "Pulang", "author": "Tere Liye", "year": 2014, "isComplete": false },
      { "title": "Supernova: Akar", "author": "Dee Lestari", "year": 2001, "isComplete": false },
      { "title": "5 cm", "author": "Donny Dhirgantoro", "year": 2005, "isComplete": false },
      { "title": "Surga yang Tak Dirindukan", "author": "Asma Nadia", "year": 2013, "isComplete": false },
      { "title": "Filosofi Kopi", "author": "Dee Lestari", "year": 2012, "isComplete": false },
    ];
  
    dummyBooks.forEach((book) => {
      addBook(book.title, book.author, book.year, book.isComplete);
    });
  }
  