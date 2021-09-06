<template>
    <div class="col-md-8 pl-0">
        <h2 class="mb-5">Rollback Unit Cancel</h2>

        <form>
        <div class="form-group">
            <input
            type="text"
            name="bookcode"
            class="form-control"
            placeholder="bookcode"
            v-model="form.bookcode"
            ref="fcs"
            required
            />
        </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                bookcode: ""
            },
        };
    },
    mounted() {
        this.focusInput();
    },
    methods: {
        resetForm() {
            console.log("Reset Form");
            var self = this;
            
            //Iterate through each object field, key is name of the object field`
            Object.keys(this.form).forEach(function(key) {
                self.form[key] = "";
            });
        },
        focusInput() {
            this.$refs.fcs.focus();
        },
    }
}
</script>