<template>
    <v-row justify="center">
      <v-col>
        <v-card>
          <v-card-title>訓練コンボ</v-card-title>
          <v-card-text>
            訓練時の各種パラメータの設定をしてください。
          </v-card-text>
          <v-card-actions>
            <v-form>
              <v-text-field v-model="trainingCombo.rate" label="コンボ増加率" />
              <v-text-field v-model="trainingCombo.max" label="コンボ最大値" />
            </v-form>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>探索コンボ</v-card-title>
          <v-card-text>
            探索時の各種パラメータの設定をしてください。
          </v-card-text>
          <v-card-actions>
            <v-form>
              <v-text-field v-model="searchCombo.rate" label="コンボ増加率" />
              <v-text-field v-model="searchCombo.max" label="コンボ最大値" />
            </v-form>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-btn
            depressed
            color="primary"
            v-on:click="saveStatusData"
        >
            Save
        </v-btn>
        <v-btn
            depressed
            color="primary"
            v-on:click="loadStatusData"
        >
            Load
        </v-btn>
      </v-col>
    </v-row>
</template>
<script>
import {Combo} from '~/modules/combo.js';
export default {

    components: {
    },
    data(){
        return{
            trainingCombo: new Combo(0.2, 3),
            searchCombo: new Combo(0.3, 3),
            trainingComboKye: "training-combo-kye",
            searchComboKye: "search-combo-kye",
        }
    },
    props: {
    },
    methods:{
        saveComboData: function(){
          // 訓練コンボ
          var saveJson = JSON.stringify(this.trainingCombo);
          localStorage.setItem(this.trainingComboKye, saveJson);
          // 探索コンボ
          saveJson = JSON.stringify(this.searchComboKye);
          localStorage.setItem(this.searchComboKye, saveJson);
        },
        loadComboData: function(){
          // 訓練コンボ
          var loadJson = localStorage.getItem(this.trainingComboKye);
          var loadCombo = JSON.parse(loadJson);
          this.trainingCombo = loadCombo;

          // 探索コンボ
          var loadJson = localStorage.getItem(this.searchComboKye);
          var loadCombo = JSON.parse(loadJson);
          this.searchCombo = loadCombo;
        },

    }
}
</script>
