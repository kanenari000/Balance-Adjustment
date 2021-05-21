
<template>
    <v-row >
        <v-col v-for="item in weaponNames" :key="item">
            <v-card>
                <v-card-title>{{item}}</v-card-title>
                <v-expansion-panels accordion focusable multiple>
                    <v-expansion-panel v-for="wRank in [0,1,2,3,4,5]" :key="wRank">
                        <v-expansion-panel-header>武器ランク：{{wRank}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row v-for="material in materialName" :key="material">
                                <v-col v-for="mRank in [0, 1, 2]" :key="mRank">
                                    <v-text-field
                                        v-model="cWeaponsInfoList[item][wRank].recipe[material][mRank]"
                                        :label="`ランク${mRank}`"
                                    />
                                </v-col>
                            </v-row>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
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
            weaponNames: ["刀剣", "長柄", "打撃", "射撃", "魔法"],
            materialName: ["金属", "木材", "皮革"],
        }
    },
    props: {
        weaponsInfoList: Object,
    },
    computed: {
        cWeaponsInfoList: {
            get(){
                return this.weaponsInfoList;
            },
            set(value) {
                this.$emit('update:weaponsInfoList', value);
            }
        },
    }
}
</script>