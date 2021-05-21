<template>
    <v-form>
        <v-text-field v-model="cStatus.strength" label="STR" />
        <v-text-field v-model="cStatus.dexterity" label="DEX" />
        <v-text-field v-model="cStatus.defense" label="DEF" />
        <v-text-field v-model="cStatus.intelligence" label="INT" />
        <v-text-field v-model="cStatus.preemption" label="PRE" />
        <v-text-field v-model="cStatus.speed" label="SPD" />
    </v-form>
</template>
<script>
export default {

    components: {
    },
    data(){
        return{
        }
    },
    props: {
        status: Object,
    },
    computed: {
        cStatus: {
            get(){
                return this.status;
            },
            set(value) {
                this.$emit('update:status', value);
            }
        },

    }
}
</script>
