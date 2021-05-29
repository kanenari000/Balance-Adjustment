<template>
    <v-row >
        <v-col v-for="item in shopItems" :key="item">
            <v-card>
                <v-card-title>{{item}}</v-card-title>
                <v-card-actions>
                    <v-col>
                        効果量
                        <v-form v-for="index in [0, 1, 2, 3, 4]" :key="index">
                            <v-text-field
                                v-model="cShopInfoList[item][index].value"
                                :label="`ランク${index}`"
                            />
                        </v-form>
                    </v-col>
                    <v-col>
                        価格
                        <v-form v-for="index in [0, 1, 2, 3, 4]" :key="index">
                            <v-text-field
                                v-model="cShopInfoList[item][index].price"
                                :label="`ランク${index}`"
                            />
                        </v-form>
                    </v-col>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col v-for="item in limitItems" :key="item">
            <v-card>
                <v-card-title>{{item}}</v-card-title>
                <v-card-actions>
                    <v-col>
                        効果量
                        <v-form v-for="index in [0, 1, 2, 3]" :key="index">
                            <v-text-field
                                v-model="cShopInfoList[item][index].value"
                                :label="`ランク${index+1}`"
                            />
                        </v-form>
                    </v-col>
                    <v-col>
                        価格
                        <v-form v-for="index in [0, 1, 2, 3]" :key="index">
                            <v-text-field
                                v-model="cShopInfoList[item][index].price"
                                :label="`ランク${index+1}`"
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
            shopItems: ["空調", "清掃用具", "一品物陳列棚", "置物"],
            limitItems: ["広告", "イベントスペース"],
        }
    },
    props: {
        shopInfoList: Object,
    },
    computed: {
        cShopInfoList: {
            get(){
                return this.shopInfoList;
            },
            set(value) {
                this.$emit('update:shopInfoList', value);
            }
        },
    }
}
</script>