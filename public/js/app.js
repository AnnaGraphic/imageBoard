// Vue = obj
// The process of writing a Vue app is mainly
//adding properties and methods to the object you pass to createApp.
import * as Vue from "./vue.js";
import Modal from "./components/modal.js";
//               where we want to hook HTML
Vue.createApp({
    //"root-component"
    //convention call function 'data'
    //You can specify data you want to render in your UI by adding a data function
    // all the properties of this object will be available for use in your HTML.
    data() {
        //will be reactive properties, the UI will automatically update to reflect the change
        return {
            isModal: false,
            images: [],
            title: "",
            description: "",
            username: "",
            selectedId: 0,
        };
    },
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
            // console.log("this.title", this.title);
            fetch("/images", {
                method: "POST",
                body: formData,
            })
                .then((res) => {
                    return res.json();
                })
                .then((image) => {
                    console.log("image", image);
                    this.images.push(image);
                });
        },
        openModal: function (imageID) {
            console.log("imageid", imageID);
            this.isModal = !this.isModal;
            this.selectedId = imageID;
        },
    },
    components: {
        //key is the name in the html and the value ist what i want to import
        Modal: Modal,
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
