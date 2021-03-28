<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3">
        Config
      </h1>
    </v-card-title>

    <v-tabs
      v-model="tab"
      background-color="transparent"
      grow
    >
      <v-tab>キャラクターステータス</v-tab>
      <v-tab>訓練時武器ステータス上昇値</v-tab>
      <v-tab>コンボ</v-tab>
      <v-tab>マップ生成</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <character-status/>
      </v-tab-item>
      <v-tab-item>
        <weapons/>
      </v-tab-item>
      <v-tab-item>
        <combo-setting/>
      </v-tab-item>
      <v-tab-item>
        <map-setting/>
      </v-tab-item>
    </v-tabs-items>
  </v-card>

</template>

<script>
import Weapons from '~/components/config/Weapons.vue';
import CharacterStatus from '~/components/config/CharacterStatus.vue';
import ComboSetting from '../components/config/ComboSetting.vue';
import MapSetting from '../components/config/MapSetting.vue';
export default {
  components: {
    Weapons,
    CharacterStatus,
    ComboSetting,
    MapSetting
  },
  data(){
    return{
      tab: null
    }
  },
  props: {
  },
  methods:{

  }
}
</script>
<style>

</style>