<template>
  <v-row>
    <v-col cols="1">
      【{{weaponName}}】
      <v-btn
        color="primary"
        elevation="2"
        fab
        v-on:click="playDice"
      >
        <v-icon size="40">mdi-dice-multiple</v-icon>
      </v-btn>  
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
          <v-slide-item
            v-for="(targetMap, index) in mapList"
            :key="index"
            :v-slot="targetMap.isActive"
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
        </v-slide-group>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import {MapInfo} from '~/modules/mapInfo.js';
import {Status} from '~/modules/status.js';
  export default {
    data: () => ({
      model: null,
      mapList: [],
      nowPoint: 0,
      comboTime: 0,
    }),
    props: {
      weaponName: String,
      playId: String,
      childcomboId: Number,
    },
    methods:{
      makeMap: function(){
        // マスに止まった際に得られる成果のリスト
        var typeList = ['blue', 'yellow darken-1', 'red', '#8b0000', 'grey'];
        var loadJson = localStorage.getItem("type-rate-key");
        var typeRateList = JSON.parse(loadJson);
        if(typeRateList == null){
          typeRateList = [15, 15, 15, 15, 40];
        }
        var totalWeight = 0;
        this.nowPoint = 0;
        this.mapList = [];
        for(var i=0; i<typeRateList.length; i++){
          totalWeight += typeRateList[i];
        }
        this.mapList.push(new MapInfo(1, 'grey'))
        
        var loadJson = localStorage.getItem("rate-key");
        var LoadrateList = JSON.parse(loadJson);
        if(LoadrateList == null){
          LoadrateList = [0.0, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 2.0];
        }
        // ランダムでマップ生成
        for(var i=0; i<35; i++){
          var rateList = LoadrateList;
          for(var j=0; j<8; j++){
            var typeRnd = Math.round(Math.random() * totalWeight);
            var typeIndex = 0;
            // イベント区分の抽選
            for(var k=0; k<typeList.length; k++){
              if(typeRnd < typeRateList[k]){
                typeIndex = k;
                break;
              }
              typeRnd -= typeRateList[k];
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
        if(this.mapList.length == 0){
          return;
        }
        // マップを移動
        var diceResult = Math.floor(Math.random() * Math.floor(6)) + 1;
        this.mapList[this.nowPoint].isActive = false;
        this.nowPoint += diceResult;
        this.mapList[this.nowPoint].isActive = true;
        this.$emit('playDice', diceResult);

        // キャラステータスを計算
        if(this.comboId == this.pyayId){
          this.comboTime++;
        }else{
          this.comboTime = 0;
        }

        var comboValue = 1 + 0.2 * this.comboTime;
        if(comboValue > 3){
          comboValue = 3;
        }
        var storageKey = "weapon-status" + this.playId;
        var loadJson = localStorage.getItem(storageKey);
        var status = JSON.parse(loadJson);

        // 各種倍率を掛けて切り上げ
        var str = Math.ceil(status.strength * comboValue * this.mapList[this.nowPoint].rate);
        var dex = Math.ceil(status.dexterity * comboValue * this.mapList[this.nowPoint].rate);
        var def = Math.ceil(status.defense * comboValue * this.mapList[this.nowPoint].rate);
        var int = Math.ceil(status.intelligence * comboValue * this.mapList[this.nowPoint].rate);
        var spd = Math.ceil(status.speed * comboValue * this.mapList[this.nowPoint].rate);
        var addStatus = new Status(str, dex, def, int, spd);
        this.$emit('setCharaStatus', addStatus);

      }

    }
  }

</script>