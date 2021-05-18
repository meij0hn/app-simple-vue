<template>
    <div class="col-md-4 pl-0">
        <h2 class="mb-5">Expire</h2>
    
        <form @submit.prevent="onCreatePost">
        <div class="form-group">
            <input
            type="text"
            name="order"
            class="form-control"
            placeholder="order"
            v-model="form.order"
            ref="fcs"
            required
            />
        </div>

        <div class="mt-3 mb-3">
            <button type="submit" class="brn btn-primary">Submit</button>
        </div>

        <div :class="flex">
            <div class="alert alert-success" v-if="success === true">
            <p>Status : {{ info.data.status_message }}</p>
            <p>OrderCode : {{ info.data.order_id }}</p>
            <p>Amount : {{ info.data.gross_amount }}</p>
            <p>Payment Type : {{ info.data.payment_type }}</p>
            <p>Transaction Time : {{ info.data.transaction_time }}</p>
            <p>Virtual Account : {{ info.data.permata_va_number }}</p>
            <p>Transaction Status : {{ info.data.transaction_status }}</p>
            </div>
            <div class="alert alert-success" v-if="success === false">
            {{ info }}
            </div>
        </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";


import loading from "vuejs-loading-screen";
Vue.use(loading, {
  bg: "#41b883ad",
  icon: "refresh",
  size: 4,
  icon_color: "white"
});

export default {
  data() {
    return {
      form: {
        order: ""
      },
      info: null,
      success: null,
      eror: null,
      mulai: false
    };
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    onCreatePost() {
      this.$isLoading(true); // show loading screen
      
      axios
        .post(
          "http://mrmjohn.com:3002/api/midtrans/status?ordercode=" + this.form.order
        )
        .then(response => {
          console.log(response);
          this.$isLoading(false); // hide loading screen
          this.mulai = true;
          this.info = response;
          this.success = true;
          this.resetForm(); // reset
          this.focusInput();
        })
        .catch(error => {
          console.log(error);
          this.$isLoading(false); // hide loading screen
          this.mulai = true;
          this.info = false;
          this.success = false;
        });

    },  
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
    }
  },
  computed: {
    flex: function() {
      return this.mulai ? "d-flex" : "d-none";
    }
  }
};
</script>