<template>
    <v-row>
        <v-col>
            <v-card>
                <v-card-title>確率強化</v-card-title>
                <v-list>
                    <template v-for="item in rateNames">
                        <v-list-item :key="`first-${item}`">
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{item}} : {{shopRateStage[item]}}
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn
                                    fab
                                    small
                                    :disabled="isRankAble(item)"
                                    v-on:click="updateRateRank(item)"
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
        <v-col>
            <v-card>
                <v-card-title>価格強化</v-card-title>
                <v-list>
                    <template v-for="item in valueNames">
                        <v-list-item :key="`first-${item}`">
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{item}} : {{shopValueStage[item]}}
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn
                                    fab
                                    small
                                    :disabled="isValueAble(item)"
                                    v-on:click="updateValueRank(item)"
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
        <v-col>
            <v-card>
                <v-card-title>期間限定強化</v-card-title>
                <v-list>
                    <template v-for="item in limitName">
                        <v-list-item :key="`first-${item}`">
                            <v-col>
                                <v-row>
                                    <v-col>
                                        {{item}}
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col v-for="(stage, index) in shopLimitStage[item]" :key="index" >
                                        <v-checkbox
                                            :input-value="stage"
                                            :label="String(index+1)"
                                            @change="updateLimitRank(item, index)"
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-list-item>
                        <v-divider
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
            rateNames: ["空調", "清掃用具"],
            valueNames: ["一品物陳列棚", "置物"],
            limitName: ["広告", "イベントスペース"],
        }
    },
    props: {
        shopRateStage: Object,
        shopValueStage: Object,
        shopLimitStage: Object,
    },
    methods:{
        isRankAble: function(item){
            return this.shopRateStage[item] > 3;
        },
        isValueAble: function(item){
            return this.shopValueStage[item] > 3;
        },
        updateRateRank: function(item){
            this.$emit("updateShopStage", {"key": item, "index": this.shopRateStage[item]});
        },
        updateValueRank: function(item){
            this.$emit("updateShopStage", {"key": item, "index": this.shopValueStage[item]});
        },
        updateLimitRank: function(item, index){
            this.$emit("updateShopStage", {"key": item, "index": index});
        },

    }
}
</script>