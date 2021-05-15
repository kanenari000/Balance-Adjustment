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
                                <v-btn fab small><v-icon>mdi-plus</v-icon></v-btn>
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
                                <v-btn fab small><v-icon>mdi-plus</v-icon></v-btn>
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
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{item}}
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-switch v-for="(stage, index) in shopLimitStage[item]" :key=index
                                    :v-model="stage"
                                    inset
                                    :label="String(index+1)"
                                ></v-switch>
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

    }
}
</script>