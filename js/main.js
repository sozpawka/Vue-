

Vue.component('product-details', { // 8 практическая
    props: ['details'],
    template: `
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
    `
});

Vue.component('product', {
    props: {
       premium: {
           type: Boolean,
           required: true
       },

   },
    template: `
        <div class="product">
            <div class="product-image">
                <img v-bind:src="image" v-bind:alt="altText" />
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>
                <p> {{description}}</p>
                <p v-if="inventory > 10">In stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
                <p v-else>Out of stock</p>
                <a v-bind:href="link">More products like this</a>
                <p> {{ sale }}</p>
                <span v-show="onSale">On Sale</span>
                <span v-show="!onSale">Not Sale</span>
                <product-details :details="details"></product-details>
                <p>Shipping: {{ shipping }}</p>
                <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)"
                ></div>
                <p> Sizes: </p>
                <ul>
                    <li v-for="size in sizes">{{ size }}</li> <!-- 4 практическая -->
                </ul>
                <p 
                    v-if="!inStock"
                    :style="{ textDecoration: 'line-through' }"
                > 
                    Out of Stock 
                </p><!-- 6 практическая -->
                <button
                    v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
                >
                    Add to cart
                </button>
                <button v-on:click="DeleteToCart">Delete to cart</button>
            </div>
        </div>
    `,
    data() {
        return {
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
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart',
            this.variants[this.selectedVariant].variantId);
        },

        DeleteToCart() {
            this.$emit('delete-to-cart',
            this.variants[this.selectedVariant].variantId);
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
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        }

    },
});

new Vue({
   el: '#app',
   data: {
       premium: true,
       cart: []
   },
   methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        DeleteToCart(id) { // 9 практическая 
            let index = this.cart.indexOf(id)
            if (index > -1) {
                this.cart.splice(index, 1)
            }
        }
    }

});