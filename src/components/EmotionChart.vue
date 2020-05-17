<template>
  <div class="chart-container">
    <radar-chart :chartdata="chartdata" :options="options"></radar-chart>
  </div>
</template>

<script>
/* eslint-disable */
import { EventBus } from "../utils/event-bus";
import RadarChart from "./Chart.vue";

export default {
  name: "EmotionChart",
  components: { RadarChart },
  props: {
    translationText: {
      type: String,
      default: null,
    },
    selectedLanguage: {
      type: String,
      default: "en",
    },
  },
  data: () => ({
    loaded: false,
    chartdata: {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    },
    options: {
        title: {
            display: true,
            text: '감정 분석 결과'
        },
      scale: {
        angleLines: {
          display: false,
        },
        // ticks: {
        //   suggestedMin: 0,
        //   suggestedMax: 1,
        // },
      },
      responsive: true,
      maintainAspectRatio: false,
      legend: {
            display: false,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        }
    },
    emotionResult: null,
  }),
  created() {
    EventBus.$on("click_submit", (e) => {
    console.log('emotion')
      this.emotionSubmit();
    });
  },
  watch: {
    emotionResult(newVal, oldVal) {
      let labels = [];
      let data = [];
      const keys = Object.keys(newVal);
      for (let i = 0; i < keys.length; i++) {
        labels.push(keys[i]);
        data.push(newVal[keys[i]]);
      }
      const datasets = [{ data: data }];
      this.chartdata = {
        labels: labels,
        datasets: datasets,
      };
    },
  },
  methods: {
    emotionSubmit() {
      let that = this;
      const params = {
        text: this.translationText,
        target: this.selectedLanguage,
      };
      window.axios.post("/api/emotion/submit", params).then((res) => {
        that.emotionResult = res.data.emotion;
      });
    },
  },
};
</script>
<style scoped>
.chart-container {
  /* width:500px;
    height:500px; */
}
</style>
