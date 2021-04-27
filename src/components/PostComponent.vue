<template>
  <div class="col-md-4 pl-0">
    <h2 class="mb-5">Force Logout E3</h2>
    <form @submit.prevent="onCreatePost">
      <div class="form-group">
        <input
          type="text"
          name="membercode"
          class="form-control"
          placeholder="Username"
          v-model="membercode"
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

export default {
  data() {
    return {
      membercode: ""
    };
  },
  methods: {
    onCreatePost() {
      axios
        .post(
          "https://api.lippo.homes/api/TokenAuth/LogoutMember?memberCode=" +
            this.membercode
        )
        .then(response => {
          console.log(response);
        });
    }
  }
};
</script>
