// Bayar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check login
    if (!checkLogin()) return;
    
    // Update user display
    updateUserDisplay();
    
    // Initialize payment form
    initPaymentForm();
    
    // Initialize file upload
    initFileUpload();
    
    // Check for bill parameter in URL
    checkUrlParams();
});

// Initialize payment form
function initPaymentForm() {
    const selectBill = document.getElementById('selectBill');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const submitPayment = document.getElementById('submitPayment');
    const bankDetails = document.getElementById('bankDetails');
    
    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide bank details based on method
            const selectedMethod = this.dataset.method;
            if (bankDetails) {
                if (selectedMethod === 'transfer') {
                    bankDetails.style.display = 'block';
                } else {
                    bankDetails.style.display = 'none';
                }
            }
        });
    });
    
    // Submit payment
    if (submitPayment) {
        submitPayment.addEventListener('click', function() {
            const selectedBill = selectBill?.value;
            const paymentProof = document.getElementById('paymentProof');
            const paymentDate = document.getElementById('paymentDate')?.value;
            const paymentNote = document.getElementById('paymentNote')?.value;
            const selectedMethod = document.querySelector('.payment-method.active')?.dataset.method;
            
            // Validation
            if (!selectedBill) {
                showNotification('Pilih tagihan yang akan dibayar!', 'error');
                return;
            }
            
            if (!paymentProof?.files?.length) {
                showNotification('Upload bukti pembayaran!', 'error');
                return;
            }
            
            if (!paymentDate) {
                showNotification('Isi tanggal pembayaran!', 'error');
                return;
            }
            
            // Simulate payment submission
            simulatePaymentSubmission(selectedBill, selectedMethod, paymentDate, paymentNote);
        });
    }
}

// Initialize file upload
function initFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const paymentProof = document.getElementById('paymentProof');
    const filePreview = document.getElementById('filePreview');
    
    if (uploadArea && paymentProof) {
        // Click to upload
        uploadArea.addEventListener('click', () => paymentProof.click());
        
        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#4361ee';
            uploadArea.style.backgroundColor = 'rgba(67, 97, 238, 0.05)';
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '#e9ecef';
            uploadArea.style.backgroundColor = 'transparent';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#e9ecef';
            uploadArea.style.backgroundColor = 'transparent';
            
            if (e.dataTransfer.files.length) {
                paymentProof.files = e.dataTransfer.files;
                handleFileSelect(paymentProof.files[0]);
            }
        });
        
        // File selection
        paymentProof.addEventListener('change', (e) => {
            if (e.target.files.length) {
                handleFileSelect(e.target.files[0]);
            }
        });
    }
    
    function handleFileSelect(file) {
        // Validate file
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
        const maxSize = 2 * 1024 * 1024; // 2MB
        
        if (!validTypes.includes(file.type)) {
            showNotification('Format file tidak didukung. Gunakan JPG, PNG, atau PDF.', 'error');
            return;
        }
        
        if (file.size > maxSize) {
            showNotification('File terlalu besar. Maksimal 2MB.', 'error');
            return;
        }
        
        // Show preview
        if (filePreview) {
            const isImage = file.type.startsWith('image/');
            const fileName = file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name;
            const fileSize = (file.size / 1024 / 1024).toFixed(2);
            
            filePreview.innerHTML = `
                <div class="file-preview-item">
                    <i class="fas fa-${isImage ? 'image' : 'file-pdf'}"></i>
                    <div>
                        <p><strong>${fileName}</strong></p>
                        <p>${fileSize} MB</p>
                    </div>
                    <button class="btn btn-sm btn-danger" onclick="removeFile()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .file-preview-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 15px;
                    background-color: rgba(67, 97, 238, 0.05);
                    border-radius: 8px;
                    margin-top: 10px;
                }
                
                .file-preview-item i {
                    font-size: 24px;
                    color: #4361ee;
                }
            `;
            document.head.appendChild(style);
        }
        
        showNotification(`File "${file.name}" berhasil diupload`, 'success');
    }
}

// Remove file
function removeFile() {
    const paymentProof = document.getElementById('paymentProof');
    const filePreview = document.getElementById('filePreview');
    
    if (paymentProof) paymentProof.value = '';
    if (filePreview) filePreview.innerHTML = '';
}

// Check URL parameters for bill ID
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const billId = urlParams.get('bill');
    const selectBill = document.getElementById('selectBill');
    
    if (billId && selectBill) {
        // In a real app, this would populate based on bill ID
        switch(billId) {
            case '3':
                selectBill.value = 'spp_mei';
                break;
            case '4':
                selectBill.value = 'praktikum';
                break;
            case '2':
                selectBill.value = 'gedung';
                break;
        }
        
        showNotification(`Tagihan #${billId} dipilih`, 'info');
    }
}

// Simulate payment submission
function simulatePaymentSubmission(billId, method, date, note) {
    // Show loading state
    const submitBtn = document.getElementById('submitPayment');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Success
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        showNotification('Pembayaran berhasil dikirim! Menunggu verifikasi admin.', 'success');
        
        // Reset form
        document.getElementById('selectBill').value = '';
        document.getElementById('paymentProof').value = '';
        document.getElementById('paymentNote').value = '';
        document.getElementById('paymentDate').value = new Date().toISOString().split('T')[0];
        
        // Clear file preview
        const filePreview = document.getElementById('filePreview');
        if (filePreview) filePreview.innerHTML = '';
        
        // Redirect to history after 2 seconds
        setTimeout(() => {
            window.location.href = 'riwayat.html';
        }, 2000);
        
    }, 2000);
}