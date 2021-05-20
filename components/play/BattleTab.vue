<template>
    <v-row>
        <v-col>
            <v-row>
                <v-col cols="2" class="text-center" >
                    <h2>製造武器種</h2>
                </v-col>
                <v-col cols="4">
                    <v-radio-group
                        v-model="weaponRadio"
                        mandatory
                        row
                    >
                        <v-radio v-for="weapon in weaponNames" :key="weapon"
                            :label="weapon"
                            :value="weapon"
                        />
                    </v-radio-group>
                </v-col>
                <v-col cols="2" class="text-center">
                    <h2>製造ランク</h2>
                </v-col>
                <v-col cols="4">
                    <v-radio-group
                        v-model="rankRadio"
                        mandatory
                        row
                    >
                        <v-radio v-for="rank in selectRank" :key="rank"
                            :label="String(rank)"
                            :value="rank"
                        />
                    </v-radio-group>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols=2>
                    <v-btn color="indigo" :disabled="isMassProduct()" @click="playTurn(true)">
                        量産
                    </v-btn>
                </v-col>
                <v-col cols=2>
                    <v-btn color="teal" :disabled="isOne()" @click="playTurn(false)">
                        一品
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import {ResultSet} from '~/modules/play/resultSet.js'
export default {
    data(){
        return{
            weaponRadio: "刀剣",
            rankRadio: 0,
            weaponNames: ["刀剣", "長柄", "打撃", "射撃", "魔法"],
            selectRank: [0, 1, 2, 3, 4, 5],
        }
    },
    props: {
        isBattle: Boolean,
        diceNum: Number,
        configItem: Object,
        resultItems: ResultSet,
    },
    methods:{
        isOne: function(){
            if(this.isMassProduct()){
                return true;
            }
            // 一品物製造ゲージが0の場合は素材が足りているか判定
            if(this.resultItems.weaponProgress[this.weaponRadio][this.rankRadio] == 0){
                let materialsName = ["金属", "木材", "皮革"];
                let recipe = this.configItem.weaponsInfoList[this.weaponRadio][this.rankRadio].recipe;
                let tmpVal = this.resultItems.materialSet;
                for(var j = 0; j < 3; j++){
                    for(var k = 0; k < 3; k++){              
                        if ((tmpVal[materialsName[k]][j] - (recipe[materialsName[k]][j] * 5)) < 0){
                            // 素材が足りないため素材生産をキャンセル
                            return true;
                        }
                    }
                }
                return false;
            }else{
                return false;
            }
        },
        playTurn: function(isProduct){
            // isOne=true -> 量産/ false->一品
            // 武器を生産
            this.makeWeapons(isProduct);
            setTimeout(() => {
                // 親の関数を呼び出し（コンボをリセット）
                this.$emit('setResult', this.resultItems);
                this.$emit('passedDays', 100);
            }, 10);
        },
        makeWeapons: function(makeFlag){
            let madeWeponNum = 0;
            let isMake = false;

            // makeFlag =true: 量産, =false: 一品物 の生産をする
            if(makeFlag){
                // サイコロの目の数だけ素材数を評価して武器を生産する
                for(var i = 0; i < this.diceNum; i++){
                    isMake = this.subMaterials(makeFlag);
                    if(!isMake){
                        break; 
                    }
                    madeWeponNum++;
                }
            }else{
                if(this.resultItems.weaponProgress[this.weaponRadio][this.rankRadio] == 0){
                    this.subMaterials(makeFlag);
                }
                this.resultItems.weaponProgress[this.weaponRadio][this.rankRadio] += this.diceNum;
                // 一品物製造ゲージが貯まったか判定
                if(this.resultItems.weaponProgress[this.weaponRadio][this.rankRadio]
                    >= this.configItem.weaponProgress){
                        this.resultItems.weaponProgress[this.weaponRadio][this.rankRadio] = 0;
                        madeWeponNum++;
                }
            }
            setTimeout(() => {
                // 武器が製造されたら武器を所持数に加算
                this.resultItems.weaponSet[this.weaponRadio][this.rankRadio] += madeWeponNum;
            },1);
        },
        subMaterials: function(makeFlag){
            // 対応する武器種のレシピと現在所持している素材を取得
            let materialsName = ["金属", "木材", "皮革"];
            let recipe = this.configItem.weaponsInfoList[this.weaponRadio][this.rankRadio].recipe;
            let makeRate = makeFlag ? 1: 5;

            for(var j = 0; j < 3; j++){
                for(var k = 0; k < 3; k++){
                    this.resultItems.materialSet[materialsName[k]][j] -= recipe[materialsName[k]][j] * makeRate;
                    if (this.resultItems.materialSet[materialsName[k]][j] < 0){
                        // 素材が足りないため素材生産をキャンセル
                        this.resultItems.materialSet[materialsName[k]][j] += recipe[materialsName[k]][j] * makeRate;
                        return false;
                    }
                }
            }
            return true;
        },
        isMassProduct: function(){
            return !this.isBattle || (this.diceNum == 0);
        }
    }

}
</script>