<template>
  <div id="login">
     <v-card
      class="mx-auto"
      max-width="344"
    >
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        required
      ></v-text-field>
  
      <!-- <v-select
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Item is required']"
        label="Item"
        required
      ></v-select> -->
  
      <!-- <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox> -->
  
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Validate
      </v-btn>
  
      <!-- <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>
  
      <v-btn
        color="warning"
        @click="resetValidation"
      >
        Reset Validation
      </v-btn> -->
    </v-form>
    </v-card>
    <v-alert  :type="success" v-show="visibleSuccess">
      {{message}}
      <p>
        <v-btn @click="onClickSuccess">确定</v-btn>
      </p>   
    </v-alert>
     <v-alert  :type="error" v-show="visibleError">
      {{message}}
      <p>
        <v-btn @click="onClickError">确定</v-btn>
      </p>   
    </v-alert>
  </div>  
</template>

<script>
// import swal from 'sweetalert'
import {login} from '../api/test'
export default {
  name: 'login',
  components: {
    
  },
  data(){
      return{
            valid: true,
            name: '',
            nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 20) || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            password: '',
            passwordRules: [
            v => !!v || 'password is required',
            v => (v && v.length <= 6) || 'password must be valid',
            ],
            select: null,
            items: [
            'Item 1',
            'Item 2',
            'Item 3',
            'Item 4',
            ],
            checkbox: false,
            visibleSuccess:false,
            visibleError:false,
            typeClass:'',
            message:''
      }
  },
  methods: {
    async validate () {
      this.$refs.form.validate()
      const params = {
        username:this.name,
        password:this.password
      }
      console.log(params)
      await login(params).then((res)=>{
        // swal({
        //   title:'登录成功',
        //   text:res,
        //   icon:'success',
        //   button:'确定'

        // })
        // this.$alert.success(res);
        this.visibleSuccess = true;
        // this.typeClass = 'success'
        this.message = res;
        // this.$message.success(res)
      }).catch((err)=>{
        //  swal({
        //   title:'登录失败',
        //   text:err,
        //   icon:'error',
        //   button:'确定'

        // })
        // this.$alert.error(err)
        this.visibleError = true;
        // this.typeClass = 'error'
        this.message = err;
        // this.$message.error(err)
      });
      
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    onclick(){
      this.visible = !this.visible
    },
    onClickSuccess(){
      this.visibleSuccess = !this.visibleSuccess;
    },
    onClickError(){
      this.visibleError = !this.visibleError;
    },
  },
}
</script>
<style scoped>
#login >>>.v-alert{
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
}
</style>
