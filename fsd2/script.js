const products = [
    { id: 1, name: "Wireless Noise Cancelling Headphones", price: 4999, img: "1.jpg" },
    { id: 2, name: "Smart Watch Series 8", price: 3499, img: "2.jpg" },
    { id: 3, name: "4K Ultra HD Smart TV", price: 35000, img: "3.jpg" },
    { id: 4, name: "Gaming Mechanical Keyboard", price: 2499, img: "4.jpg" },
    { id: 5, name: "Ergonomic Office Chair", price: 6500, img: "5.jpg" },
    { id: 6, name: "Bluetooth Portable Speaker", price: 1299, img: "6.jpg" },
    { id: 7, name: "Professional DSLR Camera", price: 55000, img: "7.jpg" },
    { id: 8, name: "Stainless Steel Water Bottle", price: 499, img: "8.jpg" }
];

let cart = JSON.parse(localStorage.getItem('amazonCart')) || [];

// UI Elements
const productGrid = document.getElementById('product-grid');
const searchBar = document.getElementById('search-bar');
const cartCount = document.getElementById('cart-count');
const sidebar = document.getElementById('sidebar');

// 1. Update Navbar Cart Count
function updateCartCount() {
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.innerText = totalItems;
    }
}

// 2. Display Products (Home Page)
function displayProducts(productsToDisplay) {
    if (!productGrid) return;
    productGrid.innerHTML = productsToDisplay.map(product => `
        <div class="card">
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">₹${product.price.toLocaleString('en-IN')}</p>
            <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// 3. Add to Cart Logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    alert(`✅ ${product.name} added to cart successfully!`);
}

function saveCart() {
    localStorage.setItem('amazonCart', JSON.stringify(cart));
}

// 4. Search Functionality
if (searchBar) {
    searchBar.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(term));
        displayProducts(filtered);
    });
}

// 5. Sidebar Toggle
function toggleSidebar(open) {
    if (sidebar) {
        open ? sidebar.classList.add('active') : sidebar.classList.remove('active');
    }
}

// Initialize
updateCartCount();
if (productGrid) displayProducts(products);

// Handle User Display
const currentUser = localStorage.getItem('currentUser');
const signInLink = document.getElementById('user-greet');
if (currentUser && signInLink) {
    signInLink.innerText = `Hello, ${currentUser}`;
    signInLink.href = "#";
}