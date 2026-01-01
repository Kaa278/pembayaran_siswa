// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile sidebar
    initMobileSidebar();
    
    // Initialize logout functionality
    initLogout();
    
    // Set current date in payment form if exists
    setCurrentDate();
});

// Mobile Sidebar Functionality
function initMobileSidebar() {
    const hamburger = document.getElementById('hamburger');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const overlay = document.getElementById('overlay');
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileSidebar);
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', toggleMobileSidebar);
    }
    
    if (overlay) {
        overlay.addEventListener('click', toggleMobileSidebar);
    }
    
    function toggleMobileSidebar() {
        mobileSidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

// Logout Functionality
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutMobileBtn = document.getElementById('logoutMobileBtn');
    
    const logout = function() {
        // Clear session
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('rememberedUser');
        
        // Redirect to login page
        window.location.href = '../login.html';
    };
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    if (logoutMobileBtn) {
        logoutMobileBtn.addEventListener('click', logout);
    }
}

// Set current date in forms
function setCurrentDate() {
    const paymentDate = document.getElementById('paymentDate');
    if (paymentDate) {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        paymentDate.value = formattedDate;
        paymentDate.min = formattedDate;
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Show notification
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

// Check if user is logged in
function checkLogin() {
    const currentUser = sessionStorage.getItem('currentUser') || 
                       localStorage.getItem('rememberedUser');
    
    if (!currentUser && window.location.pathname.includes('/user/')) {
        window.location.href = '../login.html';
        return false;
    }
    
    return currentUser;
}

// Update user display
function updateUserDisplay() {
    const currentUser = checkLogin();
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        const usernameDisplays = document.querySelectorAll('#usernameDisplay, #dashboardUsername');
        
        usernameDisplays.forEach(display => {
            if (display) display.textContent = userData.name;
        });
    }
}