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

          <p><textarea cols="40" row="10" v-model="translationText"></textarea></p>

          <input type="button" value="번역하기" @click="translateSubmit()" />

          <div v-if="translationResult != null">
            <h3>번역 결과:</h3>

            <textarea
              cols="40"
              row="10"
              v-model="translationResult"
              disabled
            ></textarea>
            <p>
            <input type="button" value="감정평가" @click="emotionSubmit()" />
            </p>
          </div>
      

          <div v-if="emotionResult != null">
            <h3>감정 결과:</h3>

            <textarea
              cols="40"
              row="10"
              v-model="emotionResult"
              disabled
            ></textarea>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
 name: "translate",
  data() {
    return {
      translationText: null,
      supportedLanguage: null,
      selectedLanguage: "en",
      translationResult: null,
      emotionResult: null,
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
      window.axios
        .post("/api/translate/submit",params)
        .then((res) => {
          that.translationResult = res.data.translation;
        });
    },
    emotionSubmit() {
      let that = this;
      const params = {
        text: this.translationText,
        target: this.selectedLanguage,
      };
      window.axios
        .post("/api/emotion/submit",params)
        .then((res) => {
          that.emotionResult = res.data.emotion;
        });

    }
  },
};
</script>

<style scoped></style>
