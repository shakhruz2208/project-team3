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
        const fetchPromise = cart.map(id =>
            fetch(`https://dummyjson.com/products/${id}`).then(res => {
                if (!res.ok) throw new Error('Product not found')
                return res.json()
            })
            .catch(() => null)
        );

        const products = await Promise.all(fetchPromise);

        const validProducts = products.filter(item => item !== null);

        const mappedCartPr = validProducts.map((item) => {
            return `
                <div class='w-full border border-gray-200 bg-white h-32 rounded-3xl p-3 flex items-center gap-4 mb-4 shadow-sm text-left'>
                    <img src="${item.thumbnail}" alt="${item.title}" class="h-full w-24 object-contain rounded-2xl bg-gray-50"/>
                    <div class="flex flex-col justify-between h-full py-1 flex-1">
                        <div>
                            <h3 class="font-bold text-base md:text-lg leading-tight line-clamp-1 text-gray-800">${item.title}</h3>
                            <p class="text-gray-400 text-xs md:text-sm">${item.brand || 'No brand'}</p>
                        </div>
                        <span class="font-semibold text-green-600">$${item.price}</span>
                    </div>
                    <button onclick='removeFromCart(${item.id})'> <i class="fa-solid fa-trash-can text-3xl text-red-500 pr-30 "></i></button>
                </div>
            `;
        });

        cartContainer.innerHTML = mappedCartPr.join('');

    } catch (error) {
        cartContainer.innerHTML = `<p class="text-red-500 text-center">Failed to load cart products.</p>`;
    }
}


function removeFromCart(id) {
    try {
        let newId = Number(id)
        const cartRaw = localStorage.getItem('cart');
        let cart = cartRaw ? JSON.parse(cartRaw) : [];
        
        if (!Array.isArray(cart)) cart = [cart]
        
        cart = cart.filter(productId => Number(productId) !== newId )
        
        localStorage.setItem('cart' , JSON.stringify(cart))
        
        displayCart()
    } catch (error) {
        console.log(error.message);
        
    }
    
    
}
displayCart();