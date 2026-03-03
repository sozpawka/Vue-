
Vue.component('product-review', {
   template: `
   <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </p>
    <p>Would you recommend this product?</p> <!-- 10 практическая -->

        <label>
        <input type="radio" value="Yes" v-model="recommend">
            Yes
        </label>

        <label>
        <input type="radio" value="No" v-model="recommend">
            No
        </label>
     <p>
       <label for="name">Name:</label>
       <input id="name" v-model="name" placeholder="name" required>
     </p>

     <p>
       <label for="review">Review:</label>
       <textarea id="review" v-model="review"></textarea>
     </p>

     <p>
       <label for="rating">Rating:</label>
       <select id="rating" v-model.number="rating">
         <option>5</option>
         <option>4</option>
         <option>3</option>
         <option>2</option>
         <option>1</option>
       </select>
     </p>

     <p>
       <input type="submit" value="Submit"> 
     </p>
   </form>
 `,
   data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: [],
            recommend: null,
        }
    },
    methods:{
        onSubmit() {
            if(this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend,
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.recommend) this.errors.push("Recommendation required.")
            }
        }

    }
});


// 8 практическая
Vue.component('product-details', {
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
                <img :src="image" :alt="altText" />
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p>{{ description }}</p>
                <p v-if="inventory > 10">In stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
                <p v-else>Out of stock</p>
                <a :href="link">More products like this</a>
                <p>{{ sale }}</p>
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
                <p>Sizes:</p>
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
                    @click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
                >
                    Add to cart
                </button>

                <button @click="deleteFromCart">
                    Delete to cart
                </button>
                <div>
                    <h2>Reviews</h2>
                    <p v-if="!reviews.length">There are no reviews yet.</p>
                    <ul>
                        <li v-for="review in reviews">
                            <p>{{ review.name }}</p>
                            <p>Rating: {{ review.rating }}</p>
                            <p>{{ review.review }}</p>
                            <p>Recommend: {{ review.recommend }}</p> 
                        </li>
                    </ul>
                </div>
                <product-review 
                    @review-submitted="addReview">
                </product-review>

            </div>
        </div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: "Socks",
            description: "A pair of warm, fuzzy socks", // 1 практическая
            altText: "A pair of socks",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks", // 2 практическая
            selectedVariant: 0,
            inventory: 100,
            onSale: false, // 3 практическая 
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            reviews: [],

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

        deleteFromCart() {
            this.$emit('delete-to-cart',
            this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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
                return this.brand + ' ' + this.product + ' on sale'
            } else {
                return this.brand + ' ' + this.product + ' not sale'
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