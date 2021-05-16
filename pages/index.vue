<template>
  <v-row>
    <v-col cols="3" class="text-center">
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="text-center justify-center py-6">
              <h1>現在 {{nowDay}} 日目</h1>
            </v-card-title>
            <v-card-text>
              終了まであと{{daysLeft}}日
            </v-card-text>
            <v-btn
              depressed
              color="primary"
              v-on:click="makeMaps"
            >
              マップ生成
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="text-center justify-center py-6">
              所持金
            </v-card-title>
            <v-card-text>
              {{myMoney}}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="text-center justify-center py-6">
              サイコロ: {{diceResult}}
            </v-card-title>
              <v-btn
                color="primary"
                elevation="2"
                fab
                v-on:click="playDice"
                :disabled="!isNextTurn"
              >
                <v-icon size="40">mdi-dice-multiple</v-icon>
              </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <!-- 実行結果を表示するタブ -->
    <result-tabs
      :status="charaStatus"
      :resultItems="resultItems"
      :configInfo="configInfo"
      @updateShop="updateShop"
    />
    <!-- 各武器種に対応するマス目 -->
    <v-col cols="12">
      <v-tabs
        fixed-tabs
        background-color="blue-grey darken-4"
        dark
        v-model="tab"
      >
        <v-tab>
          訓練
        </v-tab>
        <v-tab>
          探索
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item eager>
          <template v-for="(weaponName, index) in weaponNames">
            <play-map 
              :key="index"
              :ref="'PlayMap'+index"
              @passedDays="passedDays"
              @setCharaStatus="setCharaStatus"
              @setResult="setResult"
              :weaponName="weaponName"
              :childcomboId="comboId"
              :isSearch=false
              :diceNum="diceResult"
              :configItem="configInfo"
              :playId="index"
              :resultItems="resultItems"
            />
          </template>
        </v-tab-item>
        <v-tab-item eager>
          <template v-for="(weaponName, index) in weaponNames">
            <play-map 
              :key="index"
              :ref="'PlayMap' + (index + 5)" 
              @passedDays="passedDays"
              @setCharaStatus="setCharaStatus"
              @setResult="setResult"
              :weaponName="weaponName"
              :childcomboId="comboId"
              :isSearch=true
              :diceNum="diceResult"
              :configItem="configInfo"
              :playId="index+5"
              :resultItems="resultItems"
            />
          </template>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
    <v-overlay :value="isLoad">
        <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-row>

</template>

