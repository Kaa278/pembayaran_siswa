// Tagihan JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check login
    if (!checkLogin()) return;
    
    // Update user display
    updateUserDisplay();
    
    // Load bills data
    loadBillsData();
    
    // Initialize filters
    initFilters();
});

// Load bills data
function loadBillsData() {
    // Sample data
    const billsData = [
        { id: 1, jenis: "SPP April 2024", bulan: "April 2024", jatuhTempo: "10 April 2024", jumlah: "Rp 350.000", status: "Lunas" },
        { id: 2, jenis: "Uang Gedung", bulan: "April 2024", jatuhTempo: "15 April 2024", jumlah: "Rp 500.000", status: "Menunggu Verifikasi" },
        { id: 3, jenis: "SPP Mei 2024", bulan: "Mei 2024", jatuhTempo: "10 Mei 2024", jumlah: "Rp 350.000", status: "Belum Dibayar" },
        { id: 4, jenis: "Uang Praktikum", bulan: "Mei 2024", jatuhTempo: "20 Mei 2024", jumlah: "Rp 150.000", status: "Belum Dibayar" },
        { id: 5, jenis: "SPP Maret 2024", bulan: "Maret 2024", jatuhTempo: "10 Maret 2024", jumlah: "Rp 350.000", status: "Lunas" },
        { id: 6, jenis: "Uang Kegiatan", bulan: "Februari 2024", jatuhTempo: "10 Februari 2024", jumlah: "Rp 200.000", status: "Lunas" }
    ];
    
    const statusMap = {
        "Lunas": "success",
        "Menunggu Verifikasi": "warning",
        "Belum Dibayar": "danger"
    };
    
    // Populate bills table
    const billsTable = document.getElementById('allBillsTable');
    if (billsTable) {
        billsTable.innerHTML = '';
        
        billsData.forEach((bill, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${bill.jenis}</td>
                <td>${bill.bulan}</td>
                <td>${bill.jatuhTempo}</td>
                <td>${bill.jumlah}</td>
                <td><span class="status ${statusMap[bill.status]}">${bill.status}</span></td>
                <td>
                    <div class="action-buttons">
                        ${bill.status === 'Lunas' ? 
                            `<button class="btn btn-outline btn-sm" onclick="viewBillDetail(${bill.id})">Detail</button>` : 
                        bill.status === 'Menunggu Verifikasi' ? 
                            `<button class="btn btn-warning btn-sm" onclick="checkVerification(${bill.id})">Cek Status</button>` :
                        bill.status === 'Belum Dibayar' ? 
                            `<button class="btn btn-primary btn-sm" onclick="payNow(${bill.id})">Bayar</button>` : ''}
                    </div>
                </td>
            `;
            billsTable.appendChild(row);
        });
    }
}

// Initialize filters
function initFilters() {
    const filterStatus = document.getElementById('filterStatus');
    const filterMonth = document.getElementById('filterMonth');
    const filterYear = document.getElementById('filterYear');
    const applyFilter = document.getElementById('applyFilter');
    const refreshBills = document.getElementById('refreshBills');
    const printBills = document.getElementById('printBills');
    
    // Apply filter
    if (applyFilter) {
        applyFilter.addEventListener('click', function() {
            const status = filterStatus?.value;
            const month = filterMonth?.value;
            const year = filterYear?.value;
            
            // In a real app, this would filter the data
            showNotification(`Filter diterapkan: Status=${status}, Bulan=${month}, Tahun=${year}`, 'info');
        });
    }
    
    // Refresh bills
    if (refreshBills) {
        refreshBills.addEventListener('click', function() {
            loadBillsData();
            showNotification('Data tagihan diperbarui', 'success');
        });
    }
    
    // Print bills
    if (printBills) {
        printBills.addEventListener('click', function() {
            window.print();
        });
    }
}

// View bill detail
function viewBillDetail(billId) {
    showNotification(`Melihat detail tagihan #${billId}`, 'info');
    // In a real app, show modal with bill details
}

// Check verification
function checkVerification(billId) {
    showNotification(`Memeriksa status verifikasi tagihan #${billId}`, 'info');
    // In a real app, check verification status
}

// Pay now
function payNow(billId) {
    window.location.href = `bayar.html?bill=${billId}`;
}