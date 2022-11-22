const Modal = {
    data() {
        //save the variables here
        return {
            images: [],
            title: "",
            description: "",
            username: "",
        };
    },
    methods: {},
    props: ["imageId"],
    mounted() {
        console.log("imageId in mounted", this.imageId);
    },
    template: '<div class="modal"><h1>{{ imageId }}</h1></div>',
};
export default Modal;
