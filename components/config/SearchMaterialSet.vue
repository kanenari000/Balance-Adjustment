<template>
    <v-row >
        <v-col v-for="weapon in weaponNames" :key="weapon">
            <v-card>
                <v-card-title>{{weapon}}</v-card-title>
                <v-expansion-panels accordion focusable multiple>                        
                    <v-expansion-panel v-for="wRank in [0, 1, 2, 3, 4, 5]" :key="wRank">
                        <v-expansion-panel-header>武器ランク:{{wRank}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row v-for="material in materialName" :key="material">
                                <v-col>
                                    <v-row><v-col>【{{material}}】</v-col></v-row>
                                    <v-row>
                                        <v-col>
                                            <v-row><v-col>基礎値</v-col></v-row>
                                            <v-row>
                                                <v-col v-for="mRank in [0, 1, 2]" :key="mRank">
                                                    <v-text-field
                                                        v-model="cMaterials[weapon][wRank].materialList[material][mRank]"
                                                        :label="String(mRank)"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-divider vertical></v-divider>
                                        <v-col>
                                            <v-row><v-col>補正値</v-col></v-row>
                                            <v-row>
                                                <v-col  v-for="mRank in [0, 1, 2]" :key="mRank">
                                                    <v-text-field
                                                        v-model="cMaterialsCorrection[weapon][wRank].materialList[material][mRank]"
                                                        :label="String(mRank)"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <v-divider></v-divider>
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
            materialName: ["金属", "木材", "皮革"]
        }
    },
    props: {
            materials: Object,
            materialsCorrection: Object,
    },
    computed: {
        cMaterials: {
            get(){
                return this.materials;
            },
            set(value) {
                this.$emit('update:materials', value);
            }
        },
        cMaterialsCorrection: {
            get(){
                return this.materialsCorrection;
            },
            set(value) {
                this.$emit('update:materialsCorrection', value);
            }
        },
    }
}
</script>