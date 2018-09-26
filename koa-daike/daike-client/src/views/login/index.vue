<template>
    <div class="login-container">
        <img src="@/assets/daike.png" class="logo"/>

        <van-cell-group class="box">
            <van-field v-model="account" label-align="left" required clearable label="用户名" icon="question" placeholder="请输入用户名"  @click-icon="handleQueation"/>
            
            <van-field v-model="password" label-align="left" required type="password" clearable label="密码" placeholder="请输入密码" />

            <van-field v-show="!isLogin" v-model="rePassword" required label-align="left" type="password" clearable label="重复密码" />
        </van-cell-group>

        <van-row>

            <van-button type="default" class="btn-register" size="samll" @click="handleRegister">
                {{isLogin?'注册':'已有账号'}}
            </van-button>
            <van-button type="primary" class="btn-login" size="small" @click="handleLogin">
                {{isLogin?'登录':'注册并登录'}}
            </van-button>
        </van-row>
    </div>
</template>
<script>

import { mapMutations} from 'vuex'
export default {
  data() {
    return {
      account: "",
      password: "",
      rePassword: "",
      isLogin: true
    };
  },
  methods: {
    handleQueation() {
      console.log("no descript");
    },
    handleRegister() {
      this.isLogin = !this.isLogin;
    },
    handleLogin() {
      if (this.account == "" || this.password == "") {
        this.$toast.fail("用户名或密码不能为空!");
        return;
      }
      if (this.isLogin) {//登录
        this.showLoginTip();
        this.login();
      } else {//注册
        if (this.rePassword != this.password) {
          this.$toast.fail("两次输入的密码不一致!");
          return;
        }
        this.showLoginTip()
        this.$http
            .register({
                account: this.account,
                password: this.password
            })
            .then(res => {
                this.$toast.clear()
                this.$router.push('/home')
            })
            .catch(err => {
                this.$toast.clear()
            })
      }
    },
    login() {
      this.$http
        .login({
          account: this.account,
          password: this.password
        })
        .then(res => {
          this.$toast.clear()
          this.SET_USER(res.data)
          this.$router.push('/home')
        })
        .catch(err => {});
    },
    showLoginTip() {
      const toast = this.$toast.loading({
        duration: 0,
        forbidClick: false,
        loadingType: "spinner",
        message: "登录中..."
      });
    },
    ...mapMutations(['SET_USER'])
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.logo {
  width: 300px;
  margin: 100px 0 20px;
}
.box {
  width: 280px;
  margin-bottom: 20px;
}
.btn-login {
  margin-left: 20px;
}
.btn-register {
  height: 30px;
  padding: 0 8px;
  min-width: 60px;
  font-size: 12px;
  line-height: 28px;
}
</style>
