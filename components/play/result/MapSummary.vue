<template>
    <v-row>
        <v-col>
            <v-card>
                <v-card-title>訓練選択結果</v-card-title>
                <v-list>
                    <template v-for="item in weaponNames">
                        <v-list-item :key=item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{item}} : {{trainingSelect[item]}}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider
                            :inset="inset"
                            :key=item
                        ></v-divider>
                    </template>
                </v-list>
            </v-card>
        </v-col>
        <v-col>
            <v-card>
                <v-card-title>探索選択結果</v-card-title>
                <v-list>
                    <template v-for="item in weaponNames">
                        <v-list-item :key=item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{item}} : {{searchSelect[item]}}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider
                            :inset="inset"
                            :key=item
                        ></v-divider>
                    </template>
                </v-list>
            </v-card>
        </v-col>
        <v-col>
            <v-card>
                <v-card-title>マス選択結果</v-card-title>
                <v-list>
                    <template v-for="item in mapTypeList">
                        <v-list-item :key=item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{item}} : {{mapTypeSelect[item]}}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider
                            :inset="inset"
                            :key=item
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
            mapTypeList: ["無色", "青", "黄", "赤", "濃赤"],
            weaponNames: ["刀剣", "長柄", "魔法", "射撃", "格闘"],
        }
    },
    props: {
        mapTypeSelect: Object,
        trainingSelect: Object,
        searchSelect: Object,
    },
    methods:{

    }
}
</script>