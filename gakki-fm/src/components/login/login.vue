<template>
  <div class="login">
    <form class="form">
      <div class="username-form form-item">
        <label class="label username-label">用户名</label>
        <input class="username input" type="text" v-model="username" placeholder=" 请输入用户名" ref="username" :disabled="disabled"/>
      </div>
      <div class="password-form form-item">
        <label class="label password-label">密&nbsp&nbsp&nbsp码</label>
        <input class="password input" type="password" placeholder=" 请输入密码"  v-model="password" />
      </div>
      <div class="tip" v-show="!legal">
        <p>
          {{ tip }}
        </p>
      </div>
      <div class="no-tip" v-show="legal"></div>
      <div class="button-group">
        <button class="submit button" @click.prevent="submitClicked">登录</button>
        <router-link tag="button" class="register button" to="register">注册</router-link>
      </div>
    </form>
  </div>
</template>


<script>
  import login from 'api/login'
  import isInputLegal from 'common/js/isInputLegal'
  import {USERNAME_MIN_LENGTH} from 'common/js/const'
  import {PASSWORD_MIN_LENGTH} from 'common/js/const'
  export default {
    data () {
      return {
        username: null,
        password: '',
        isSubmit: false,
        tip: '',
        legal: false,
        disabled: false,
      }
    },
    methods: {
      submitClicked () {
        this.isSubmit = true
        this._judgeSubmit()
      },
      _judgeSubmit () {
        if (this.username === null) {
          this.legel = false
          this.tip = '请输入用户名'
        } else if (this.username.length < USERNAME_MIN_LENGTH) {
          this.legel = false
          this.tip = '用户名长度不低于 6 位哦'
        } else if (this.password === null) {
          this.legel = false
          this.tip = '请输入密码'
        } else if (this.password.length < PASSWORD_MIN_LENGTH) {
          this.legal = false
          this.tip = '密码长度为 6 位以上哦'
        } else {
          if (isInputLegal(this.username, this.password)) {
            // this.tip = '登陆中...'
            this.legel = true
            this._toggleLock()
            login(this.username, this.password)
          }
        }
      },
      _toggleLock () {
        this.disabled = !this.disabled
      },
      registerClicked () {
        console.log('register clicked')
      }
    },
    watch: {
      username () {
        if (this.isSubmit) {
          if (this.username.length === 0) {
            this.legal = false;
            this.tip = '请输入用户名'
          } else if (this.username.length < USERNAME_MIN_LENGTH) {
            this.legal = false;
            this.tip = '用户名长度不低于 6 位哦'
          } else {
            this.legal = true
          }
        }
      },
      password () {
        if (this.isSubmit) {
          if (this.password.length === 0) {
            this.legal = false;
            this.tip = '请输入密码'
          } else if (this.username.length < USERNAME_MIN_LENGTH) {
            this.legal = false;
            this.tip = '密码长度不低于 6 位哦'
          } else {
            this.legal = true
          }
        }
      },
    }
  }
</script>


<style scoped>
  .login {
    display: flex;
    flex-direction: column;
    height: 90%;
    background-color: #777;
    padding-top: 30%;
  }
  .form {
    font-size: 20px;
    width: 70%;
    padding: 0 15%;
    color: beige;
  }
  .form-item {
    display: flex;
    height: 30px;
    width: 100%;
    margin: 30px 0;
  }
  .password-form {
    margin-bottom: 10px;
  }
  .label {
    display: flex;
    width: 30%;
    justify-content: space-around;
    line-height: 30px;
  }
  .input {
    background-color: rgba(160,160,160,0.3);
    width: 70%;
    color: #eeeeee;
    border: none;
    border-radius: 15px;
    font-size: 18px;
  }
  input::-webkit-input-placeholder { /* WebKit browsers*/
    color: #ddd;
    font-size: 14px;
  }
  input:-moz-placeholder {  /* Mozilla Firefox 4 to 18*/
    color: #ddd;
    font-size: 14px;
  }
  input::-moz-placeholder {  /* Mozilla Firefox 19+*/
    color: #ddd;
    font-size: 14px;
  }
  input:-ms-input-placeholder { /* Internet Explorer 10+*/
    color: #ddd;
    font-size: 14px;
  }
  .button-group {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 10px;
  }
  .button {
    width: 60px;
    height: 30px;
    //opacity: 0.3;
    color: beige;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    background-color: #999;
  }
  .tip {
    display: flex;
    height: 20px;
    //background-color: coral;
    justify-content: center;
  }
  .no-tip {
    width: 100%;
    height: 20px;
    //background-color: coral;
  }
  .tip p {
    display: flex;
    color: orange;
    font-size: 18px;
  }
  .submit {
  }
</style>
