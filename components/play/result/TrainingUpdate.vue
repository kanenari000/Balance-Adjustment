<template>
    <v-row>
        <v-col>
            <v-card>
                <v-card-title>訓練施設強化</v-card-title>
                <v-list>
                    <template v-for="item in statusKeys">
                        <v-list-item :key="`first-${item}`">
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{item}} : {{trainingUpdateStage[item]}}
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn
                                    fab
                                    small
                                    :disabled="isRankAble(item)"
                                    v-on:click="updateStageRank(item)"
                                >
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                        <v-divider
                            :inset="inset"
                            :key="`second-${item}`"
                        ></v-divider>
                    </template>
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
export default {
    data(){
        return{
            inset: true,
            statusKeys: ["STR", "DEX", "DEF", "INT", "PRE", "SPD"],
        }
    },
    props: {
        trainingUpdateStage: Object,
    },
    methods:{
        isRankAble: function(item){
            return this.trainingUpdateStage[item] > 3;
        },
        isValueAble: function(item){
            return this.trainingUpdateStage[item] > 3;
        },
        updateStageRank: function(item){
            // this.$emit("updateShopStage", {"key": item, "index": this.shopRateStage[item]});
        },

    }
}
</script>