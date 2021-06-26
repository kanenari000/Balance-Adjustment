<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <v-col cols=10>
        <h1 class="font-weight-bold display-3">
          Config
        </h1>
      </v-col>
      <v-col cols=2>
        <v-btn color="primary" @click="saveConfig()">
          Save
        </v-btn>
      </v-col>
    </v-card-title>

    <v-tabs
      v-model="tab"
      background-color="transparent"
      grow
    >
      <v-tab>訓練成長ステータス</v-tab>
      <v-tab>探索成長ステータス</v-tab>
      <v-tab>探索入手素材</v-tab>
      <v-tab>店強化</v-tab>
      <v-tab>武器売却</v-tab>
      <v-tab>武器レシピ</v-tab>
      <v-tab>初期所持素材</v-tab>
      <v-tab>その他</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item eager>
        <weapons
          :weaponStatus.sync="configInfo.trainingInfo.status"
          :statusCorrection.sync="configInfo.trainingInfo.statusCorrection"
        />
      </v-tab-item>
      <v-tab-item eager>
        <weapons
          :weaponStatus.sync="configInfo.searchInfo.status"
          :statusCorrection.sync="configInfo.searchInfo.statusCorrection"
        />
      </v-tab-item>
      <v-tab-item eager>
        <search-material-set
          :materials.sync="configInfo.searchInfo.materials"
          :materialsCorrection.sync="configInfo.searchInfo.materialsCorrection"
        />
      </v-tab-item>
      <v-tab-item eager>
        <shop-update :shopInfoList.sync="configInfo.shopInfoList" />
      </v-tab-item>
      <v-tab-item eager>
        <weapon-info :weaponsInfoList.sync="configInfo.weaponsInfoList" />
      </v-tab-item>
      <v-tab-item eager>
        <weapon-recipe :weaponsInfoList.sync="configInfo.weaponsInfoList" />
      </v-tab-item>
      <v-tab-item>
        <init-material :initMaterialSet="configInfo.initMaterialSet" />
      </v-tab-item>
      <v-tab-item eager>
        <ather-setting
          :status.sync="configInfo.statusCorrection"
          :trainingCombo.sync="configInfo.trainingInfo.combo"
          :searchCombo.sync="configInfo.searchInfo.combo"
          :typeRateList.sync="configInfo.typeRateList"
          :mapRateList.sync="configInfo.mapRateList"
          :weaponProgress.sync="configInfo.weaponProgress"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-card>

</template>

<script>
import {ConfigItems} from '~/modules/config/common/configItems.js';
import Weapons from '~/components/config/Weapons.vue';
import AtherSetting from '../components/config/AtherSetting.vue';
import SearchMaterialSet from '../components/config/SearchMaterialSet.vue';
import ShopUpdate from '../components/config/ShopUpdate.vue';
import WeaponInfo from '../components/config/WeaponInfo.vue';
import WeaponRecipe from '../components/config/WeaponRecipe.vue';
import InitMaterial from '../components/config/InitMaterial.vue';
export default {
  components: {
    Weapons,
    AtherSetting,
    SearchMaterialSet,
    ShopUpdate,
    WeaponInfo,
    WeaponRecipe,
    InitMaterial,
  },
  data(){
    return{
      tab: null,
      configInfo: new ConfigItems(),
    }
  },
  props: {
  },
  methods:{
    saveConfig: function(){
      // コンフィグ情報をローカルストレージに保存
      let saveJson = JSON.stringify(this.configInfo);
      localStorage.setItem("config-info", saveJson);
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
<style>

</style>