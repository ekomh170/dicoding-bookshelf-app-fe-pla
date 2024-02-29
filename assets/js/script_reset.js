  // Fungsi untuk mereset data
  function resetData() {
    // Hapus semua buku dari rak
    incompleteBookshelfList.innerHTML = "";
    completeBookshelfList.innerHTML = "";

    // Hapus data dari penyimpanan lokal
    localStorage.removeItem("incompleteBooks");
    localStorage.removeItem("completeBooks");
  }