
// async function fetchProducts() {

//     try {
//         const res = await fetch('https://dummyjson.com/products');
//         const data = await res.json();
//         if (!data?.products) return;
        
//         const deletedIds = JSON.parse(localStorage.getItem('deletedProducts')) || [];
//         const editedProducts = JSON.parse(localStorage.getItem('editedProducts')) || {};
        
    
//         const filteredProducts = data.products.filter(item => !deletedIds.includes(item.id));
        
        
//         const limitedProducts = filteredProducts.slice(0, 4);

//         const mappedPr = limitedProducts.map((item) => {

//             const currentItem = editedProducts[item.id] || item;
//             const productImg = (currentItem.images && currentItem.images.length > 0) ? currentItem.images[0] : currentItem.thumbnail;

            
//             const imgPr = productImg
//                 ? `<div class='w-full sm:w-64 h-64 rounded-2xl bg-[#F0EEED] overflow-hidden' 
//                         style="background-image: url('${productImg}'); background-size: contain; background-position: center; background-repeat: no-repeat; margin: 0 auto; height: 256px;">
//                    </div>` 
//                 : "<div class='w-full sm:w-64 h-64 rounded-2xl bg-[#F0EEED] flex justify-center items-center text-gray-400'>Mahsulot rasmi mavjud emas</div>";

//             return `<div class='w-full sm:w-64 flex flex-col gap-2 p-2'>
//                 ${imgPr}
//                 <h1 class='text-lg sm:text-xl font-semibold line-clamp-1' style='margin-top: 8px;'>
//                     ${currentItem.title.length > 25 ? currentItem.title.slice(0, 25) + '...' : currentItem.title}
//                 </h1>
//                 <div class='flex justify-between items-center gap-4 mt-1'>
//                    <div>
//                         <h1 class='text-sm text-gray-500'>Rating: ${currentItem.rating}</h1>
//                         <h1 class='font-bold text-lg'>$${currentItem.price}</h1>
//                    </div>
//                    <button data-id="${currentItem.id}" class='cartClicked hover:scale-110 p-2 transition-transform duration-200'>
//                        <i class="fa-solid fa-cart-plus text-black text-2xl"></i>
//                    </button>
//                 </div>
//             </div>`;
//         }).join('');
        
//         document.querySelector('.newProducts').innerHTML = mappedPr;
//         setCartButtons();
//     } catch (error) {
//         console.log(error.message);
//     }
// }


// fetchProducts();


// window.addEventListener('storage', () => {
//     fetchProducts();
// });



// function setCartButtons() {
//     const cartButtons = document.querySelectorAll('.cartClicked');
    
//     cartButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             const productId = button.getAttribute('data-id');
//             let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
//             if (!cart.includes(productId)) {
//                 cart.push(productId);
//                 localStorage.setItem('cart', JSON.stringify(cart));

//                 const Toast = Swal.mixin({
//                     toast: true,
//                     position: "top-end", 
//                     showConfirmButton: false, 
//                     timer: 2000, 
//                     timerProgressBar: true,
//                     didOpen: (toast) => {
//                         toast.onmouseenter = Swal.stopTimer;
//                         toast.onmouseleave = Swal.resumeTimer;
//                     }
//                 });
                
//                 Toast.fire({
//                     icon: "success",
//                     title: "Product added to Cart!" 
//                 });
//             } else {
//                 const Toast = Swal.mixin({
//                     toast: true,
//                     position: "top-end", 
//                     showConfirmButton: false, 
//                     timer: 2000,
//                 });
                
//                 Toast.fire({
//                     icon: "info",
//                     title: "This product is already in your Cart!" 
//                 });
//             }
//         });
//     });
// }


// const Admin = document.querySelector('.admin');
// const container = document.querySelector('.bigContainer');

// Admin.addEventListener('click', () => {
//     const oldPanel = document.querySelector('.admin-panel');
//     const oldOverlay = document.querySelector('.admin-overlay');
//     if (oldPanel) oldPanel.remove();
//     if (oldOverlay) oldOverlay.remove();

//     document.body.style.overflow = 'hidden';

//     const overlay = document.createElement('div');
//     overlay.classList.add('admin-overlay');
//     overlay.style.position = 'fixed';
//     overlay.style.top = '0';
//     overlay.style.left = '0';
//     overlay.style.width = '100vw';
//     overlay.style.height = '100vh';
//     overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'; 
//     overlay.style.zIndex = '40'; 
//     container.appendChild(overlay);

