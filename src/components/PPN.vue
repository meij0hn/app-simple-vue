<template>
    <div class="col-md-8 pl-0">
        <h2 class="mb-5">PPN</h2>

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
            
        <form @submit.prevent="getVat">
            <div class="mt-3 mb-3">
                <button type="submit" class="brn btn-primary ml-2 mr-2">Submit</button>
            </div>

            <div :class="flex">
                <div class="alert alert-success" v-if="ketGS == true">
                    <p>{{bookNo}}</p>
                    <p>{{itemName1}} : {{ pctTax1 }}</p>
                    <p>{{itemName2}} : {{ pctTax2 }}</p>
                    <p>{{itemName3}} : {{ pctTax3 }}</p>

                    <form @submit.prevent="ShowUpdateVat">
                        <div :class="flex2">
                            <button type="submit" class="brn btn-success ml-2 mr-2">Update Vat</button>
                        </div>                        
                    </form>
                    <div :class="flex3" class="row mt-2 mb-2 ml-2 mr-2">
                        <input type="text" class ="col-sm-3 mr-1" placeholder="pctTax" v-model="form.pctTax" required>
                        <input type="text" class ="col-sm-3 mr-1" placeholder="Tiket Melita" v-model="form.tiket" required>
                        <form @submit.prevent="UpdateVat" class="col-sm-3"><button type="submit" class="brn btn-success ml-2 mr-2">Update</button></form>
                    </div>
                
                </div>
                <div class="alert alert-danger" v-if="ketGS == false">
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
        bookcode: "",
        pctTax: 0,
        tiket: null
      },
      info: null,
      success: null,
      eror: null,
      notif: false,
      notif2: true,
      notif3: false
    };
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    getVat() {
        this.$isLoading(true); // show loading screen
        this.notif = false;

        axios.post("http://api.mrmjohn.com/services/api/vat", {
            "bookcode": this.form.bookcode
        })
        .then(response => {
            console.log(response);
            this.notif = true;
            this.$isLoading(false); // hide loading screen
            this.ketGS = response.data.success;
            this.bookNo = this.form.bookcode;
            this.itemName1 = response.data.result[0].itemName;
            this.itemName2 = response.data.result[1].itemName;
            this.itemName3 = response.data.result[2].itemName;
            this.pctTax1 = response.data.result[0].pctTax;
            this.pctTax2 = response.data.result[1].pctTax;
            this.pctTax3 = response.data.result[2].pctTax;
            this.form.pctTax = this.pctTax1;
            // this.resetForm();
        })
        .catch(error => {
            console.log(error);
            this.notif = true;
            this.$isLoading(false); // hide loading screen
            this.info = error;
            this.ketGS = error.response.data.success;
            this.messageGS = error.response.data.error;
            // this.resetForm();
        });
    },
    ShowUpdateVat() {
        this.notif2 = false;
        this.notif3 = true;
    },
    UpdateVat() {
        this.$isLoading(true); // show loading screen
        this.notif = false;

        axios.post("http://api.mrmjohn.com/services/api/updateVat", {
            "bookcode": this.bookNo,
            "pctTax": this.form.pctTax,
            "tiket": this.form.tiket
        })
        .then(response => {
            console.log(response);
            this.getVat();
            this.notif2 = true;
            this.notif3 = false;
        })
        
        
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
    },
    flex2: function() {
      return this.notif2 ? "d-flex" : "d-none";
    },
    flex3: function() {
      return this.notif3 ? "d-flex" : "d-none";
    },
  }
};
</script>