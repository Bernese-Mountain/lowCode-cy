<template>
    <div class="layout">
    <el-container>

      <el-header height="60px">
        <slot name="header"></slot>
      </el-header>

      <el-container>

        <el-aside width="300px">
            <slot name="aside"></slot>
        </el-aside>

        <el-container>

          <el-main style="display:flex;">
            <div class="main">
                <slot name="canvas"></slot>
            </div>
            <div class="right">
                <slot name="config"></slot>
            </div>
          </el-main>

        </el-container>
      </el-container>
    </el-container>
  </div>
 </template>
   
<script setup lang="ts">
   
</script>
   
 <style lang="scss" scoped>
 .layout{
    height: 100%;
 }
 .el-container{
    height: 100%;
    .el-header{
    width:100%;
    background-color:#F0F8FF;
}
    .el-aside{
        height:100%;
        background-color:#F5F5DC;
    }
    .el-main{
        background-color:#FFF8DC;
        padding:0;
    }
    .el-footer{
        background-color:#F0FFF0;
    }
    .main{
        width: 100%;
        height: 100%;
    }
    .right{
        height: 100%;
        width: 400px;
        background-color:#E0FFFF;
    }
}
</style>
   