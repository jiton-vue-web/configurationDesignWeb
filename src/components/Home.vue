<template>
  <div>
    <el-container>
      <el-header>
        <el-row style="line-height: 68px;">
          <el-button size="mini" plain @click="leftJustify">
            <i class="iconfont icon-jurassic-left"></i>
          </el-button>
          <el-button size="mini" plain @click="rightJustify">
            <i class="iconfont icon-jurassic-right"></i>
          </el-button>
          <el-button size="mini" plain @click="bottomJustify">
            <i class="iconfont icon-jurassic-bottom"></i>
          </el-button>
          <el-button size="mini" plain @click="topJustify">
            <i class="iconfont icon-jurassic-top"></i>
          </el-button>
          <el-button size="mini" plain @click="horizalignCenter">
            <i class="iconfont icon-jurassic_horizalign-center"></i>
          </el-button>
          <el-button size="mini" plain @click="verticalalignCenter">
            <i class="iconfont icon-jurassic_verticalalign-center"></i>
          </el-button>
        </el-row>
        <el-dropdown size="medium" split-button type="primary" @command="switchLang" class="res-btn">
          选择语言
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="en">English</el-dropdown-item>
            <el-dropdown-item command="cn">简体中文</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside>
          <basic-list></basic-list>
        </el-aside>
        <el-main>
          <dra-res id="zone"></dra-res>
        </el-main>
        <el-aside>
          <editor-style></editor-style>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import DraRes from './DraRes'
  import EditorStyle from './EditorStyle'
  import BasicList from './BasicList'
  import ViewText from './ViewText'
  import ViewImage from './ViewImage'

  export default {
    components: {
      DraRes,
      EditorStyle,
      BasicList,
      ViewText,
      ViewImage
    },
    data: function () {
      return {
        lists: {},
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      switchLang (lang) {
        this.$i18n.locale = lang
        localStorage.setItem('lang', lang)
      },
      leftJustify () {
        let textX = this.$store.state.textStyles.moveX
        let imageX = this.$store.state.imageStyles.moveX
        if (textX < imageX) {
          this.$store.state.imageStyles.moveX = textX
        } else {
          this.$store.state.textStyles.moveX = imageX
        }
      },
      rightJustify () {
        let textW = this.$store.state.textStyles.width
        let imageW = this.$store.state.imageStyles.width
        let textX = this.$store.state.textStyles.moveX + textW
        let imageX = this.$store.state.imageStyles.moveX + imageW
        if (textX > imageX) {
          this.$store.state.imageStyles.moveX = textX - imageW
        } else {
          this.$store.state.textStyles.moveX = imageX - textW
        }
      },
      bottomJustify () {
        let textH = this.$store.state.textStyles.height
        let imageH = this.$store.state.imageStyles.height
        let textY = this.$store.state.textStyles.moveY + textH
        let imageY = this.$store.state.imageStyles.moveY + imageH
        if (textY > imageY) {
          this.$store.state.imageStyles.moveY = textY - imageH
        } else {
          this.$store.state.textStyles.moveY = imageY - textH
        }
      },
      topJustify () {
        let textY = this.$store.state.textStyles.moveY
        let imageY = this.$store.state.imageStyles.moveY
        if (textY < imageY) {
          this.$store.state.imageStyles.moveY = textY
        } else {
          this.$store.state.textStyles.moveY = imageY
        }
      },
      horizalignCenter () {
        let textX = this.$store.state.textStyles.moveX;
        let imageX = this.$store.state.imageStyles.moveX;
        let tH = this.$store.state.textStyles.height / 2; //text高度的一半
        let iH = this.$store.state.imageStyles.height / 2; //image 高度的一半
        let icenterY = this.$store.state.imageStyles.moveY + iH; //image 中心线
        let tcenterY = this.$store.state.textStyles.moveY + tH;//text 中心线
        if (textX < imageX) {
          this.$store.state.imageStyles.moveY = tcenterY - iH;
        } else {
          console.log("图片中心线:"+icenterY+"------文字高度的一半："+tH+"------文字Y轴结果："+(icenterY - tH));
          this.$store.state.textStyles.moveY = icenterY - tH;
          console.log(this.$store.state.textStyles.moveY);
        }
      },
      verticalalignCenter(){
        let textX = this.$store.state.textStyles.moveX;
        let imageX = this.$store.state.imageStyles.moveX;
        let tW = this.$store.state.textStyles.width / 2; //text 宽度的一半
        let iW = this.$store.state.imageStyles.width / 2; //image 宽度的一半
        let icenterX = this.$store.state.imageStyles.moveX + iW; //image 中心线
        let tcenterX = this.$store.state.textStyles.moveX + tW; //text 中心线
        if (textX < imageX) {
          this.$store.state.imageStyles.moveX = tcenterX - iW;
        } else {
          console.log("图片中心线:"+icenterX+"------文字宽度的一半："+tW+"------文字X轴结果："+(icenterX - tW));
          this.$store.state.textStyles.moveX = icenterX - tW;
          console.log(this.$store.state.textStyles.moveX);
        }
      }
    },
    computed: {},

  }
</script>


<style scoped>
  .el-header, .el-footer {
    position: relative;
    background-color: #2080d1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    width: 200px;
  }

  .el-main {
    height: 865px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .res-btn {
    position: absolute;
    top: 0;
    right: 0;
  }

  .head-font {
    margin: 10px 0;
    color: #3a8ee6;
  }

  .flex-box {
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    margin-top: 60px;
  }
</style>
