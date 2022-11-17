// Vue = obj
import * as Vue from "./vue.js";
//               where we want to hook HTML
Vue.createApp({
    //convention call function 'data'
    data() {
        //has to return an obj
        return {
            description: "hello world",
            first: "",
            count: 0,
            images[],
        };
    },
    //cconvention: define function in methodsproperty(also obj)
    methods: {
        updateFirst: function (e) {
            //this reffered to obj
            this.first = "hello";
        },
    },
    // mounted macht, dass die elemente erst geholt werden wenn die seite geladen hat
    mounted() {
        fetch("/images")
            .then((res) => res.json())
            .then((cities) => {
                this.cities = cities;
            });
    },
}).mount("#main");

//create endpoint to database
//create layout
