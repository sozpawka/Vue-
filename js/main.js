
let app = new Vue({
   el: '#app',
   data: {
       brand: 'Vue Mastery',
       product: "Socks",
       image: "./assets/vmSocks-blue-onWhite.jpg",
       description: "A pair of warm, fuzzy socks", // 1 практическая
       altText: "A pair of socks",
       link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks", // 2 практическая
       selectedVariant: 0,
       inventory: 100,
       onSale: false, // 3 практическая 
       details: ['80% cotton', '20% polyester', 'Gender-neutral'],
       sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
       cart: 0,

       variants: [
       {
        variantId: 2234,
        variantColor: 'green',
        variantImage: "./assets/vmSocks-green-onWhite.jpg",
        variantQuantity: 10,
       },
       {
        variantId: 2235,
        variantColor: 'blue',
        variantImage: "./assets/vmSocks-blue-onWhite.jpg",
        variantQuantity: 0,
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
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        }

    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
        return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() { // 7 практическая
            if (this.onSale) {
                return this.brand + ' ' + this.product + 'on sale'
            } else {
                return this.brand + ' ' + this.product + 'not sale'
            }
        }
    },
    
})
