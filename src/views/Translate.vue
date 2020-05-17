<template>
  <div>
    <div>
      <form
        action="#"
        accept-charset="utf-8"
        name="translation_info"
        method="get"
      >
        <fieldset>
          <h3>언어 선택:</h3>

          <select
            name="언어"
            v-model="selectedLanguage"
            style="display: inline;"
          >
            <option
              v-for="obj in supportedLanguage"
              :key="obj.id"
              :value="obj.code"
            >
              {{ obj.name }}
            </option>
          </select>
          <h3>텍스트 입력:</h3>

          <p>
            <textarea cols="40" row="10" v-model="translationText"></textarea>
          </p>

          <input type="button" value="번역하기" @click="translateSubmit()" />

          <div v-if="translationResult != null">
            <h3>번역 결과:</h3>

            <textarea
              cols="40"
              row="10"
              v-model="translationResult"
              disabled
            ></textarea>
          </div>

          <div v-if="translationResult != null">

            <emotion-chart :translationText="translationText" :selectedLanguage="selectedLanguage" ></emotion-chart>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../utils/event-bus"
/* eslint-disable */
import EmotionChart from "../components/EmotionChart";

export default {
  name: "translate",
  components: {
    EmotionChart,
  },
  data() {
    return {
      translationText: null,
      supportedLanguage: null,
      selectedLanguage: "en",
      translationResult: null,
    };
  },
  created() {
    let that = this;

    window.axios.get("/api/translate/listLanguages").then((res) => {
      that.supportedLanguage = res.data;
    });
  },
  methods: {
    translateSubmit() {
      
      let that = this;
      const params = {
        text: this.translationText,
        target: this.selectedLanguage,
      };
      window.axios.post("/api/translate/submit", params).then((res) => {
        that.translationResult = res.data.translation;
        console.log('submit')
        EventBus.$emit("click_submit","click")
      });
    },
  },
};
</script>

<style scoped></style>
