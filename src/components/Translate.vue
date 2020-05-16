<template>
    <div>
        <div>
            <input :value="translateText"/>
            <select name="언어">
          
            </select>
        </div>    
    </div>    

</template>


<script>
export default {
    data() {
        return {
            translateText: null,
            supportedLanguage: null,
        }
    },
    created() {

    }


}
</script>

<style scoped>

</style>