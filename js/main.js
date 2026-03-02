let cart = 0;

let app = new Vue({
   el: '#app',
   data: {
       product: "Socks",
       image: "./assets/vmSocks-blue-onWhite.jpg",
       description: "A pair of warm, fuzzy socks", // 1 практическая
       altText: "A pair of socks",
       link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks", // 2 практическая
       inStock: false,
       inventory: 100,
       onSale: true, // 3 практическая 
       details: ['80% cotton', '20% polyester', 'Gender-neutral'],
       sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
       cart: 0,

       variants: [
       {
        variantId: 2234,
        variantColor: 'green',
        variantImage: "./assets/vmSocks-green-onWhite.jpg",
       },
       {
        variantId: 2235,
        variantColor: 'blue',
        variantImage: "./assets/vmSocks-blue-onWhite.jpg",
       }
      ],
   },
   methods: {
        addToCart() {
            this.cart += 1
        },
        DeleteToCart() {
            this.cart -= 1 // 5 практическая
        },
        updateProduct(variantImage) {
            this.image = variantImage
        }
    },


})
