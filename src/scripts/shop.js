async function fetchProducts() {
    try {
        const res = await fetch('https://dummyjson.com/products')
        const data = await res.json()
        if (!data?.products) return;

        const mappedPr = data.products.map((item) => {
            const imgPr = item.images && item.images.length > 0
                ? `<div class='w-full sm:w-64 h-64 rounded-2xl bg-[#F0EEED] flex justify-center items-center overflow-hidden'>
                    <img class='w-full h-full object-contain' src='${item.images[0]}' alt='${item.title}' />
                </div>` 
                : 'Mahsulot rasmi mavjud emas';

            return `<div class='w-full sm:w-64 flex flex-col gap-2 p-2'>
                ${imgPr}
                <h1 class='text-lg sm:text-xl font-semibold line-clamp-1'>${item.title.length > 25 ? item.title.slice(0 , 25) + '...' : item.title}</h1>
                <div class='flex justify-between items-center gap-4 mt-1'>
                    <div>
                        <h1 class='text-sm text-gray-500'>Rating: ${item.rating}</h1>
                        <h1 class='font-bold text-lg'>$${item.price}</h1>
                    </div>
                    <button data-id="${item.id}" class='cartClicked hover:scale-110 p-2 transition-transform duration-200'>
                        <i class="fa-solid fa-cart-plus text-black text-2xl"></i>
                    </button>
                </div>
            </div>`
        }).join('')
        
        document.querySelector('.allProducts').innerHTML = mappedPr
        setCartButtons()
    } catch (error) {
        console.log(error.message);
    }
}

fetchProducts()

function setCartButtons() {
    const cartButtons = document.querySelectorAll('.cartClicked');
    
    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = Number(button.getAttribute('data-id'));
            let cart = JSON.parse(localStorage.getItem('cart')) || []
            
            if (!cart.includes(productId)) {
                cart.push(productId)
                localStorage.setItem('cart', JSON.stringify(cart))

                Swal.mixin({
                    toast: true,
                    position: "top-end", 
                    showConfirmButton: false, 
                    timer: 2000, 
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                }).fire({
                    icon: "success",
                    title: "Product added to Cart!" 
                });
            } else {
                Swal.mixin({
                    toast: true,
                    position: "top-end", 
                    showConfirmButton: false, 
                    timer: 2000,
                }).fire({
                    icon: "info",
                    title: "This product is already in your Cart!" 
                });
            }
        });
    });
}