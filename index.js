
        // Product data
        const products = [
            {
                id: 1,
                name: "Wireless Bluetooth Headphones",
                price: 89.99,
                originalPrice: 129.99,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Noise-cancelling over-ear headphones with 30hr battery life"
            },
            {
                id: 2,
                name: "Smart Watch Pro",
                price: 249.99,
                originalPrice: 299.99,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Fitness tracker with heart rate monitor and GPS"
            },
            {
                id: 3,
                name: "Gaming Laptop",
                price: 1299.99,
                originalPrice: 1599.99,
                image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "High-performance laptop with RTX 4070 and 16GB RAM"
            },
            {
                id: 4,
                name: "Smartphone X Pro",
                price: 999.99,
                originalPrice: 1199.99,
                image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Flagship smartphone with 200MP camera and 5G"
            },
            {
                id: 5,
                name: "Wireless Keyboard & Mouse",
                price: 69.99,
                originalPrice: 89.99,
                image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Ergonomic keyboard and mouse combo"
            },
            {
                id: 6,
                name: "Tablet Pro 12.9",
                price: 899.99,
                originalPrice: 1099.99,
                image: "phtoto.jpg.jpg",
            
                description: "Professional tablet with stylus support"
            }
        ];

        // Cart state
        let cart = [];

        // DOM elements
        const homePage = document.querySelector('.home-page');
        const cartPage = document.querySelector('.cart-page');
        const productsGrid = document.querySelector('.products-grid');
        const cartItemsBody = document.querySelector('.cart-items-body');
        const cartCount = document.querySelector('.cart-count');
        const subtotalEl = document.querySelector('.subtotal');
        const totalPriceEl = document.querySelector('.total-price');
        
        // Navigation elements
        const navHome = document.querySelector('.nav-home');
        const navProducts = document.querySelectorAll('.nav-products');
        const navCart = document.querySelector('.nav-cart');

        // Initialize the app
        function init() {
            renderProducts();
            updateCartDisplay();
            setupEventListeners();
        }

        // Render products on the home page
        function renderProducts() {
            productsGrid.innerHTML = '';
            
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                
                // Check if product is in cart
                const cartItem = cart.find(item => item.id === product.id);
                const buttonText = cartItem ? `Added (${cartItem.quantity})` : 'Add to Cart';
                const buttonClass = cartItem ? 'add-to-cart added' : 'add-to-cart';
                
                productCard.innerHTML = `
                    <div class="product-img">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-price">
                            $${product.price.toFixed(2)}
                            <span>$${product.originalPrice.toFixed(2)}</span>
                        </div>
                        <button class="${buttonClass}" data-id="${product.id}">
                            ${buttonText}
                        </button>
                    </div>
                `;
                
                productsGrid.appendChild(productCard);
            });
        }

        // Update cart display
        function updateCartDisplay() {
            // Update cart count
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Render cart items if on cart page
            if (cartPage.style.display === 'block') {
                renderCartItems();
                updateCartSummary();
            }
            
            // Update product buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                const productId = parseInt(button.getAttribute('data-id'));
                const cartItem = cart.find(item => item.id === productId);
                
                if (cartItem) {
                    button.textContent = `Added (${cartItem.quantity})`;
                    button.classList.add('added');
                } else {
                    button.textContent = 'Add to Cart';
                    button.classList.remove('added');
                }
            });
        }

        // Render cart items
        function renderCartItems() {
            cartItemsBody.innerHTML = '';
            
            if (cart.length === 0) {
                cartItemsBody.innerHTML = `
                    <tr>
                        <td colspan="5" style="text-align: center; padding: 3rem;">
                            <h3>Your cart is empty</h3>
                            <p>Add some products to your cart!</p>
                            <button class="btn nav-products" style="margin-top: 1rem;">Browse Products</button>
                        </td>
                    </tr>
                `;
                return;
            }
            
            cart.forEach(item => {
                const product = products.find(p => p.id === item.id);
                const itemTotal = product.price * item.quantity;
                
                const cartItemRow = document.createElement('tr');
                cartItemRow.className = 'cart-item';
                cartItemRow.innerHTML = `
                    <td>
                        <div style="display: flex; align-items: center;">
                            <img src="${product.image}" alt="${product.name}" class="cart-item-img">
                            <div style="margin-left: 1rem;">
                                <strong>${product.name}</strong><br>
                                <small>${product.description}</small>
                            </div>
                        </div>
                    </td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>
                        <div class="quantity-controls">
                            <button class="quantity-btn decrease" data-id="${product.id}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${product.id}">+</button>
                        </div>
                    </td>
                    <td>$${itemTotal.toFixed(2)}</td>
                    <td>
                        <button class="remove-item" data-id="${product.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                
                cartItemsBody.appendChild(cartItemRow);
            });
        }

        // Update cart summary
        function updateCartSummary() {
            const subtotal = cart.reduce((sum, item) => {
                const product = products.find(p => p.id === item.id);
                return sum + (product.price * item.quantity);
            }, 0);
            
            const shipping = subtotal > 0 ? 5.99 : 0;
            const total = subtotal + shipping;
            
            subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
            totalPriceEl.textContent = `$${total.toFixed(2)}`;
        }

        // Add to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    quantity: 1
                });
            }
            
            updateCartDisplay();
        }

        // Remove from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartDisplay();
        }

        // Update quantity
        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            
            if (item) {
                item.quantity += change;
                
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    updateCartDisplay();
                }
            }
        }

        // Setup event listeners
        function setupEventListeners() {
            // Navigation
            navHome.addEventListener('click', (e) => {
                e.preventDefault();
                homePage.style.display = 'block';
                cartPage.style.display = 'none';
            });
            
            navProducts.forEach(nav => {
                nav.addEventListener('click', (e) => {
                    e.preventDefault();
                    homePage.style.display = 'block';
                    cartPage.style.display = 'none';
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                });
            });
            
            navCart.addEventListener('click', (e) => {
                e.preventDefault();
                homePage.style.display = 'none';
                cartPage.style.display = 'block';
                updateCartDisplay();
            });
            
            // Add to cart buttons
            productsGrid.addEventListener('click', (e) => {
                if (e.target.classList.contains('add-to-cart')) {
                    const productId = parseInt(e.target.getAttribute('data-id'));
                    addToCart(productId);
                }
            });
            
            // Cart item controls
            cartItemsBody.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('button').getAttribute('data-id'));
                
                if (e.target.closest('.increase')) {
                    updateQuantity(productId, 1);
                } else if (e.target.closest('.decrease')) {
                    updateQuantity(productId, -1);
                } else if (e.target.closest('.remove-item')) {
                    removeFromCart(productId);
                }
            });
            
            // Checkout button
            document.querySelector('.checkout-btn').addEventListener('click', () => {
                if (cart.length === 0) {
                    alert('Your cart is empty! Add some products first.');
                    return;
                }
                
                const total = parseFloat(totalPriceEl.textContent.replace('$', ''));
                alert(`Thank you for your order! Total: $${total.toFixed(2)}\nThis is a demo store, so no actual purchase was made.`);
                
                // Clear cart after checkout
                cart = [];
                updateCartDisplay();
                
                // Go back to home page
                homePage.style.display = 'block';
                cartPage.style.display = 'none';
            });
            
            // Footer navigation
            document.querySelectorAll('.footer-column a').forEach(link => {
                link.addEventListener('click', (e) => {
                    if (link.classList.contains('nav-home')) {
                        e.preventDefault();
                        navHome.click();
                    } else if (link.classList.contains('nav-products')) {
                        e.preventDefault();
                        navProducts[0].click();
                    } else if (link.classList.contains('nav-cart')) {
                        e.preventDefault();
                        navCart.click();
                    }
                });
            });
        }

        // Initialize the app when page loads
        document.addEventListener('DOMContentLoaded', init);
  
 