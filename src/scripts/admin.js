
let productsList = [];


async function fetchProducts() {
    try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        if (!data?.products) return;

        const deletedIds = JSON.parse(localStorage.getItem('deletedProducts')) || [];
        const editedProducts = JSON.parse(localStorage.getItem('editedProducts')) || {};
        const addedProducts = JSON.parse(localStorage.getItem('addedProducts')) || [];

        
        const apiActiveProducts = data.products.filter(item => !deletedIds.includes(item.id));

        
        const finalApiProducts = apiActiveProducts.map(item => {
            return editedProducts[item.id] || item;
        });

        
        productsList = [...addedProducts, ...finalApiProducts];


        renderProducts();
    } catch (error) {
        console.log(error.message);
    }
}


function renderProducts() {
    const container = document.querySelector('.adminProducts');
    if (!container) return;

    
    let mappedPr = productsList.map((currentItem) => {
        const imgPr = currentItem.thumbnail || (currentItem.images && currentItem.images[0])
            ? `<div class='w-full h-64 rounded-2xl bg-[#F0EEED] flex items-center justify-center overflow-hidden'>
                <img class='w-full h-full object-cover' src='${currentItem.images?.[0] || currentItem.thumbnail}' alt='${currentItem.title}' />
            </div>` 
            : `<div class='w-full h-64 rounded-2xl bg-gray-200 flex items-center justify-center text-gray-400'>Rasm mavjud emas</div>`;

        return `<div id='product-${currentItem.id}' class='w-full flex flex-col gap-2 bg-white p-3 rounded-2xl shadow-sm border border-gray-100'>
            ${imgPr}
            <h1 class='text-xl font-semibold product-title' style='margin-top: 8px;'>${currentItem.title.length > 25 ? currentItem.title.slice(0, 25) + '...' : currentItem.title}</h1>
            <div class='flex justify-between items-center w-full' style='margin-top: 4px;'>
                <div>
                    <h1 class='product-rating text-sm text-gray-600'>Rating: ${currentItem.rating}</h1>
                    <h1 class='font-bold product-price text-lg'>$${currentItem.price}</h1>
                </div>
                <div class='flex gap-4 items-center'>
                    <button onclick='editProduct(${currentItem.id})' class='focus:outline-none'> 
                        <i class="fa-solid fa-pen text-2xl text-black"></i>
                    </button>
                    <button onclick='deleteProduct(${currentItem.id})' class='focus:outline-none'> 
                        <i class="fa-solid fa-trash-can text-2xl text-red-500"></i>
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');

    
    const addCardHtml = `
        <div onclick="addProduct()" class="w-full h-full min-h-[380px], flex flex-col justify-center items-center border-4 border-dashed border-gray-300 rounded-2xl p-6 cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group">
            <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-emerald-100 transition-all mb-4">
                <i class="fa-solid fa-plus text-3xl text-gray-400 group-hover:text-emerald-600 transition-all"></i>
            </div>
            <span class="text-lg font-semibold text-gray-500 group-hover:text-emerald-600 transition-all">Add Product</span>
        </div>
    `;

    
    container.innerHTML = mappedPr + addCardHtml;
}


fetchProducts();


function addProduct() {
    Swal.fire({
        title: '<h2 style="margin: 0; font-family: sans-serif; font-size: 20px; font-weight: 700; color: #1f2937;">Add New Product</h2>',
        html: `
            <div style="text-align: left; font-family: sans-serif; padding: 10px 5px 0 5px;">
                <div style="margin-bottom: 14px;">
                    <label style="display: block; font-size: 12px; font-weight: 700; color: #4b5563; margin-bottom: 4px; text-transform: uppercase;">Product Title</label>
                    <input id="swal-title" type="text" style="width: 100%; height: 40px; padding: 0 10px; box-sizing: border-box; border: 1px solid #d1d5db; border-radius: 6px; font-size: 15px; outline: none;" placeholder="Enter title">
                </div>
                
                <div style="margin-bottom: 14px;">
                    <label style="display: block; font-size: 12px; font-weight: 700; color: #4b5563; margin-bottom: 4px; text-transform: uppercase;">Price ($)</label>
                    <input id="swal-price" type="number" style="width: 100%; height: 40px; padding: 0 10px; box-sizing: border-box; border: 1px solid #d1d5db; border-radius: 6px; font-size: 15px; outline: none;" placeholder="0.00">
                </div>
                
                <div style="margin-bottom: 14px;">
                    <label style="display: block; font-size: 12px; font-weight: 700; color: #4b5563; margin-bottom: 4px; text-transform: uppercase;">Rating</label>
                    <input id="swal-rating" type="number" step="0.01" style="width: 100%; height: 40px; padding: 0 10px; box-sizing: border-box; border: 1px solid #d1d5db; border-radius: 6px; font-size: 15px; outline: none;" placeholder="5.0">
                </div>
                
                <div>
                    <label style="display: block; font-size: 12px; font-weight: 700; color: #4b5563; margin-bottom: 4px; text-transform: uppercase;">Product Image File</label>
                    <input id="swal-file" type="file" accept="image/*" style="display: block; width: 100%; font-size: 14px; color: #4b5563; margin-top: 4px;">
                </div>
            </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonColor: '#10b981', 
        cancelButtonColor: '#6b7280',  
        confirmButtonText: 'Add Product',
        cancelButtonText: 'Cancel',
        customClass: {
            popup: 'rounded-2xl',
            confirmButton: 'rounded-lg px-4 py-2 font-medium text-sm',
            cancelButton: 'rounded-lg px-4 py-2 font-medium text-sm'
        },
        preConfirm: () => {
            const title = document.getElementById('swal-title').value;
            const price = document.getElementById('swal-price').value;
            const rating = document.getElementById('swal-rating').value;
            const fileInput = document.getElementById('swal-file');
            const file = fileInput.files[0];

            if (!title || !price || !rating) {
                Swal.showValidationMessage('Please fill all fields');
                return false;
            }

            return new Promise((resolve) => {
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        resolve({ title, price, rating, img: e.target.result });
                    };
                    reader.readAsDataURL(file);
                } else {
                    resolve({ title, price, rating, img: 'https://placehold.co/400x400?text=No+Image' });
                }
            });
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const newData = result.value;

            fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: newData.title,
                    price: Number(newData.price),
                    rating: Number(newData.rating)
                })
            })
            .then(res => res.json())
            .then(() => {
                const newProduct = {
                    id: Date.now(),
                    title: newData.title,
                    price: Number(newData.price),
                    rating: Number(newData.rating),
                    thumbnail: newData.img,
                    images: [newData.img]
                };

                const addedProducts = JSON.parse(localStorage.getItem('addedProducts')) || [];
                addedProducts.unshift(newProduct);
                localStorage.setItem('addedProducts', JSON.stringify(addedProducts));

                
                productsList.unshift(newProduct);
                renderProducts();

                Swal.fire('Added!', 'New product has been added.', 'success');
            })
            .catch(() => Swal.fire('Error!', 'Something went wrong.', 'error'));
        }
    });
}


