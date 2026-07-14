
async function fetchShopProducts() {
    try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        
        let apiProducts = data?.products || [];
        
        let deletedIds = [];
        let editedProducts = {};
        let addedProducts = []; 
        
        try {
            deletedIds = JSON.parse(localStorage.getItem('deletedProducts')) || [];
            editedProducts = JSON.parse(localStorage.getItem('editedProducts')) || {};
            addedProducts = JSON.parse(localStorage.getItem('addedProducts')) || [];
        } catch (e) {
            deletedIds = [];
            editedProducts = {};
            addedProducts = [];
        }

        
        const allProducts = [...addedProducts, ...apiProducts];

        
        const activeProducts = allProducts.filter(item => {
            return !deletedIds.includes(item.id) && !deletedIds.includes(String(item.id));
        });

        const mappedPr = activeProducts.map((item) => {
        
            const currentItem = editedProducts[item.id] || editedProducts[String(item.id)] || item;
            
            
            const productImg = (currentItem.images && currentItem.images[0]) || currentItem.thumbnail;

            const imgPr = productImg
                ? `<div class='w-64 h-64 rounded-2xl bg-[#F0EEED] flex items-center justify-center overflow-hidden'>
                    <img class='w-full h-full object-cover' src='${productImg}' alt='${currentItem.title}' />
                </div>` 
                : `<div class='w-64 h-64 rounded-2xl bg-[#F0EEED] flex items-center justify-center text-gray-400'>No Image</div>`;

            return `<div id='product-${currentItem.id}' class='w-64 flex flex-col gap-2 relative'>
                ${imgPr}
                <h1 class='text-xl font-semibold product-title' style='margin-top: 8px;'>
                    ${currentItem.title.length > 25 ? currentItem.title.slice(0, 25) + '...' : currentItem.title}
                </h1>
                <div class='flex justify-between items-end w-full' style='margin-top: 4px;'>
                    <div>
                        <h1 class='product-rating text-sm text-gray-600'>Rating: ${currentItem.rating || 0}</h1>
                        <h1 class='font-bold product-price text-lg' style='margin-top: 2px;'>$${currentItem.price}</h1>
                    </div>
                    <div>
                        <button onclick='addToCart(${currentItem.id})' class='focus:outline-none bg-transparent text-black p-2 hover:opacity-70 transition-opacity flex items-center justify-center'> 
                            <i class="fa-solid fa-cart-plus text-3xl"></i>
                        </button>
                    </div>
                </div>
            </div>`;
        }).join('');
        
        const container = document.querySelector('.shopProducts') || 
                          document.querySelector('.products') || 
                          document.querySelector('.adminProducts') ||
                          document.querySelector('[class*="Products"]') || 
                          document.getElementById('products-container');
                          
        if (container) {
            container.innerHTML = mappedPr;
        } else {
            const newDiv = document.createElement('div');
            newDiv.className = 'shopProducts flex flex-wrap gap-6';
            newDiv.innerHTML = mappedPr;
            document.body.appendChild(newDiv);
        }
    } catch (error) {
        console.error("Shop xatolik yuz berdi:", error.message);
    }
}

fetchShopProducts();

window.addEventListener('storage', () => {
    fetchShopProducts();
});
