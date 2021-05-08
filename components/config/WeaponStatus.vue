<template>
  <v-card>
      <v-card-title>訓練ステータス上昇値【 {{weponName}} 】</v-card-title>
      <v-card-text>
          武器を指定して訓練した場合の1日当たりのキャラクターのステータス上昇値を設定してください
      </v-card-text>
      <v-card-actions>
      <v-form>
          <v-text-field v-model="weaponStr" label="STR" />
          <v-text-field v-model="weaponDex" label="DEX" />
          <v-text-field v-model="weaponDef" label="DEF" />
          <v-text-field v-model="weaponInt" label="INT" />
          <v-text-field v-model="weaponSpd" label="SPD" />
      </v-form>
      </v-card-actions>
  </v-card>
</template>
<script>
import {Status} from '~/modules/config/common/status.js';
export default {
  data(){
    return{
      weaponStr: 0,
      weaponDex: 0,
      weaponDef: 0,
      weaponInt: 0,
      weaponSpd: 0,
    }
  },
  props: {
      weponName: String,
      saveKey: String,
  },
  methods:{
    saveWeaponData: function(){
      var status = new Status(
        this.weaponStr,
        this.weaponDex,
        this.weaponDef,
        this.weaponInt,
        this.weaponSpd
      )
      var saveJson = JSON.stringify(status);
      localStorage.setItem(this.saveKey, saveJson);

    },
    loadWeaponData: function(){
      var loadJson = localStorage.getItem(this.saveKey);
      var status = JSON.parse(loadJson);
      this.weaponStr = status.strength;
      this.weaponDex = status.dexterity;
      this.weaponDef = status.defense;
      this.weaponInt = status.intelligence;
      this.weaponSpd = status.speed;

    },
  }
}
</script>