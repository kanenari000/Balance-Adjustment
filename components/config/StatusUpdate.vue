<template>
    <v-row >
        <v-col v-for="item in statusKeys" :key="item">
            <v-card>
                <v-card-title>{{item}}</v-card-title>
                <v-card-actions>
                    <v-col>
                        効果量
                        <v-form v-for="index in [0, 1, 2, 3, 4]" :key="index">
                            <v-text-field
                                v-model="cTrainingUpdate[item][index].value"
                                :label="`ランク${index}`"
                            />
                        </v-form>
                    </v-col>
                    <v-col>
                        価格
                        <v-form v-for="index in [0, 1, 2, 3, 4]" :key="index">
                            <v-text-field
                                v-model="cTrainingUpdate[item][index].price"
                                :label="`ランク${index}`"
                            />
                        </v-form>
                    </v-col>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    components: {
    },
    data(){
        return{
            statusKeys: ["STR", "DEX", "DEF", "INT", "PRE", "SPD"],
        }
    },
    props: {
        trainingUpdate: Object,
    },
    computed: {
        cTrainingUpdate: {
            get(){
                return this.trainingUpdate;
            },
            set(value) {
                this.$emit('update:trainingUpdate', value);
            }
        },
    }
}
</script>