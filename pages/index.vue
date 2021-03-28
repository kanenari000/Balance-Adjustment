<template>
  <v-row>
    <v-col cols="3" class="text-center">
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
    <v-col cols="9">
      <v-card>
        <v-card-title>
          Result
        </v-card-title>
        <v-col>
          <status-result :status="charaStatus" />
        </v-col>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-tabs
        fixed-tabs
        background-color="blue-grey darken-4"
        dark
        v-model="tab"
      >
        <v-tab>
          探索
        </v-tab>
        <v-tab>
          訓練
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <play-map ref="PlayMap1" @playDice="playDice" @setCharaStatus="setCharaStatus" weaponName="刀剣" playId=1 :childcomboId="comboId" />
          <play-map ref="PlayMap2" @playDice="playDice" @setCharaStatus="setCharaStatus" weaponName="長柄" playId=2 :childcomboId="comboId" />
          <play-map ref="PlayMap3" @playDice="playDice" @setCharaStatus="setCharaStatus" weaponName="打撃" playId=3 :childcomboId="comboId" />
          <play-map ref="PlayMap4" @playDice="playDice" @setCharaStatus="setCharaStatus" weaponName="射撃" playId=4 :childcomboId="comboId" />
          <play-map ref="PlayMap5" @playDice="playDice" @setCharaStatus="setCharaStatus" weaponName="格闘" playId=5 :childcomboId="comboId" />
        </v-tab-item>
        <v-tab-item>
          <play-map ref="PlayMap6" @playDice="playDice" @setCharaStatus="setCharaStatus" weaponName="刀剣" playId=6 :childcomboId="comboId" />
          <play-map ref="PlayMap7" @playDice="playDice" @setCharaStatus="setCharaStatus" weaponName="長柄" playId=7 :childcomboId="comboId" />
          <play-map ref="PlayMap8" @playDice="playDice" @setCharaStatus="setCharaStatus" weaponName="打撃" playId=8 :childcomboId="comboId" />
          <play-map ref="PlayMap9" @playDice="playDice" @setCharaStatus="setCharaStatus" weaponName="射撃" playId=9 :childcomboId="comboId" />
          <play-map ref="PlayMap10" @playDice="playDice" @setCharaStatus="setCharaStatus" weaponName="格闘" playId=10 :childcomboId="comboId" />
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>

</template>

<script>
import StatusResult from '~/components/play/StatusResult.vue';
import PlayMap from '../components/play/PlayMap.vue';
import {Status} from '~/modules/status.js';
export default {
  components: {
    StatusResult,
    PlayMap,
  },
  data(){
    return{
      nowDay: 0,
      daysLeft: 280,
      charaStatus: new Status(1, 1, 1, 1, 1),
      comboId: 100,
      tab: null,
    }
  },
  props: {
    childcomboId: Number,
  },
  methods:{
    playDice: function(diceResult){
      this.nowDay += diceResult;
      this.daysLeft -= diceResult;
    },
    makeMaps: function(){
      this.$refs.PlayMap1.makeMap();
      this.$refs.PlayMap2.makeMap();
      this.$refs.PlayMap3.makeMap();
      this.$refs.PlayMap4.makeMap();
      this.$refs.PlayMap5.makeMap();
      this.$refs.PlayMap6.makeMap();
      this.$refs.PlayMap7.makeMap();
      this.$refs.PlayMap8.makeMap();
      this.$refs.PlayMap9.makeMap();
      this.$refs.PlayMap10.makeMap();
      this.nowDay = 0;
      this.daysLeft = 280;
    },
    setCharaStatus: function(charaStatus){
      this.charaStatus.addCharaStatus(
        charaStatus.strength,
        charaStatus.dexterity,
        charaStatus.defense,
        charaStatus.intelligence,
        charaStatus.speed,
      )
    }

  }
}
</script>