function deleteProduct(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444', 
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((res) => {
        if (res.isConfirmed) {
            let addedProducts = JSON.parse(localStorage.getItem('addedProducts')) || [];
            const isLocalProduct = addedProducts.some(p => p.id === id);

            if (isLocalProduct) {
                addedProducts = addedProducts.filter(p => p.id !== id);
                localStorage.setItem('addedProducts', JSON.stringify(addedProducts));
                
                productsList = productsList.filter(p => p.id !== id);
                renderProducts();
                
                Swal.fire('Deleted!', 'Product has been deleted.', 'success');
            } else {
                fetch(`https://dummyjson.com/products/${id}`, {
                    method: 'DELETE',
                })
                .then((res) => res.json())
                .then(() => {
                    const deletedIds = JSON.parse(localStorage.getItem('deletedProducts')) || [];
                    if (!deletedIds.includes(id)) {
                        deletedIds.push(id);
                        localStorage.setItem('deletedProducts', JSON.stringify(deletedIds));
                    }
                    
                    productsList = productsList.filter(p => p.id !== id);
                    renderProducts();

                    Swal.fire('Deleted!', 'Product has been deleted.', 'success');
                })
                .catch((err) => console.log(err));
            }
        }
    });
}

function editProduct(id) {
    const card = document.getElementById(`product-${id}`);
    if (!card) return;
    
    const currentTitle = card.querySelector('.product-title').innerText.replace('...', '').trim();
    const currentPrice = card.querySelector('.product-price').innerText.replace('$', '').trim();
    const currentRating = card.querySelector('.product-rating').innerText.replace('Rating:', '').trim();
    const currentImg = card.querySelector('img') ? card.querySelector('img').src : '';

    Swal.fire({
        title: '<h2 style="margin: 0; font-family: sans-serif; font-size: 20px; font-weight: 700; color: #1f2937;">Edit Product</h2>',
        html: `
            <div style="text-align: left; font-family: sans-serif; padding: 10px 5px 0 5px;">
                <div style="margin-bottom: 14px;">
                    <label style="display: block; font-size: 12px; font-weight: 700; color: #4b5563; margin-bottom: 4px; text-transform: uppercase;">Product Title</label>
                    <input id="swal-title" type="text" style="width: 100%; height: 40px; padding: 0 10px; box-sizing: border-box; border: 1px solid #d1d5db; border-radius: 6px; font-size: 15px; outline: none;" value="${currentTitle}">
                </div>
                
                <div style="margin-bottom: 14px;">
                    <label style="display: block; font-size: 12px; font-weight: 700; color: #4b5563; margin-bottom: 4px; text-transform: uppercase;">Price ($)</label>
                    <input id="swal-price" type="number" style="width: 100%; height: 40px; padding: 0 10px; box-sizing: border-box; border: 1px solid #d1d5db; border-radius: 6px; font-size: 15px; outline: none;" value="${currentPrice}">
                </div>
                
                <div style="margin-bottom: 14px;">
                    <label style="display: block; font-size: 12px; font-weight: 700; color: #4b5563; margin-bottom: 4px; text-transform: uppercase;">Rating</label>
                    <input id="swal-rating" type="number" step="0.01" style="width: 100%; height: 40px; padding: 0 10px; box-sizing: border-box; border: 1px solid #d1d5db; border-radius: 6px; font-size: 15px; outline: none;" value="${currentRating}">
                </div>
                
                <div>
                    <label style="display: block; font-size: 12px; font-weight: 700; color: #4b5563; margin-bottom: 4px; text-transform: uppercase;">Product Image File</label>
                    <input id="swal-file" type="file" accept="image/*" style="display: block; width: 100%; font-size: 14px; color: #4b5563; margin-top: 4px;">
                </div>
            </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonColor: '#10b981', 
        cancelButtonColor: '#6b7280',  
        confirmButtonText: 'Save Changes',
        cancelButtonText: 'Cancel',
        customClass: {
            popup: 'rounded-2xl',
            confirmButton: 'rounded-lg px-4 py-2 font-medium text-sm',
            cancelButton: 'rounded-lg px-4 py-2 font-medium text-sm'
        },
        preConfirm: () => {
            const title = document.getElementById('swal-title').value;
            const price = document.getElementById('swal-price').value;
            const rating = document.getElementById('swal-rating').value;
            const fileInput = document.getElementById('swal-file');
            const file = fileInput.files[0];

            if (!title || !price || !rating) {
                Swal.showValidationMessage('Please fill all text fields');
                return false;
            }

            return new Promise((resolve) => {
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        resolve({ title, price, rating, img: e.target.result });
                    };
                    reader.readAsDataURL(file);
                } else {
                    resolve({ title, price, rating, img: currentImg });
                }
            });
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const updatedData = result.value;

            let addedProducts = JSON.parse(localStorage.getItem('addedProducts')) || [];
            const addedProductIndex = addedProducts.findIndex(p => p.id === id);

            if (addedProductIndex !== -1) {
                addedProducts[addedProductIndex] = {
                    id: id,
                    title: updatedData.title,
                    price: Number(updatedData.price),
                    rating: Number(updatedData.rating),
                    thumbnail: updatedData.img,
                    images: [updatedData.img]
                };
                localStorage.setItem('addedProducts', JSON.stringify(addedProducts));

                productsList = productsList.map(p => p.id === id ? addedProducts[addedProductIndex] : p);
                renderProducts();

                Swal.fire('Saved!', 'Product has been updated.', 'success');
            } else {
                fetch(`https://dummyjson.com/products/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: updatedData.title,
                        price: Number(updatedData.price),
                        rating: Number(updatedData.rating)
                    })
                })
                .then(res => res.json())
                .then(() => {
                    const editedProducts = JSON.parse(localStorage.getItem('editedProducts')) || {};
                    editedProducts[id] = {
                        id: Number(id),
                        title: updatedData.title,
                        price: Number(updatedData.price),
                        rating: Number(updatedData.rating),
                        thumbnail: updatedData.img,
                        images: [updatedData.img]
                    };
                    localStorage.setItem('editedProducts', JSON.stringify(editedProducts));

                    productsList = productsList.map(p => p.id === id ? editedProducts[id] : p);
                    renderProducts();

                    Swal.fire('Saved!', 'Product has been updated.', 'success');
                })
                .catch(() => Swal.fire('Error!', 'Something went wrong.', 'error'));
            }
        }
    });
}
function addNewProduct(title, price, imageSrc) {
    const addedProducts = JSON.parse(localStorage.getItem('addedProducts')) || [];
    
    const newProduct = {
        id: Date.now(), 
        title: title,
        price: price,
        rating: 5.0,
        images: [imageSrc], 
        thumbnail: imageSrc
    };
    
    addedProducts.push(newProduct);
    localStorage.setItem('addedProducts', JSON.stringify(addedProducts));
}

