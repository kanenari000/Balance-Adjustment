<template>
    <v-card>
        <v-card-title>バトル設定</v-card-title>
        <v-card-text>
            <v-container>
                <v-form ref="editForm">
                    <v-row>
                        <v-col cols="2">
                            <v-text-field
                                v-model="editConfig.ch"
                                :rules="[rules.numberInput]"
                                label="クリティカル補正固定値"
                            />
                        </v-col>
                        <v-col cols="2">
                            <v-text-field
                                v-model="editConfig.attack"
                                :rules="[rules.numberInput]"
                                label="通常攻撃ダメージ基礎値"
                            />
                        </v-col>
                        <v-col cols="2">
                            <v-text-field
                                v-model="editConfig.mysteryRand"
                                :rules="[rules.numberInput]"
                                label="奥義ダメージ乱数"
                            />
                        </v-col>
                        <v-col cols="2">
                            <v-text-field
                                v-model="editConfig.attackRand"
                                :rules="[rules.numberInput]"
                                label="通常攻撃ダメージ乱数"
                            />
                        </v-col>
                        <v-col cols="2" v-for="(i, index) in [2, 3]" :key=i>
                            <v-text-field
                                v-model="editConfig.comboRate[index]"
                                :rules="[rules.numberInput]"
                                :label="'打撃武器連撃発生率: ' + String(i) +'Hit'"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col v-for="weapon in weaponKeys" :key="weapon" cols="2">
                            <v-text-field
                                v-model="editConfig.mystery[weapon]"
                                :rules="[rules.numberInput]"
                                :label="'奥義ダメージ補正固定値: '+String(weapon)"
                            />
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="save" color="primary">SAVE</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    components: {
    },
    data(){
        return{
            editConfig: null,
            weaponKeys: ["刀剣", "長柄", "打撃", "射撃", "魔法"],
            rules: {
                numberInput: value => isFinite(value) || '数値を入力してください',
            },
        }
    },
    props: {
        battleConf: Object
    },
    created () {
        // 初期値をセット
        this.editConfig = this.battleConf;
    },
    methods:{
        save: function(){
            // validate を実行
            if(this.$refs.editForm.validate()) {
                this.$emit("editBaseConfig", this.editConfig);
            }
        }

    },
    mounted(){

    },
}
</script>
<style>

</style>