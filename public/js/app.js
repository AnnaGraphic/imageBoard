// Vue = obj
// The process of writing a Vue app is mainly
//adding properties and methods to the object you pass to createApp.
import * as Vue from "./vue.js";
//               where we want to hook HTML
Vue.createApp({
    // need a function that does a post request to upload pics and infos of the form

    //convention: define function in methodsproperty(also obj)
    methods: {
        uploadImage: function (e) {
            e.preventDefault();
            const file = document.querySelector("input[type=file]").files[0];
            const formData = new FormData();

            formData.append("file", file);
            formData.append("title", this.title);
            formData.append("description", this.description);
            formData.append("username", this.username);
            console.log("this.title", this.title);
            fetch("/images", {
                method: "POST",
                body: formData,
            }); //.then uplod
        },
    },
    //"root-component"
    //convention call function 'data'
    //You can specify data you want to render in your UI by adding a data function
    // all the properties of this object will be available for use in your HTML.
    data() {
        //will be reactive properties, the UI will automatically update to reflect the change
        return {
            images: [],
            title: "",
            description: "",
            username: "",
        };
    },
    // mounted macht, dass die elemente erst geholt werden wenn die seite geladen hat
    mounted() {
        fetch("/images")
            .then((res) => {
                return res.json();
            })
            .then((images) => {
                // console.log("this images", this.images, images.title);
                this.images = images;
                this.title = images.title;
                this.description = images.description;
            });
    },
}).mount("#main");
