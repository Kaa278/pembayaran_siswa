// Riwayat JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check login
    if (!checkLogin()) return;
    
    // Update user display
    updateUserDisplay();
    
    // Load history data
    loadHistoryData();
    
    // Initialize search
    initSearch();
    
    // Initialize export buttons
    initExportButtons();
});

// Load history data
function loadHistoryData() {
    // Sample data
    const historyData = [
        { tanggal: "5 April 2024", jenis: "SPP April 2024", metode: "Transfer Bank", jumlah: "Rp 350.000", status: "Lunas" },
        { tanggal: "3 Maret 2024", jenis: "SPP Maret 2024", metode: "Transfer Bank", jumlah: "Rp 350.000", status: "Lunas" },
        { tanggal: "10 Februari 2024", jenis: "Uang Kegiatan", metode: "Tunai", jumlah: "Rp 200.000", status: "Lunas" },
        { tanggal: "2 Februari 2024", jenis: "SPP Februari 2024", metode: "Transfer Bank", jumlah: "Rp 350.000", status: "Lunas" },
        { tanggal: "5 Januari 2024", jenis: "SPP Januari 2024", metode: "Virtual Account", jumlah: "Rp 350.000", status: "Lunas" },
        { tanggal: "10 Desember 2023", jenis: "Uang Gedung", metode: "Transfer Bank", jumlah: "Rp 500.000", status: "Lunas" }
    ];
    
    // Populate history table
    const historyTable = document.getElementById('historyTable');
    if (historyTable) {
        historyTable.innerHTML = '';
        
        historyData.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.tanggal}</td>
                <td>${transaction.jenis}</td>
                <td>${transaction.metode}</td>
                <td>${transaction.jumlah}</td>
                <td><span class="status success">${transaction.status}</span></td>
                <td>
                    <button class="btn btn-outline btn-sm" onclick="viewProof('${transaction.jenis}')">
                        Lihat
                    </button>
                </td>
                <td>
                    <button class="btn btn-outline btn-sm" onclick="downloadReceipt('${transaction.jenis}')">
                        <i class="fas fa-download"></i>
                    </button>
                </td>
            `;
            historyTable.appendChild(row);
        });
    }
}

// Initialize search
function initSearch() {
    const searchInput = document.getElementById('searchHistory');
    const prevPage = document.getElementById('prevPage');
    const nextPage = document.getElementById('nextPage');
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // In a real app, this would filter the table
            if (searchTerm) {
                showNotification(`Mencari: ${searchTerm}`, 'info');
            }
        });
    }
    
    // Pagination
    if (prevPage) {
        prevPage.addEventListener('click', function() {
            showNotification('Navigasi ke halaman sebelumnya', 'info');
        });
    }
    
    if (nextPage) {
        nextPage.addEventListener('click', function() {
            showNotification('Navigasi ke halaman berikutnya', 'info');
        });
    }
}

// Initialize export buttons
function initExportButtons() {
    const exportPDF = document.getElementById('exportPDF');
    const exportExcel = document.getElementById('exportExcel');
    const exportPrint = document.getElementById('exportPrint');
    
    // Export to PDF
    if (exportPDF) {
        exportPDF.addEventListener('click', function() {
            showNotification('Mengexport data ke PDF...', 'info');
            // In a real app, this would generate and download PDF
            setTimeout(() => {
                showNotification('Export PDF berhasil!', 'success');
            }, 1500);
        });
    }
    
    // Export to Excel
    if (exportExcel) {
        exportExcel.addEventListener('click', function() {
            showNotification('Mengexport data ke Excel...', 'info');
            // In a real app, this would generate and download Excel
            setTimeout(() => {
                showNotification('Export Excel berhasil!', 'success');
            }, 1500);
        });
    }
    
    // Print
    if (exportPrint) {
        exportPrint.addEventListener('click', function() {
            window.print();
        });
    }
}

// View proof
function viewProof(transactionName) {
    showNotification(`Melihat bukti pembayaran: ${transactionName}`, 'info');
    // In a real app, show modal with proof image
}

// Download receipt
function downloadReceipt(transactionName) {
    showNotification(`Mendownload kwitansi: ${transactionName}`, 'info');
    // In a real app, download receipt PDF
}