<template>
  <div class="col-md-4 pl-0">
    <h2 class="mb-5">Force Logout E3</h2>
    <form @submit.prevent="onCreatePost">
      <div :class="flex">
        <div
          class="alert alert-success"
          v-if="result === 'http://login.lippo.homes/'"
        >
          Logout Successfully
        </div>
        <div
          class="alert alert-success"
          v-if="result !== 'http://login.lippo.homes/'"
        >
          {{ result }}
        </div>
      </div>
      <div class="form-group">
        <input
          type="text"
          name="membercode"
          class="form-control"
          placeholder="Username"
          v-model="form.membercode"
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
        membercode: ""
      },
      info: null,
      result: null,
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
          "https://api.lippo.homes/api/TokenAuth/LogoutMember?memberCode=" +
            this.form.membercode
        )
        .then(response => {
          console.log(response);
          this.$isLoading(false); // hide loading screen
          this.mulai = true;
          this.info = response;
          this.result = this.info.data.result.message;
          this.resetForm(); // reset
          this.focusInput();
        })
        .catch(error => console.log(error));
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
