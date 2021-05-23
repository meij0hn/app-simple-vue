<template>
  <div class="col-md-4 pl-0">
    <h2 class="mb-5">Notification Midtrans to E3</h2>
    <form @submit.prevent="onCreatePost">
      <div class="form-group">
        <input
          type="text"
          name="orderCode"
          class="form-control"
          placeholder="orderCode"
          v-model="form.orderCode"
          ref="fcs"
          required
        />
      </div>

      <div class="mt-3 mb-3">
        <button type="submit" class="brn btn-primary">Submit</button>
      </div>
    
      <div :class="flex">
        <div class="alert alert-success" v-if="success === true">
          <p>Status : {{ info.data.result.status_message }}</p>
          <p>OrderCode : {{ info.data.result.order_id }}</p>
          <p>Amount : {{ info.data.result.gross_amount }}</p>
          <p>Payment Type : {{ info.data.result.payment_type }}</p>
          <p>Transaction Time : {{ info.data.result.transaction_time }}</p>
          <p>Virtual Account : {{ info.data.result.permata_va_number }}</p>
          <p>Transaction Status : {{ info.data.result.transaction_status }}</p>
          <p>Status Call Notif to E3 (Success) : {{ todo }}</p>
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
        orderCode: ""
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
          "https://api.lippo.homes/api/services/app/PaymentOB/CheckPaymentStatus?orderCode=" +
            this.form.orderCode
        )
        .then(response => {
          console.log(response);
          this.$isLoading(false); // hide loading screen
          this.info = response;
          this.result = this.info.data.result;
          this.resetForm(); // reset
          this.focusInput();

                axios
                    .post(
                    "https://api.lippo.homes/api/services/app/Transaction/DoBooking", this.result
                    )
                    .then(response => {
                    console.log(response);
                    this.todo = response.data.success;

                    this.success = this.info.data.success;
                    this.mulai = true;
                });
          
          
          
        })
        .catch(error => {
          console.log(error);
          this.$isLoading(false); // hide loading screen
          this.mulai = true;
          this.info = error.response.data.error.message;
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
