

async function displayCart() {
    const cartContainer = document.querySelector('.cartProducts');
    if (!cartContainer) return;

    let cart = []; 

    try {
        const cartRaw = localStorage.getItem('cart');
        cart = cartRaw ? JSON.parse(cartRaw) : [];
        if (!Array.isArray(cart)) {
            cart = [cart]; 
        }
    } catch (e) {
        cart = [];
    }

    if (cart.length === 0) {
        cartContainer.innerHTML = `
        <div class="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm w-full">
            <i class="fa-solid fa-basket-shopping text-5xl text-slate-300 mb-3"></i>
            <h2 class="text-xl font-medium text-slate-500">Cart is empty</h2>
        </div>`;
        return;
    }

    try {
        
        const editedProducts = JSON.parse(localStorage.getItem('editedProducts')) || {};
        const addedProducts = JSON.parse(localStorage.getItem('addedProducts')) || [];

        
        const fetchPromise = cart.map(async (id) => {
            
            const localNewProduct = addedProducts.find(
                prod => String(prod.id) === String(id)
            );

            if (localNewProduct) {
                return localNewProduct; 
            }

    
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                if (!res.ok) throw new Error('Product not found');
                return await res.json();
            } catch (err) {
                return null; 
            }
        });

        const products = await Promise.all(fetchPromise);
        const validProducts = products.filter(item => item !== null);

        const mappedCartPr = validProducts.map((item) => {
            
            const currentItem = editedProducts[item.id] || editedProducts[String(item.id)] || item;
            
            const productImg = (currentItem.images && currentItem.images.length > 0) ? currentItem.images[0] : currentItem.thumbnail;

            const imgHtml = productImg
                ? `<div class="h-24 w-24 rounded-2xl bg-[#F0EEED] flex justify-center items-center overflow-hidden ,flex-shrink-0">
                    <img src="${productImg}" alt="${currentItem.title}" class="w-full h-full object-cover"/>
                   </div>`
                : `<div class="h-24 w-24 rounded-2xl bg-[#F0EEED] flex justify-center items-center text-gray-400 text-xs ,flex-shrink-0">No Image</div>`;

            return `
                <div class='w-full border border-gray-200 bg-white h-auto sm:h-32 rounded-3xl p-4 flex flex-col sm:flex-row items-center gap-4 mb-4 shadow-sm text-center sm:text-left relative sm:static'>
                    ${imgHtml}
                    
                    <div class="flex flex-col justify-between flex-1 w-full gap-2 sm:gap-0 sm:h-full py-1">
                        <div>
                            <h3 class="font-bold text-base md:text-lg leading-tight line-clamp-1 text-gray-800">${currentItem.title}</h3>
                            <p class="text-gray-400 text-xs md:text-sm">${currentItem.brand || 'No brand'}</p>
                        </div>
                        <span class="font-semibold text-green-600 text-lg">$${currentItem.price}</span>
                    </div>
                    
                    <button onclick='removeFromCart("${currentItem.id}")' class='hover:scale-110 p-2 transition-transform duration-200 mt-2 sm:mt-0'> 
                        <i class="fa-solid fa-trash-can text-2xl sm:text-3xl text-red-500"></i>
                    </button>
                </div>
            `;
        });

        cartContainer.innerHTML = mappedCartPr.join('');

    } catch (error) {
        console.error(error);
        cartContainer.innerHTML = `<p class="text-red-500 text-center">Failed to load cart products.</p>`;
    }
}

function removeFromCart(id) {
    try {
        
        const targetId = String(id);
        const cartRaw = localStorage.getItem('cart');
        let cart = cartRaw ? JSON.parse(cartRaw) : [];
        
        if (!Array.isArray(cart)) cart = [cart];
        
        
        cart = cart.filter(productId => String(productId) !== targetId);
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        displayCart();
    } catch (error) {
        console.log(error.message);
    }
}

displayCart();          