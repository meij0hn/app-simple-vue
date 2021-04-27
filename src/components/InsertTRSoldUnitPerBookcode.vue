<template>
  <div class="col-md-4 pl-0">
    <h2 class="mb-5">Insert TRSoldUnit Per Bookcode</h2>
    <form @submit.prevent="onCreatePost">
      <div :class="flex">
        <div class="alert alert-success" v-if="success === true">
          Successfully Input Data
        </div>
        <div class="alert alert-success" v-if="success === false">
          {{ info }}
        </div>
      </div>
      <div class="form-group">
        <input
          type="text"
          name="bookNo"
          class="form-control"
          placeholder="bookCode"
          v-model="form.bookNo"
          ref="fcs"
          required
        />
      </div>

      <div class="mt-3">
        <button type="submit" class="brn btn-primary">Submit</button>
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
        bookNo: ""
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
          "http://54.179.213.96:1005/api/services/app/TrSoldUnit/InsertSoldUnitPerBookCode?bookcode=" +
            this.form.bookNo
        )
        .then(response => {
          console.log(response);
          this.$isLoading(false); // hide loading screen
          this.mulai = true;
          this.info = response;
          this.success = this.info.data.success;
          this.resetForm(); // reset
          this.focusInput();
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
