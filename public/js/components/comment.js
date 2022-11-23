const Comments = {
    data() {
        return {
            comments: [],
            username: "",
            comment: "",
        };
    },
    methods: {
        sendComment() {
            //  console.log("sendComment");
            this.$emit("sendComment");
        },
    },
    props: ["image.id"],
    mounted() {
        // console.log("comments");
        fetch("/comments")
            .then((res) => {
                console.log("res.lson", res.json);
                return res.json();
            })
            .then((bodyProperty) => {
                this.bodyProperty = bodyProperty;
                console.log("bodyProperty", this.bodyProperty);
            });
    },
    template: `<div>
     <form id="commentForm"  
                method=""
                enctype="multipart/form-data"

                @submit.prevent="">
    

                <div class="form-row">
                    <input size="25"  type="text" v-model="username" name="username" placeholder="username"/> 
                    <br>
                    <textarea rows="4" type="text" v-model="comment"  name="comment"  placeholder="Add Comment"></textarea>  
                </div>
                <input type="submit" v-on:click="sendComment" value="submit" class="button />
            </form>
    </div>`,
};
export default Comments;

//    <div class="card" v-for="comment in comments" @click="openModal(image)">
//    </div>
