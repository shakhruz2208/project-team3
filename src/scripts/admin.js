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


      return `<div id='product-${item.id}'>
            ${imgPr}
            <h1 class='text-xl font-semibold'>${item.title.length > 25 ? item.title.slice(0 , 25) + '...' : item.title}</h1>
            <div class='flex gap-36'>
           <div>
                <h1>Rating: ${item.rating}</h1>
            <h1 class='font-bold'>$${item.price}</h1>
           </div>
                    <button onclick='deleteProduct(${item.id})'> <i class="fa-solid fa-trash-can text-3xl text-red-500 pr-30 "></i></button>
            </div>
      </div>`
    }).join('')
    
    document.querySelector('.adminProducts').innerHTML = mappedPr
    } catch (error) {
        console.log(error.message);
        
    }

}
fetchProducts()


function deleteProduct(id) {
    
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444', // qizil o'chirish tugmasi
        cancelButtonColor: '#000000',
        confirmButtonText: 'Yes, delete it!'
    }).then((res)=>{
        if (res.isConfirmed) {
            
            fetch('https://dummyjson.com/products{id}' , {
                method: 'DELETE',
            }).then((res)=> res.json())
            .then((data)=>{
                
            })
        }
    })
}