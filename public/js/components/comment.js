const Comments = {
    data() {
        return {
            comments: [],
            username: "",
            comment: "",
        };
    },
    methods: {
        sendComment(e) {
            e.preventDefault();
            console.log("comments", this.username, this.comment, this.id);
            const comment = {
                username: this.username,
                comment: this.comment,
                imageId: this.id,
            };

            console.log(comment);
            fetch("/comments", {
                method: "POST",
                body: JSON.stringify(comment),
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => {
                    return response.json();
                    // console.log("respone", response);
                })
                .then((lastComment) => {
                    this.comments.push(lastComment);
                    console.log("lastComment", lastComment);
                });

            // 1 hole daten aus form
            // 2. in json formatieren
            // 3. an post comments schicken
            // 4. res aktueller kommentar
            // 5. ins comments[] array pushen

            // this.$emit("sendComment").then((response) => {
            //     return;
            // });
        },
    },
    props: ["id"],
    //mounted wird immer aufgerufen, wenn die komponente das erste mal aufgerufen wird
    mounted() {
        //
        // fetch("/comments")
        //     .then((res) => {
        //         console.log("res.lson", res.json);
        //         return res.json();
        //     })
        //     .then((bodyProperty) => {
        //         this.bodyProperty = bodyProperty;
        //         console.log("bodyProperty", this.bodyProperty);
        //     });
    },
    template: `<div>
     <form id="commentForm"  
                method=""
                enctype="multipart/form-data">

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
