<template>
  <v-row>
    <v-col cols="2">
      <v-row>
        <v-col cols="8">
          【{{weaponName}}】
          <v-select 
            v-model="selectRank"
            :items="weaponRank" 
            solo 
            label="Rank"
            background-color="black"
          />
        </v-col>
        <v-col cols="4">
          <v-btn color="indigo" v-on:click="playDice">
            量産
          </v-btn>
          <v-btn color="teal" v-on:click="playDice">
            一品
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="10">
      <v-sheet
        class="mx-auto"
      >
        <v-slide-group
          v-model="model"
          class="pa-4"
          center-active
          show-arrows
        >
          <template
            v-for="(targetMap, index) in mapList"
          >
            <v-slide-item
              :key="index"
            >
              <v-card
                :color="targetMap.eventType"
                class="ma-4"
                height="50"
                width="50"
              >
                × {{targetMap.rate}}<br>
                <v-scale-transition>
                  <v-icon
                    v-if="targetMap.isActive"
                    color="black"
                    size="20"
                    v-text="'mdi-map-marker'"
                  ></v-icon>
                </v-scale-transition>
              </v-card>
            </v-slide-item>
          </template>
        </v-slide-group>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import {MapInfo} from '~/modules/play/mapInfo.js';
import {Status} from '~/modules/config/common/status.js';
  export default {
    data: () => ({
      model: null,
      mapList: [],
      nowPoint: 0,
      comboTime: 0,
      weaponRank: [0, 1, 2, 3, 4, 5],
      selectRank: null,
    }),
    props: {
      weaponName: String,
      playId: Number,
      childcomboId: Number,
      isSearch: Boolean,
      diceNum: Number,
      configItem: Object,
    },
    methods:{
      makeMap: function(){
        // マスに止まった際に得られる成果のリスト
        var typeList = ['blue', 'yellow darken-1', 'red', '#8b0000', 'grey'];
        var totalWeight = 0;
        this.nowPoint = 0;
        this.mapList = [];

        for(var i=0; i<this.configItem.typeRateList.length; i++){
          totalWeight += this.configItem.typeRateList[i];
        }
        this.mapList.push(new MapInfo(1, 'grey'))
        
        // ランダムでマップ生成
        for(var i=0; i<35; i++){
          var rateList = this.configItem.mapRateList;
          for(var j=0; j<8; j++){
            var typeRnd = Math.round(Math.random() * totalWeight);
            var typeIndex = 0;
            // イベント区分の抽選
            for(var k=0; k<typeList.length; k++){
              if(typeRnd < this.configItem.typeRateList[k]){
                typeIndex = k;
                break;
              }
              typeRnd -= this.configItem.typeRateList[k];
            }
            // マップ成果倍率の抽選
            var rndIndex = Math.floor(Math.random() * rateList.length);
            var mapInfo = new MapInfo(rateList[rndIndex], typeList[typeIndex]);
            rateList = rateList.filter((_, index) => index!==rndIndex);
            this.mapList.push(mapInfo);
          }
        }

        this.mapList[this.nowPoint].isActive = true;
      },
      playDice: function(){
        // ダイスが0、もしくはマップの最大長を超えた場合は何もしない
        if((this.diceNum == 0) || (this.mapList.length == 0) || (this.selectRank == null)){
          return;
        }
        
        // マップを移動
        // var diceResult = Math.floor(Math.random() * Math.floor(6)) + 1;
        this.mapList[this.nowPoint].isActive = false;
        this.nowPoint += this.diceNum;
        this.mapList[this.nowPoint].isActive = true;
        this.model = this.nowPoint;

        // コンボ数を算出
        if(this.childcomboId == this.playId){
          this.comboTime++;
        }else{
          this.comboTime = 0;
        }

        // キャラステータスを計算
        let comboValue = 1;
        let status = null;
        let rndStatus = null;

        if(this.isSearch){
          comboValue += this.configItem.searchInfo.combo.rate * this.comboTime;
          if(comboValue > this.configItem.searchInfo.combo.max){
            comboValue = this.configItem.searchInfo.combo.max;
          }
          this.getMaterials(comboValue);
          status = this.configItem.searchInfo.status[this.weaponName];
          rndStatus = new Status(0, 0, 0, 0, 0, 0);
        }else{
          comboValue += this.configItem.trainingInfo.combo.rate * this.comboTime;
          if(comboValue > this.configItem.trainingInfo.combo.max){
            comboValue = this.configItem.trainingInfo.combo.max;
          }
          status = this.configItem.trainingInfo.status[this.weaponName];
          rndStatus = this.configItem.trainingInfo.statusCorrection[this.weaponName];
        }
        let charaCor = this.configItem.statusCorrection;

        // 各種ステータスを計算
        let str = this.calcStatus(
          status.strength, rndStatus.strength, comboValue, charaCor.strength);
        let dex = this.calcStatus(
          status.dexterity, rndStatus.dexterity, comboValue, charaCor.dexterity);
        let def = this.calcStatus(
          status.defense, rndStatus.defense, comboValue, charaCor.defense);
        let int = this.calcStatus(
          status.intelligence, rndStatus.intelligence, comboValue, charaCor.intelligence);
        let pre = this.calcStatus(
          status.preemption, rndStatus.preemption, comboValue, charaCor.preemption);
        let spd = this.calcStatus(
          status.speed, rndStatus.speed, comboValue, charaCor.speed);

        let addStatus = new Status(str, dex, def, int, pre, spd);
        
        // 親の関数を呼び出し
        this.$emit('setCharaStatus', addStatus);
        this.$emit('passedDays', this.playId);
      },
      // ステータスを計算して返却する（切り上げ）
      calcStatus: function(baseNum, rndNum, combo, charaCorrection){
        return Math.ceil(
          (baseNum + Math.floor(Math.random() * Math.floor(rndNum)))
          * combo
          * this.mapList[this.nowPoint].rate
          * charaCorrection)
          * this.diceNum;
      },
      getMaterials: function(comboValue){
        // 指定ランク・武器種の入手素材を取得
        let materials = this.configItem.searchInfo.materials[this.weaponName][this.selectRank].materialList;
        let metal = [];
        let wood = [];
        let leather = [];
        let mapRate = this.mapList[this.nowPoint].rate
        console.log(materials);
        for(var i=0; i< 3; i++){
          metal.push(materials["金属"][i] * this.diceNum * mapRate * comboValue);
          wood.push(materials["木材"][i] * this.diceNum * mapRate * comboValue);
          leather.push(materials["皮革"][i] * this.diceNum * mapRate * comboValue);
        }
        let addMaterials = {
          "金属": metal,
          "木材": wood,
          "皮革": leather
        };
        this.$emit('addMaterials', addMaterials);
      },

    }
  }

</script>