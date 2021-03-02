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
        <el-button type="primary" @click="loginIn('ruleForm')">登<span style="width:50px;display:inline-block"></span>录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      formData: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginIn (formName) {
      this.$refs[formName].validate((valid) => {
        //验证通过
        if (valid) {
          this.$router.push({ path: "/home" });
          this.$message({
            message: '恭喜你登录成功',
            duration: 1000,
            type: 'success'
          });
        } else {
          this.$message.error({
            message: '请检查账号，密码是否正确',
            duration: 1000

          })
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./login.scss";
</style>>

