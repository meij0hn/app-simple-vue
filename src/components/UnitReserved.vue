<template>
  <div class="col-md-4 pl-0">
    <h2 class="mb-5">TRUnitReserved</h2>

    <form @submit.prevent="onCreatePost2">
      <div class="form-group">
        <input
          type="text"
          name="membercode"
          class="form-control"
          placeholder="membercode"
          v-model="form.membercode"
          ref="fcs"
          required
        />
      </div>

      <div class="mt-3 mb-3">
        <button type="submit" class="brn btn-primary">Submit</button>
      </div>

      <div :class="flex2">
        <div class="alert alert-success">
          <p>{{ data2 }}</p>
        </div>
      </div>
    </form>

    <form @submit.prevent="onCreatePost">
      <div class="form-group">
        <input
          type="text"
          name="unitReservedID"
          class="form-control"
          placeholder="unitReservedID"
          v-model="form.unitReservedID"
          ref="fcs"
          required
        />
      </div>

      <div class="mt-3 mb-3">
        <button type="submit" class="brn btn-primary">Delete</button>
      </div>

      <div :class="flex">
        <div class="alert alert-success">
          <p>{{ dat1 }}</p>
          <p>{{ dat2 }}</p>
          <p>{{ dat3 }}</p>
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
        unitReservedID: "",
        membercode: ""
      },
      info: null,
      success: null,
      eror: null,
      mulai: false,
      mulai2: false,
      dat1: null,
      dat2: null,
      dat3: null,
      token: null,
      data1: null,
      data2: null
    };
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    onCreatePost() {
      this.$isLoading(true); // show loading screen
      axios
        .post("https://api.lippo.homes/api/TokenAuth/Authenticate", {
          userNameOrEmailAddress: "adm.meijhone",
          password: "kjkszpj",
          rememberClient: true
        })
        .then(response => {
          console.log(response);
          this.info = response;
          this.dat1 = this.info.data.result.accessToken;

          axios
            .post(
              "https://api.lippo.homes/api/services/app/Account/Impersonate",
              {
                tenantId: 1,
                userId: 2
              },
              {
                headers: {
                  Authorization: "Bearer " + this.dat1
                }
              }
            )
            .then(response => {
              console.log(response);
              this.$isLoading(false); // hide loading screen
              this.info2 = response;
              this.dat2 = this.info2.data.result.impersonationToken;

              axios
                .post(
                  "https://api.lippo.homes/api/TokenAuth/ImpersonatedAuthenticate?impersonationToken=" +
                    this.dat2,
                  {},
                  {}
                )
                .then(response => {
                  console.log(response);
                  this.$isLoading(false); // hide loading screen
                  this.info3 = response;
                  this.dat3 = this.info3.data.result.accessToken;

                  axios
                    .delete(
                      "https://api.lippo.homes/api/services/app/Transaction/DeleteTrUnitReserved?unitReservedID=" +
                        this.form.unitReservedID,
                      {
                        headers: {
                          Authorization: "Bearer " + this.dat3
                        }
                      }
                    )
                    .then(response => {
                      console.log(response);
                      this.$isLoading(false); // hide loading screen
                      this.info4 = response;
                      this.dat3 = this.info4.data.result.accessToken;

                      this.mulai = true;
                      this.resetForm(); // reset
                      this.focusInput();
                    });
                });
            });
        });
    },
    onCreatePost2() {
      this.$isLoading(true); // show loading screen

      axios
        .post("https://api.lippo.homes/api/TokenAuth/Authenticate", {
          userNameOrEmailAddress: "adm.meijhone",
          password: "kjkszpj",
          rememberClient: true
        })
        .then(response => {
          console.log(response);
          this.info5 = response;
          this.token = this.info5.data.result.accessToken;

          axios
            .get(
              "https://api.lippo.homes//api/services/app/User/GetUsers?Filter=" +
                this.form.membercode +
                "&Permission=&MaxResultCount=1&SkipCount=0",
              {
                headers: {
                  Authorization: "Bearer " + this.token
                }
              }
            )
            .then(response => {
              console.log(response);
              this.$isLoading(false); // hide loading screen
              this.info6 = response;
              this.data1 = this.info6.data.result.items[0].id;

              axios
                .get(
                  "https://api.lippo.homes/api/services/app/Transaction/GetTrUnitReserved?userID=" +
                    this.data1,
                  {
                    headers: {
                      Authorization: "Bearer " + this.token
                    }
                  }
                )
                .then(response => {
                  console.log(response);
                  this.$isLoading(false); // hide loading screen
                  this.info7 = response;
                  this.data2 = this.info7.data.result;
                  this.mulai2 = true;
                });
            });
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
    },
    flex2: function() {
      return this.mulai2 ? "d-flex" : "d-none";
    }
  }
};
</script>
