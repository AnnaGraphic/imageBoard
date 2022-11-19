// Vue = obj
// The process of writing a Vue app is mainly
//adding properties and methods to the object you pass to createApp.
import * as Vue from "./vue.js";
//               where we want to hook HTML
Vue.createApp({
    //convention call function 'data'
    //You can specify data you want to render in your UI by adding a data function
    // all the properties of this object will be available for use in your HTML.
    data() {
        //will be reactive properties, the UI will automatically update to reflect the change
        return {
            images: [],
        };
    },
    //convention: define function in methodsproperty(also obj)
    // methods: {
    //     updateFirst: function (e) {
    //         //this reffered to obj
    //         this.first = "hello";
    //     },
    // },
    // mounted macht, dass die elemente erst geholt werden wenn die seite geladen hat
    mounted() {
        fetch("/images")
            .then((res) => {
                return res.json();
            })
            .then((images) => {
                // console.log("this images", this.images);

                this.images = images;
            });
    },
}).mount("#main");
