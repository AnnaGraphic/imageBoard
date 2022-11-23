import Comments from "./comment.js";
const Modal = {
    data() {
        //save the variables here
        return {
            images: [],
            title: "",
            description: "",
            username: "",
            closeModal() {
                this.isModal = false;
            },
        };
    },
    methods: {
        close() {
            console.log("closeaction");
            this.$emit("close");
        },
    },
    components: {
        //key is the name in the html and the value ist what i want to import
        Comments: Comments,
    },
    props: ["image"],
    mounted() {
        console.log("image.id in mounted", this.image.id);
    },
    template: `<div class="modal">
                <button type="button" class="close" 
    @click="close"> X 
</button>
    <div class="modalImgContainer">
    <h1> {{ image.title}} </h1>  <p>uploaded by {{ image.username }}</p>
    <img :src="image.url" class="modalImg" />
    <p>{{ image.description }}</p> 
                
    </div>
  <Comments :id="image.id">comments</Comments>
    </div>`,
};
export default Modal;
