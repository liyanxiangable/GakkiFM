<template>
  <div class="register">
    <div class="form">
      <div class="input">
        <div class="username input-item">
          <div class="row">
            <label class="label">用&nbsp&nbsp户&nbsp&nbsp名</label>
            <input type="text" class="input-element" v-model="username" placeholder=" 用户名长度 6 至 20 位" :disabled="disabled">
          </div>
          <div class="tip tip-username">
            <p>
              {{ usernameTip }}
            </p>
          </div>
        </div>
        <div class="password input-item">
          <div class="row">
            <label class="label">密&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp码</label>
            <input type="password" class="input-element"  v-model="password" placeholder=" 密码长度 6 至 20 位字母数字组合" :disabled="disabled">
          </div>
          <div class="tip tip-password">
            <p>
              {{ passwordTip }}
            </p>
          </div>
        </div>
        <div class="repeat input-item">
          <div class="row">
            <label class="label">确认密码</label>
            <input type="password" class="input-element"  v-model="repeat" placeholder=" 请再次输入以上密码" :disabled="disabled"/>
          </div>
          <div class="tip tip-repeat">
            <p>
              {{ repeatTip }}
             </p>
          </div>
        </div>
      </div>
      <div class="button-group">
        <button class="submit button" @click.prevent="submitClicked">提交</button>
        <router-link tag="button" class="login button" to="/login">登录</router-link>
      </div>
    </div>
  </div>
</template>


<script>
  import isInputLegal from 'common/js/isInputLegal'
  import isTwoStringEqual from 'common/js/isTwoStringEqual'
  import register from 'api/register'
  export default {
    data () {
      return {
        username: '',
        password: '',
        repeat: '',
        usernameTip: '',
        passwordTip: '',
        repeatTip: '',
        isSubmit: false,
        disabled: false,
      }
    },
    methods: {
      submitClicked () {
        this.isSubmit = true
        if (this._isFormDataLegal()) {
          this._toggleLock ()
          register (this.username, this.password)
        }
      },
      _toggleLock () {
        this.disabled = !this.disabled
      },
      _isFormDataLegal () {
        let ul = this._isUsernameLegal()
        let pl = this._isPasswordLegal()
        let rl = this._isRepeatLegal()
        return ul && pl && rl
      },
      _isUsernameLegal () {
        if (this.isSubmit) {
          if (this.username.length === 0) {
            this.usernameTip = '用户名不能为空'
          } else if (this.username.length < 6) {
            this.usernameTip = '用户名长度不应低于 6 位'
          } else if (this.username.length > 20) {
            this.usernameTip = '用户名长度不应超过 20 位'
          } else {
            if (isInputLegal(this.username)) {
              this.usernameTip = ''
              return true
            } else {
              this.usernameTip = '用户名只能包含数字与英文字母'
            }
          }
        }
        return false;
      },
      _isPasswordLegal () {
        if (this.isSubmit) {
          if (this.password.length === 0) {
            this.passwordTip = '密码不能为空'
          } else if (this.password.length < 6) {
            this.passwordTip = '密码长度不应低于 6 位'
          } else if (this.password.length > 20) {
            this.passwordTip = '密码长度不应超过 20 位'
          } else {
            if (isInputLegal(this.password)) {
              this._isRepeatLegal()
              this.passwordTip = ''
              return true
            } else {
              this.passwordTip = '用户名只能包含数字与英文字母'
            }
          }
        }
        return false
      },
      _isRepeatLegal () {
        if (this.isSubmit) {
          if (isTwoStringEqual(this.password, this.repeat)) {
            this.repeatTip = ''
            return true
          } else {
            this.repeatTip = '两次密码输入不一致'
          }
        }
        return false
      }
    },
    watch: {
      username () {
        this._isUsernameLegal()
      },
      password () {
        this._isPasswordLegal()
      },
      repeat () {
        this._isRepeatLegal()
      },
    }
  }
</script>


<style scoped>
  .register {
    display: flex;
    align-items: center;
    width: 100%;
    height: 90%;
    flex-direction: column;
    background-color: #777;
    padding-top: 30%;
  }
  .form {
    display: flex;
    flex-direction: column;
    width: 70%;
    color: beige;
  }
  .input {
    font-size: 18px;
  }
  .input-item {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .row {
    display: flex;
    height: 30px;
  }
  .label {
    display: flex;
    width: 30%;
    line-height: 30px;
  }
  .input-element {
    background-color: rgba(160,160,160,0.3);
    width: 70%;
    color: beige;
    border: none;
    border-radius: 15px;
    font-size: 20px;
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
  .tip {
    display: flex;
    justify-content: center;
    height: 30px;
    color: orange;
  }
  .tip p {
    line-height: 30px;
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
</style>