//     const newDiv = document.createElement('div');
//     const newInput = document.createElement('input');
//     const btnAdmin = document.createElement('button');
//     btnAdmin.style.paddingLeft = '15px';
//     btnAdmin.style.paddingRight = '15px';
//     btnAdmin.style.paddingTop = '5px';
//     btnAdmin.style.paddingBottom = '5px';
//     btnAdmin.style.transform = 'scale(1)';
//     btnAdmin.style.transition = 'transform 0.2s ease-in-out';
//     btnAdmin.style.cursor = 'pointer';

//     btnAdmin.addEventListener('mouseenter', () => {
//         btnAdmin.style.transform = 'scale(1.1)';
//     });

//     btnAdmin.addEventListener('mouseleave', () => {
//         btnAdmin.style.transform = 'scale(1)';
//     });
    
//     btnAdmin.addEventListener('click', (e) => {
//         e.preventDefault();
//         if (newInput.value === 'team3-project') {
//             window.location.href = 'admin.html';
//         } else {
//             Swal.fire({
//                 toast: true,
//                 position: 'top-end',
//                 icon: 'error',
//                 title: 'Incorrect Secret Code',
//                 showConfirmButton: false,
//                 timer: 3000,
//                 timerProgressBar: true
//             });
//         }
//         newInput.value = '';
//     });

//     btnAdmin.textContent = 'Enter';
//     btnAdmin.style.border = '1px solid black';
//     newInput.style.border = '1px solid black';
//     newInput.style.width = '100%';
//     newInput.style.height = '35px';
//     newInput.style.padding = '10px';
//     newInput.placeholder = 'Enter the secret code of Admin';
    
//     newDiv.classList.add('admin-panel');
//     newDiv.style.position = 'fixed'; 
//     newDiv.style.top = '50%';          
//     newDiv.style.left = '50%';         
//     newDiv.style.transform = 'translate(-50%, -50%)'; 
//     newDiv.style.zIndex = '50'; 
//     newDiv.style.width = '300px';
//     newDiv.style.maxWidth = '90%';
//     newDiv.style.height = 'auto';
//     newDiv.style.border = '2px solid black'; 
//     newDiv.style.backgroundColor = 'white';  
//     newDiv.style.display = 'flex';
//     newDiv.style.flexDirection = 'column';
//     newDiv.style.justifyContent = 'center';
//     newDiv.style.alignItems = 'center';
//     newDiv.style.padding = '25px';
//     newDiv.style.gap = '15px'; 
//     newDiv.style.borderRadius = '1rem';

//     newDiv.append(newInput, btnAdmin);
//     container.appendChild(newDiv);

//     overlay.addEventListener('click', () => {
//         newDiv.remove();
//         overlay.remove();
//         document.body.style.overflow = ''; 
//     });
// });
























async function fetchProducts() {
    try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        
        // API dan ma'lumot kelmasa ham bo'sh massiv bilan ishlashni davom ettiramiz
        let apiProducts = data?.products || [];
        
        // LocalStorage'dan ma'lumotlarni o'qiymiz
        const deletedIds = JSON.parse(localStorage.getItem('deletedProducts')) || [];
        const editedProducts = JSON.parse(localStorage.getItem('editedProducts')) || {};
        const addedProducts = JSON.parse(localStorage.getItem('addedProducts')) || []; // Yangi qo'shilgan mahsulotlar
        
        // 1. API dan kelgan mahsulotlar bilan admin panelda qo'shilgan mahsulotlarni birlashtiramiz
        // Yangi qo'shilganlar ro'yxatning boshida (tepasida) turishi uchun ularni boshiga joylaymiz
        let allProducts = [...addedProducts, ...apiProducts];
        
        // 2. O'chirilgan mahsulotlarni ro'yxatdan olib tashlaymiz
        const filteredProducts = allProducts.filter(item => !deletedIds.includes(String(item.id)) && !deletedIds.includes(Number(item.id)));
        
        // 3. Ko'rsatiladigan mahsulotlar sonini cheklaymiz (masalan, dastlabki 4 tasi)
        const limitedProducts = filteredProducts.slice(0, 4);

        const mappedPr = limitedProducts.map((item) => {
            // Agar mahsulot tahrirlangan bo'lsa, tahrirlangan versiyasini olamiz
            const currentItem = editedProducts[item.id] || item;
            
            // Rasm mavjudligini tekshirish
            const productImg = (currentItem.images && currentItem.images.length > 0) ? currentItem.images[0] : currentItem.thumbnail;

            const imgPr = productImg
                ? `<div class='w-full sm:w-64 h-64 rounded-2xl bg-[#F0EEED] overflow-hidden' 
                        style="background-image: url('${productImg}'); background-size: contain; background-position: center; background-repeat: no-repeat; margin: 0 auto; height: 256px;">
                   </div>` 
                : "<div class='w-full sm:w-64 h-64 rounded-2xl bg-[#F0EEED] flex justify-center items-center text-gray-400'>Mahsulot rasmi mavjud emas</div>";

            return `<div class='w-full sm:w-64 flex flex-col gap-2 p-2'>
                ${imgPr}
                <h1 class='text-lg sm:text-xl font-semibold line-clamp-1' style='margin-top: 8px;'>
                    ${currentItem.title.length > 25 ? currentItem.title.slice(0, 25) + '...' : currentItem.title}
                </h1>
                <div class='flex justify-between items-center gap-4 mt-1'>
                   <div>
                        <h1 class='text-sm text-gray-500'>Rating: ${currentItem.rating || 0}</h1>
                        <h1 class='font-bold text-lg'>$${currentItem.price}</h1>
                   </div>
                   <button data-id="${currentItem.id}" class='cartClicked hover:scale-110 p-2 transition-transform duration-200'>
                       <i class="fa-solid fa-cart-plus text-black text-2xl"></i>
                   </button>
                </div>
            </div>`;
        }).join('');
        
        document.querySelector('.newProducts').innerHTML = mappedPr;
        setCartButtons();
    } catch (error) {
        console.log(error.message);
    }
}

