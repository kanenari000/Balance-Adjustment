<template>
    <v-card>
        <v-card-title>{{itemName}} </v-card-title>
        <v-list>
            <template v-for="(item, index) in rankPossessions">
                <v-list-item :key="`first-${index}`">
                    <v-list-item-action>
                        <v-icon>mdi-numeric-{{index}}-box-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Rank{{index}} : {{item}}
                        </v-list-item-title>
                        <v-row>
                            <v-col>
                                <v-btn
                                    fab
                                    small
                                    v-on:click="setWeapons(index, -1)"
                                    :disabled="isMinus(index)"
                                >
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn
                                    fab
                                    small
                                    v-on:click="setWeapons(index, 1)"
                                    :disabled="isPlus(index)"
                                >
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-list-item-content>
                </v-list-item>
                <v-divider
                    :inset="inset"
                    :key="`second-${index}`"
                ></v-divider>
            </template>
        </v-list>
    </v-card>
</template>
<script>
export default {
    data(){
        return{
            inset: true,
        }
    },
    props: {
        itemName: String,
        rankPossessions: Array,
        hasWeaponsNum: Array,
    },
    methods:{
        setWeapons: function(rank, setNum){
            console.log(this.hasWeaponsNum[rank] >= this.rankPossessions[rank])
            // 親に情報を送信
            this.$emit(
                'setWeapons',
                {
                    'weapon': this.itemName,
                    'rank': rank,
                    'setNum': setNum
                }
            );
        },
        isMinus: function(index){
            return this.rankPossessions[index] == 0;
        },
        isPlus: function(index){
            return this.hasWeaponsNum[index] <= this.rankPossessions[index];
        },
    },

}
</script>