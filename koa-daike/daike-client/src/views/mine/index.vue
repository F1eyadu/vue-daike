<template>
    <div class="container">
        <van-popup class="edit-popup" v-model="isShowEdit" position = 'right' :overlay="false">
            <edit-info @toggleEditPopup="onToggleEditPopup"></edit-info>
        </van-popup>

        <van-row type="flex" align="center">
            <van-col span="4">
                <img class="header-img" :src="user.headerImg || defaultHeader"/>
            </van-col>
            <van-col span="10" offset="2" class="username" v-text="user.username"></van-col>
            <van-col span="8" offset="2">
                <van-button class="btn-edit" size="mini" @click="onToggleEditPopup(true)">编辑个人资料</van-button>
            </van-col>
        </van-row>

        <van-row class="row" type="flex" align="center">
            <van-col span="4">学号:</van-col>
            <van-col span="18" offset="2" v-text="user.studentId"></van-col>
        </van-row>

        <van-row class="row" type="flex" align="center">
            <van-col span="4">学校:</van-col>
            <van-col span="18" offset="2" v-text="user.school"></van-col>
        </van-row>

        <van-row class="row" type="flex" align="center">
            <van-col span="4">学院:</van-col>
            <van-col span="18" offset="2" v-text="user.college"></van-col>
        </van-row>

        <van-row class="row" type="flex" align="center">
            <van-col span="4">专业:</van-col>
            <van-col span="18" offset="2" v-text="user.major"></van-col>
        </van-row>

        <van-row class="row" type="flex" align="center">
            <van-col span="4">电话:</van-col>
            <van-col span="18" offset="2">{{user.phone | mixAsterisk}}</van-col>
        </van-row>

        <van-row class="row" type="flex" align="center">
            <van-col span="4">email:</van-col>
            <van-col span="18" offset="2" v-text="user.email"></van-col>
        </van-row>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import defaultHeader from '@/assets/default_header.png'
import editInfo from './components/editInfo'
export default {
    data(){
        return{
            defaultHeader,
            isShowEdit: false
        }
    },
    components: {
        editInfo
    },
    computed: {
        ...mapState({
            user: state => state.mine.user
        })
    },
    methods:{
        onToggleEditPopup(boolean) {
            this.isShowEdit = boolean
        }
    },
    filters:{
        mixAsterisk(phone) {
            if(!phone) {
                return ''
            }else{
                const arr = phone.split('')
                arr.splice(3,4,'****')
                return arr.join('')
            }
        }
    }
}
</script>
<style scoped>
.container /deep/ .van-col--4  {
    text-align: right;
}
.container /deep/ .van-col--18  {
    text-align: right;
}
.edit-popup{
    width: 100%;
    height: 100%;
}

.header-img{
    width: 100%;
    border-radius: 50%
}
.username{
    font-size: 26px;
}
.row{
    margin: 10px 0;
}
.btn-edit{
    width: 100px;
}
</style>
