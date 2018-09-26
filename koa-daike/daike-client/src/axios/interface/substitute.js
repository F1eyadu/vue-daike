import axios from './../api'

const getCourse = data => {//获取所有的开放课程
  return axios({
    url: '/course',
    method: 'post',
    data
  })
}

const collectCourse = data => {//收藏某门课程
  return axios({
    url: '/collect',
    method: 'post',
    data
  })
}

const substitute  = data =>{//代理某门课程
  return axios({
    url: '/substitute',
    method: 'post',
    data
  })
}


const getCourseByType = data => {
  return axios({
    url: '/course/type',
    method: 'post',
    data
  })
}


export default {
  getCourse,
  collectCourse,
  substitute,
  getCourseByType
}