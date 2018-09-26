<template>
    <div class="container">
        <!-- 课程列表 -->
        <van-card v-for="(course, index) in courses" :key="index" :thumb="course.publisherHeader">
            <div class="title" slot="title">
                课程名称: {{course.courseName}}<br/>
            </div>
            <div class="desc" slot="desc">
                上课时间：{{course.courseTime}} <br/> 上课地点: {{course.coursePlace}} - {{course.courseClass}} <br/> 赏金: ￥ {{course.reward ? course.reward : 0}}<br/>
            </div>
            <div slot="footer">
                <van-button size="mini" @click="toggleCourseDetail(course)">详情</van-button>
                <van-button size="mini" @click="onSubstituteClicked(course)" type='primary' plain>代课</van-button>
            </div>
        </van-card>

        <!-- 课程详情 -->

        <van-sku v-model="isShowCourse" :sku="course" :goods="courseTitle" close-on-click-overlay>
            <template slot="sku-header-price">
                <div class="van-sku-goods-price">
                    <span>赏金:</span>
                    <span class="van-sku__price-symbol">￥</span>
                    <span class="van-sku__price-num">{{course.reward || 0}}</span>
                </div>
            </template>
            <template slot="sku-group">
                <van-row class="row" type="flex" align="center">
                    <van-col span="5" offset="1">
                        学校:
                    </van-col>
                    <van-col span="10" v-text="course.school"></van-col>
                </van-row>

                <van-row class="row" v-show="course.hasName" type="flex" align="center">
                    <van-col span="5" offset="1">
                        姓名:
                    </van-col>
                    <van-col span="10" v-text="course.publisherName"></van-col>
                </van-row>

                <van-row class="row" v-show="course.hasStuId" type="flex" align="center">
                    <van-col span="5" offset="1">
                        学号:
                    </van-col>
                    <van-col span="10" v-text="course.studentId"></van-col>
                </van-row>

                <van-row class="row" v-show="course.hasPhone" type="flex" align="center">
                    <van-col span="5" offset="1">
                        电话:
                    </van-col>
                    <van-col span="10" v-text="course.phone"></van-col>
                </van-row>

                <van-row class="row"  type="flex" align="center">
                    <van-col span="5" offset="1">
                        开课时间:
                    </van-col>
                    <van-col span="10" v-text="course.courseTime"></van-col>
                </van-row>

                <van-row class="row"  type="flex" align="center">
                    <van-col span="5" offset="1">
                        上课讲次:
                    </van-col>
                    <van-col span="10" v-text="course.courseClass"></van-col>
                </van-row>

                <van-row class="row"  type="flex" align="center">
                    <van-col span="5" offset="1">
                        上课地点:
                    </van-col>
                    <van-col span="10" v-text="course.coursePlace"></van-col>
                </van-row>
            </template>

            <template slot="sku-stepper">
                <van-row type="flex">
                    <van-col span="5" offset="1">留言:</van-col>
                    <van-col span="17" v-text="course.remark"></van-col>
                </van-row>
            </template>

            <template slot="sku-actions" slot-scope="props">
                <div class="van-sku-actions">
                    <van-button bottom-action @click="onCollectionClicked">收藏课程</van-button>
                    <van-button type="primary" bottom-action @click="onSubstitutedClicked(course)">立即代课</van-button>
                </div>
            </template>
        </van-sku>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      courses: [],
      course: {},
      isShowCourse: false
    }
  },
  created() {
    this.$http.getCourse({ status: "open" }).then(res => {
      this.courses = res.msg
      console.log(this.courses)
    })
  },
  computed:{
        ...mapState({
            user: state => state.mine.user
        }),
      courseTitle() {
          return {
              title: this.course.title,
              picture: this.course.publisherHeader
          }
      }
  },
  methods:{
      toggleCourseDetail(course){
        this.isShowCourse = true
        this.course = course
        this.course.tree = [
            {
                v: [
                    {}, {}
                ]
            }
        ]
      },
      onSubstituteClicked(course){
          if(this.user.userId === course.publisher){
              this.$toast('不能代自己发布的课程!')
              return
          }
          this.$http.substitute({
              userId: this.user.userId,
              userName: this.user.userName,
              course
          }).then(res => {
              this.$toast('代课成功')
              this.isShowCourse = false
              this.course = {}
          }).catch(err => {})
      },
      onCollectionClicked(){//收藏
          this.$http.collectCourse({
              userId: this.user.userId,
              courseId: this.course.id
          }).then(res => {
              this.$toast(res.msg)
              this.isShowCourse = false
          })
      }
  }
}
</script>
<style scoped>
.title {
  font-size: 14px;
  text-align: left;
}
.desc {
  font-size: 12px;
  text-align: left;
}
.row {
  margin: 10px 0 10px;
}
.container /deep/ .van-sku__goods-name {
  font-size: 16px;
}
</style>

