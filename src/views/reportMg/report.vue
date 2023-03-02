<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import htmlToPdf from '../../utils/htmlToPdf.js'
import { getRecentDays, getHistory } from '../../api/api'

const daysX = ref([])
const daysSeries = ref([])
const legendData = ref([])

const todaySeries = ref([])
const todayComment= ref('老师今天没有给你留言哦')
const currentUser = ref(localStorage.getItem('username'))
const updateTime = ref('')
const getStudentDays = async () => {
  try {
    const params = {
      student_id: localStorage.getItem('userId'),
      recent_days: 30
    }
    await getRecentDays(params).then((res) => {
      const {
        data: { series, data }
      } = res
      daysSeries.value = series
      daysX.value = data
      legendData.value = daysSeries.value.map((item) => item.name)
      console.log(daysSeries, daysX)
    })
    await getHistory({ student_id: localStorage.getItem('userId')}).then((res) => {
      const { data: Data } = res
      let todayData = Data[Data.length - 1]
      let field = [
        'study_score',
        'sleep_score',
        'eat_score',
        'social_score',
        'sport_score',
        'etiquette_score'
      ]
      todaySeries.value = []
      field.forEach((el) => {
        todaySeries.value.push(todayData[el])
      })
      todayComment.value = todayData.teacher_comment
      updateTime.value = todayData.update_time
    })
  } catch (err) { }
}
const onClickDownLoad = () => {
  htmlToPdf.getPdf(`${ currentUser }在校表现统计报表`, '#report')
}

onMounted(async () => {
  await getStudentDays()
  console.log(daysSeries.value, todaySeries.value)
  //需要获取到element,所以是onMounted的Hook
  let todayStatus = echarts.init(document.getElementById('todayStatus'))
  let days30Status = echarts.init(document.getElementById('days30Status'))
  // 绘制图表
  todayStatus.setOption({
    title: { text: '今日学生在园状态👶' },
    xAxis: {
      type: 'category',
      data: legendData.value
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: todaySeries.value,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  })
  days30Status.setOption({
    title: {
      text: '近一个月内学生在园状态🧐'
    },
    tooltip: {
      trigger: 'axis',
      top: '10%'
    },
    legend: {
      data: legendData.value
    },
    grid: {
      top: '10%',
      //   left: '3%',
      //   right: '4%',
      //   bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: daysX.value
    },
    yAxis: {
      type: 'value'
    },
    series: daysSeries.value
  })

  window.onresize = function () {
    //自适应大小
    todayStatus.resize()
    days30Status.resize()
  }
})
</script>
<template>
  <div id="report" class="report">
    <h1 style="font-size: 25px;margin-top: 1%;margin-bottom: 1%;font-weight: bolder;">{{ currentUser }}在校表现统计报表📔</h1>
    <div id="todayStatus" :style="{ width: '80%', height: '500px' }"></div>
    <div id="days30Status" :style="{ width: '80%', height: '500px' }"></div>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h2 style="font-weight: bolder;">今日老师评语✍</h2>
        </div>
        <el-divider></el-divider>
        <div class="text item">
          {{ todayComment }}
        </div>
      </el-card>
    </div>
    <div class="right-conner">更新时间：{{ updateTime }}</div>
  </div>
  <el-button type="primary" @click="onClickDownLoad">下载PDF报告</el-button>
</template>
<style lang="less" scoped>
.report {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 580px;
  }
  .right-conner {
    font-size: 12px;
    color: #999;
    margin-left: 70%;
    margin-top: 2%;
    text-align: right;
  }
</style>
