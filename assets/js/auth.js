// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    checkExistingLogin();
    
    // Initialize login form
    initLoginForm();
});

// Check if user is already logged in
function checkExistingLogin() {
    const currentUser = sessionStorage.getItem('currentUser') || 
                       localStorage.getItem('rememberedUser');
    
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        
        // Redirect based on role
        if (userData.role === 'siswa') {
            window.location.href = 'user/dashboard.html';
        } else if (userData.role === 'admin') {
            window.location.href = 'admin/dashboard.html';
        }
    }
}

// Initialize login form
function initLoginForm() {
    const loginForm = document.querySelector('.login-card');
    const roleOptions = document.querySelectorAll('.role-option');
    const submitBtn = document.getElementById('submitLogin');
    const rememberMe = document.getElementById('rememberMe');
    
    if (!loginForm) return;
    
    // Role selection
    roleOptions.forEach(option => {
        option.addEventListener('click', function() {
            roleOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Form submission
    if (submitBtn) {
        submitBtn.addEventListener('click', handleLogin);
    }
    
    // Handle login
    function handleLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const activeRole = document.querySelector('.role-option.active')?.dataset.role;
        const remember = rememberMe?.checked;
        
        // Validation
        if (!username || !password) {
            showNotification('Username dan password harus diisi!', 'error');
            return;
        }
        
        if (!activeRole) {
            showNotification('Pilih role terlebih dahulu!', 'error');
            return;
        }
        
        // Simulate API call - in real app, this would be a fetch request
        authenticateUser(username, password, activeRole, remember);
    }
}

// Authenticate user
function authenticateUser(username, password, role, remember) {
    // Demo users
    const demoUsers = {
        siswa: {
            username: ['siswa', '2023001'],
            password: 'siswa123',
            data: {
                id: 1,
                name: 'Ahmad Fauzi',
                nis: '2023001',
                kelas: 'XII IPA 2',
                role: 'siswa'
            }
        },
        admin: {
            username: ['admin', 'admin001'],
            password: 'admin123',
            data: {
                id: 100,
                name: 'Administrator',
                role: 'admin'
            }
        }
    };
    
    // Find user
    const userType = role;
    const userConfig = demoUsers[userType];
    
    if (!userConfig) {
        showNotification('Role tidak valid!', 'error');
        return;
    }
    
    // Check credentials
    const isValidUsername = userConfig.username.includes(username);
    const isValidPassword = password === userConfig.password;
    
    if (isValidUsername && isValidPassword) {
        // Successful login
        const userData = userConfig.data;
        
        // Store user data
        if (remember) {
            localStorage.setItem('rememberedUser', JSON.stringify(userData));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify(userData));
        }
        
        // Show success message
        showNotification(`Login berhasil! Selamat datang ${userData.name}`, 'success');
        
        // Redirect based on role
        setTimeout(() => {
            if (role === 'siswa') {
                window.location.href = 'user/dashboard.html';
            } else if (role === 'admin') {
                window.location.href = 'admin/dashboard.html';
            }
        }, 1000);
        
    } else {
        // Failed login
        showNotification('Username atau password salah!', 'error');
        
        // Demo credentials hint
        setTimeout(() => {
            const hint = role === 'siswa' 
                ? 'Demo: siswa / siswa123' 
                : 'Demo: admin / admin123';
            showNotification(hint, 'warning');
        }, 2000);
    }
}

// Show notification function (copied from main.js for standalone functionality)
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#4cc9f0' : '#f72585'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Add CSS animations
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 0;
                font-size: 14px;
            }
        `;
        document.head.appendChild(style);
    }
}