<script>
import PlayMap from '../components/play/PlayMap.vue';
import ResultTabs from '../components/play/ResultTabs.vue';
import {Status} from '~/modules/config/common/status.js';
import {ConfigItems} from '~/modules/config/common/configItems.js';
import {ResultSet} from '~/modules/play/resultSet.js';
export default {
  components: {
    PlayMap,
    ResultTabs,
  },
  data(){
    return{
      nowDay: 0,
      daysLeft: 280,
      charaStatus: new Status(1, 1, 1, 1, 1, 1),
      comboId: 100,
      tab: null,
      myMoney: 10000000,
      isLoad: false,
      configInfo: new ConfigItems(),
      diceResult: 0,
      isNextTurn: false,
      weaponNames: ["刀剣", "長柄", "打撃", "射撃", "魔法"],
      resultItems: new ResultSet(),
    }
  },
  props: {
    childcomboId: Number,
  },
  methods:{
    passedDays: function(playId){
      this.comboId = playId;
      this.nowDay += this.diceResult;
      this.daysLeft -= this.diceResult;
      this.diceResult = 0;
      this.isNextTurn = true;
    },
    playDice: function(){
      this.diceResult = Math.floor(Math.random() * Math.floor(6)) + 1;
      // 残り日数がマイナスにならないように調整
      if(this.daysLeft-this.diceResult < 0){
        this.diceResult = this.daysLeft;
      }
      this.isNextTurn = false;
    },
    makeMaps: function(){
      // マップ生成が重ためなのでインジケーターを表示
      this.isLoad = !this.isLoad;
      this.isNextTurn = true;
      setTimeout(() => {
        this.startNewGame();
        setTimeout(()=> {this.isLoad = false}, 1)}, 100);
    },
    startNewGame: function(){
      // 訓練
      this.$refs.PlayMap0[0].makeMap();
      this.$refs.PlayMap1[0].makeMap();
      this.$refs.PlayMap2[0].makeMap();
      this.$refs.PlayMap3[0].makeMap();
      this.$refs.PlayMap4[0].makeMap();
      // 探索
      this.$refs.PlayMap5[0].makeMap();
      this.$refs.PlayMap6[0].makeMap();
      this.$refs.PlayMap7[0].makeMap();
      this.$refs.PlayMap8[0].makeMap();
      this.$refs.PlayMap9[0].makeMap();

      this.nowDay = 0;
      this.daysLeft = 280;
      this.myMoney = 0;
      this.resultItems.resetResultSet();
      this.charaStatus.resetCharaStatus();
    },
    setCharaStatus: function(charaStatus){
      this.charaStatus.addCharaStatus(
        charaStatus.strength,
        charaStatus.dexterity,
        charaStatus.defense,
        charaStatus.intelligence,
        charaStatus.preemption,
        charaStatus.speed,
      )
    },
    setResult: function(result){
      // 店の清算を実行
      this.excuteShop();

      // 実行結果を反映
      let weapons = ["刀剣", "長柄", "打撃", "射撃", "魔法"];
      let materials = ["金属", "木材", "皮革"];
      let mapType = ["青", "黄", "赤", "濃赤", "無色"];
      console.log(result);
      
      for(var i=0; i < 5; i++){
          for(var j=0; j<6; j++){
            this.$set(this.resultItems.weaponSet[weapons[i]], j, result.weaponSet[weapons[i]][j]);
            this.$set(this.resultItems.weaponProgress[weapons[i]], j, result.weaponProgress[weapons[i]][j]);
          }
          this.$set(this.resultItems.trainingSelect, weapons[i], result.trainingSelect[weapons[i]]);
          this.$set(this.resultItems.searchSelect, weapons[i], result.searchSelect[weapons[i]]);
          this.$set(this.resultItems.mapTypeSelect, mapType[i], result.mapTypeSelect[mapType[i]])
      }
      for(var i=0; i<3; i++){
          for(var j=0; j<3; j++){
              this.$set(this.resultItems.materialSet[materials[i]], j, result.materialSet[materials[i]][j]);
          }
      }

    },
    excuteShop: function(){
      // todo: ショップ期間限定強化の清算をする
      let shopInfo = this.configInfo.shopInfoList;
      let weaponInfo = this.configInfo.weaponsInfoList;
      let shopRateStage = this.resultItems.shopRateStage;
      let shopValueStage = this.resultItems.shopValueStage;
      let shopWeapon = this.resultItems.shopWeaponSet;
      let weapons = ["刀剣", "長柄", "打撃", "射撃", "魔法"];
      let shopRate = 1 + shopInfo["空調"][shopRateStage["空調"]].value + shopInfo["清掃用具"][shopRateStage["清掃用具"]].value;
      let shopValue = 1 + shopInfo["一品物陳列棚"][shopValueStage["一品物陳列棚"]].value + shopInfo["置物"][shopValueStage["置物"]].value;
      let shopLimitRate = 1;
      let shopLimitValue = 1;
      // 期間強化を計算
      for(var i=0; i<4; i++){
        if(this.resultItems.shopLimitStage["広告"][i]){
          if(this.myMoney - this.configInfo.shopInfoList["広告"][i].price >= 0){
            this.myMoney -= this.configInfo.shopInfoList["広告"][i].price;
            shopLimitRate += shopInfo["広告"][i].value;
          }else{
            this.resultItems.shopLimitStage["広告"][i] = false;
          }
        }
        if(this.resultItems.shopLimitStage["イベントスペース"][i]){
          if(this.myMoney - this.configInfo.shopInfoList["イベントスペース"][i].price >= 0){
            this.myMoney -= this.configInfo.shopInfoList["イベントスペース"][i].price;
            shopLimitRate += shopInfo["イベントスペース"][i].value;
          }else{
            this.resultItems.shopLimitStage["イベントスペース"][i] = false;
          }
        }
        
      }

      for(var i=0; i<5; i++){
        for(var j=0; j<6; j++){
          let targetRate = weaponInfo[weapons[i]][j].rate * shopRate * shopLimitRate;
          let targetValue = Math.floor(weaponInfo[weapons[i]][j].value * shopValue * shopLimitValue);
          for(var k=0; k<shopWeapon[weapons[i]][j]; k++){
            if(this.judgeShop(targetRate)){
              // 売れた場合の処理を実行
              this.resultItems.shopWeaponSet[weapons[i]][j]--;
              this.resultItems.weaponSet[weapons[i]][j]--;
              this.myMoney += targetValue;
            }
          }
        }
      }

    },
    judgeShop: function(targetRate){
      console.log(this.diceResult);
      // 売れたかどうかを判定する
      for(var i=0; i<this.diceResult; i++){
        let randNum = Math.random();
        if(randNum < targetRate){
          return true;
        }
      }
      setTimeout(()=>{
        return false;
      },1);
    },
    updateShop: function(item){
      // 強化資金が足りているか判定
      if(this.myMoney - this.configInfo.shopInfoList[item.key][item.index].price >= 0){
        if((item.key == "空調") || (item.key == "清掃用具")){
          this.resultItems.shopRateStage[item.key]++;
          this.myMoney -= this.configInfo.shopInfoList[item.key][item.index].price;
        }else if((item.key == "一品物陳列棚") || (item.key == "置物")){
          this.resultItems.shopValueStage[item.key]++;
          this.myMoney -= this.configInfo.shopInfoList[item.key][item.index].price;
        }else{
          // 期間限定のショップ強化はターン進行時に清算するためここではお金は減らないようにする
          // 現在の状態を反転
          this.resultItems.shopLimitStage[item.key][item.index] = !this.resultItems.shopLimitStage[item.key][item.index];
        }
      }
    },

  },
  mounted(){
    // ローカルストレージから設定情報を読み取る
    // ローカルストレージにない場合はデフォルトの設定として新規インスタンスを生成
    this.configInfo = JSON.parse(localStorage.getItem("config-info"));
    if (this.configInfo == null){
        this.configInfo = new ConfigItems();
    }

  },

}
</script>
