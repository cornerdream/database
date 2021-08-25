<!-- -->
<template>
<div class="alert">
    <v-alert
        v-if="type=='info'"
        border="left"
        type="info"
      >
        {{info}}
      </v-alert>
      <v-alert
        v-if="type=='success'"
        border="left"
        type="success"
      >
        {{info}}
      </v-alert>
      <v-alert
        v-if="type=='warning'"
        border="left"
        type="warning"
      >
        {{info}}
      </v-alert>
      <v-alert
        v-if="type=='error'"
        border="left"
        type="error"
      >
        {{info}}
      </v-alert>
</div>
</template>
<script>
export default {
name: '',
props:['type','info'],
data() {
return {}
},
created() {},
mounted() {},
methods:{
    load(){

    }
}
}
</script>
<style scoped></style>