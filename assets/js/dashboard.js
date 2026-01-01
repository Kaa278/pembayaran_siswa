// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check login
    if (!checkLogin()) return;
    
    // Update user display
    updateUserDisplay();
    
    // Load dashboard data
    loadDashboardData();
});

// Load dashboard data
function loadDashboardData() {
    // Sample data
    const recentBills = [
        { jenis: "SPP April 2024", jatuhTempo: "10 April 2024", jumlah: "Rp 350.000", status: "Lunas", aksi: "lihat" },
        { jenis: "Uang Gedung", jatuhTempo: "15 April 2024", jumlah: "Rp 500.000", status: "Menunggu Verifikasi", aksi: "upload" },
        { jenis: "SPP Mei 2024", jatuhTempo: "10 Mei 2024", jumlah: "Rp 350.000", status: "Belum Dibayar", aksi: "bayar" },
        { jenis: "Uang Praktikum", jatuhTempo: "20 Mei 2024", jumlah: "Rp 150.000", status: "Belum Dibayar", aksi: "bayar" }
    ];
    
    const statusMap = {
        "Lunas": "success",
        "Menunggu Verifikasi": "warning",
        "Belum Dibayar": "danger"
    };
    
    // Populate recent bills table
    const recentBillsTable = document.getElementById('recentBills');
    if (recentBillsTable) {
        recentBillsTable.innerHTML = '';
        
        recentBills.forEach(bill => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bill.jenis}</td>
                <td>${bill.jatuhTempo}</td>
                <td>${bill.jumlah}</td>
                <td><span class="status ${statusMap[bill.status]}">${bill.status}</span></td>
                <td>
                    ${bill.aksi === 'lihat' ? '<button class="btn btn-outline btn-sm" onclick="viewBill(1)">Lihat</button>' : ''}
                    ${bill.aksi === 'upload' ? '<button class="btn btn-warning btn-sm" onclick="uploadProof(2)">Upload Bukti</button>' : ''}
                    ${bill.aksi === 'bayar' ? '<button class="btn btn-primary btn-sm" onclick="payBill(3)">Bayar</button>' : ''}
                </td>
            `;
            recentBillsTable.appendChild(row);
        });
    }
}

// View bill details
function viewBill(billId) {
    // In a real app, this would fetch bill details
    showNotification(`Melihat detail tagihan #${billId}`, 'info');
}

// Upload proof
function uploadProof(billId) {
    // Redirect to payment page
    window.location.href = 'bayar.html?bill=' + billId;
}

// Pay bill
function payBill(billId) {
    // Redirect to payment page
    window.location.href = 'bayar.html?bill=' + billId;
}