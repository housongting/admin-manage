<template>
  <div class="login">
    <el-form :model="formData" :rules="rules" ref="ruleForm">
      <el-form-item prop="username">
        <el-input v-model="formData.username" size="middle" prefix-icon="el-icon-s-custom" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="formData.password" size="middle" prefix-icon="el-icon-lock" show-password placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginIn('ruleForm')">登
          <span style="width:50px;display:inline-block"></span>录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      formData: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    loginIn(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        //验证通过
        if (valid) {
          //管理员
          if (this.formData.username == "admin") {
            that.axios.get("http://localhost:8080/login.json")
              .then(function(res) {
                var responData = res.data.data;
                sessionStorage.setItem('token',responData[0].admin.token);
                that.$store.commit('setUsername',responData[0].admin.username)
                that.$store.commit('setMenuList',responData[0].admin.menu)
                that.$router.push({ path: "/home/forms" });
              });
                //员工
          }else if (this.formData.username == "staff") {
            that.axios.get("http://localhost:8080/login.json")
              .then(function(res) {
              var responData = res.data.data;
                sessionStorage.setItem('token',responData[1].staff.token);
                that.$store.commit('setUsername',responData[1].staff.username)
                that.$store.commit('setMenuList',responData[1].staff.menu)
                that.$router.push({ path: "/home/forms" });
              });
          }
          this.$message({
            message: "恭喜你登录成功",
            duration: 1000,
            type: "success"
          });
        } else {
          this.$message.error({
            message: "请检查账号，密码是否正确",
            duration: 1000
          });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./login.scss";
</style>>

