//     async function fetchProducts() {
//     const res = await fetch('https://dummyjson.com/products')
//     const data = await res.json()
//     if (!data?.products) return;
//     const mappedPr = data.products.map((item)=>{
//         const imgPr = (item?.images && item.images.length > 0)
//             ? `<img class='prImg' src='${item.images[0]}' alt='${item.title}' />` 
//             : 'Mahsulot rasmi mavjud emas';


//       return `<div>
//             ${imgPr}
//       </div>`
//     }).join('')


//         document.querySelector('').innerHTML = mappedPr
    
// }
// fetchProducts()