fetchProducts();

// LocalStorage o'zgarganda sahifani qayta yangilash (boshqa sahifadan turib narsa qo'shilsa ham ishlaydi)
window.addEventListener('storage', () => {
    fetchProducts();
});

function setCartButtons() {
    const cartButtons = document.querySelectorAll('.cartClicked');
    
    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            if (!cart.includes(productId)) {
                cart.push(productId);
                localStorage.setItem('cart', JSON.stringify(cart));

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

// Admin panel ochish kodi (O'zgarishsiz qoldi)
const Admin = document.querySelector('.admin');
const container = document.querySelector('.bigContainer');

Admin.addEventListener('click', () => {
    const oldPanel = document.querySelector('.admin-panel');
    const oldOverlay = document.querySelector('.admin-overlay');
    if (oldPanel) oldPanel.remove();
    if (oldOverlay) oldOverlay.remove();

    document.body.style.overflow = 'hidden';

    const overlay = document.createElement('div');
    overlay.classList.add('admin-overlay');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'; 
    overlay.style.zIndex = '40'; 
    container.appendChild(overlay);

    const newDiv = document.createElement('div');
    const newInput = document.createElement('input');
    const btnAdmin = document.createElement('button');
    btnAdmin.style.paddingLeft = '15px';
    btnAdmin.style.paddingRight = '15px';
    btnAdmin.style.paddingTop = '5px';
    btnAdmin.style.paddingBottom = '5px';
    btnAdmin.style.transform = 'scale(1)';
    btnAdmin.style.transition = 'transform 0.2s ease-in-out';
    btnAdmin.style.cursor = 'pointer';

    btnAdmin.addEventListener('mouseenter', () => {
        btnAdmin.style.transform = 'scale(1.1)';
    });

    btnAdmin.addEventListener('mouseleave', () => {
        btnAdmin.style.transform = 'scale(1)';
    });
    
    btnAdmin.addEventListener('click', (e) => {
        e.preventDefault();
        if (newInput.value === 'team3-project') {
            window.location.href = 'admin.html';
        } else {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Incorrect Secret Code',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });
        }
        newInput.value = '';
    });

    btnAdmin.textContent = 'Enter';
    btnAdmin.style.border = '1px solid black';
    newInput.style.border = '1px solid black';
    newInput.style.width = '100%';
    newInput.style.height = '35px';
    newInput.style.padding = '10px';
    newInput.placeholder = 'Enter the secret code of Admin';
    
    newDiv.classList.add('admin-panel');
    newDiv.style.position = 'fixed'; 
    newDiv.style.top = '50%';          
    newDiv.style.left = '50%';         
    newDiv.style.transform = 'translate(-50%, -50%)'; 
    newDiv.style.zIndex = '50'; 
    newDiv.style.width = '300px';
    newDiv.style.maxWidth = '90%';
    newDiv.style.height = 'auto';
    newDiv.style.border = '2px solid black'; 
    newDiv.style.backgroundColor = 'white';  
    newDiv.style.display = 'flex';
    newDiv.style.flexDirection = 'column';
    newDiv.style.justifyContent = 'center';
    newDiv.style.alignItems = 'center';
    newDiv.style.padding = '25px';
    newDiv.style.gap = '15px'; 
    newDiv.style.borderRadius = '1rem';

    newDiv.append(newInput, btnAdmin);
    container.appendChild(newDiv);

    overlay.addEventListener('click', () => {
        newDiv.remove();
        overlay.remove();
        document.body.style.overflow = ''; 
    });
});