<template>
  <div class="col-md-8 pl-0">
    <h2 class="mb-5">Regenerate and Recalculate Balance and Penalty </h2>
    <form>
      <div class="form-group">
        <input
          type="text"
          name="bookcode"
          class="form-control"
          placeholder="bookcode"
          v-model="form.bookcode"
          required
        />
      </div>
    </form>
    
    <form @submit.prevent="recalcBalance">
      <div class="mt-3 mb-3">
        <button type="submit" class="brn btn-primary ml-2 mr-2">Recalculate Balance</button>
      </div>

      <div :class="flex">
        <div class="alert alert-success" v-if="ketRB == true">
          <p>Status : {{ messageRB }}</p>
        </div>
        <div class="alert alert-success" v-if="ketRB == false">
          {{ messageRB }}
        </div>
      </div>
    </form>

    <form @submit.prevent="recalcPenalty">
      <div class="mt-3 mb-3">
        <button type="submit" class="brn btn-primary ml-2 mr-2">Recalculate Penalty</button>
      </div>

      <div :class="flex">
        <div class="alert alert-success" v-if="ketRP == true">
          <p>Status : {{ messageRP }}</p>
        </div>
        <div class="alert alert-success" v-if="ketRP == false">
          {{ messageRP }}
        </div>
      </div>
    </form>

    <form @submit.prevent="generateSchedule">
      <div class="mt-3 mb-3">
        <button type="submit" class="brn btn-primary ml-2 mr-2">Generate Schedule</button>
      </div>

      <div :class="flex">
        <div class="alert alert-success" v-if="ketGS == true">
          <p>Status : {{ messageGS }}</p>
        </div>
        <div class="alert alert-success" v-if="ketGS == false">
          {{ messageGS }}
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
        bookcode: ""
      },
      info: null,
      success: null,
      eror: null,
      notif: false
    };
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    recalcBalance() {
        this.$isLoading(true); // show loading screen
        this.notif = false;

        axios.post("https://api.lippo.homes/api/services/app/PSASSchedule/RecalculateBalanceNew", {
            "bookcode": this.form.bookcode
        })
        .then(response => {
            console.log(response);
            this.notif = true;
            this.$isLoading(false); // hide loading screen
            this.info = response;
            this.ketRB = response.data.success;
            this.messageRB = response.data.result.message;
            // this.resetForm();
        })
        .catch(error => {
            console.log(error);
            this.notif = true;
            this.$isLoading(false); // hide loading screen
            this.info = error;
            this.ketRB = error.response.data.success;
            this.messageRB = error.response.data.error.message;
            // this.resetForm();
        });

    },

    recalcPenalty() {
        this.$isLoading(true); // show loading screen
        this.notif = false;
        
        axios.post("https://api.lippo.homes/api/services/app/PSASPenalty/RecalculatePenaltyNew?bookCode=" + this.form.bookcode)
        .then(response => {
            console.log(response);
            this.notif = true;
            this.$isLoading(false); // hide loading screen
            this.info = response;
            this.ketRP = response.data.success;
            this.messageRP = "Successfully Recalculate Penalty";
            // this.resetForm();
        })
        .catch(error => {
            console.log(error);
            this.notif = true;
            this.$isLoading(false); // hide loading screen
            this.ketRP = error.response.data.success;
            this.messageRP = error.response.data.error.message;
            // this.resetForm();
        });

    },

    generateSchedule() {
        this.$isLoading(true); // show loading screen
        this.notif = false;
        
        axios.post("https://api.lippo.homes/api/services/app/PSASSchedule/RegenerateSchedule", {
          "bookcode": this.form.bookcode
        })
        .then(response => {
            console.log(response);
            this.notif = true;
            this.$isLoading(false); // hide loading screen
            this.info = response;
            this.ketGS = response.data.success;
            this.messageGS = "Successfully Regenerate Schedule";
        })
        .catch(error => {
            console.log(error);
            this.notif = true;
            this.$isLoading(false); // hide loading screen
            this.ketGS = error.response.data.success;
            this.messageGS = error.response.data.error.message;
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
    },
  },
  computed: {
    flex: function() {
      return this.notif ? "d-flex" : "d-none";
    }
  }
};
</script>
