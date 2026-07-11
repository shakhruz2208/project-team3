async function fetchProducts() {
    try {
        const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()
    if (!data?.products) return;
    const mappedPr = data.products.map((item)=>{
        const imgPr = item.thumbnail
            ? `<div class='w-64 h-64 rounded-2xl bg-[#F0EEED]'>
                <img class='w-full h-64' src='${item.images[0]}' alt='${item.title}' />
            </div>` 
            : 'Mahsulot rasmi mavjud emas';


      return `<div>
            ${imgPr}
            <h1 class='text-xl font-semibold'>${item.title.length > 25 ? item.title.slice(0 , 25) + '...' : item.title}</h1>
            <div class='flex gap-36'>
           <div>
                <h1>Rating: ${item.rating}</h1>
            <h1 class='font-bold'>$${item.price}</h1>
           </div>
          <button data-id=${item.id} class='cartClicked hover:scale-110'><i class="fa-solid fa-cart-plus text-black text-2xl"></i></button>
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
            const productId = button.getAttribute('data-id');
            let cart = JSON.parse(localStorage.getItem('cart') ) || []
            if (!cart.includes(productId)) {
                cart.push(productId)
                localStorage.setItem('cart' , JSON.stringify(cart))

                 const Toast = Swal.mixin({
                toast: true,
                position: "top-end", 
                showConfirmButton: false, 
                timer: 2000, 
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            
            Toast.fire({
                icon: "success",
                title: "Product added to Cart!" 
            });
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end", 
                    showConfirmButton: false, 
                    timer: 2000,
                });
                
                Toast.fire({
                    icon: "info",
                    title: "This product is already in your Cart!" 
                });
            }
            
           
        });
    });
    }
