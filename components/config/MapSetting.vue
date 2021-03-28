<template>
    <v-row justify="center">
      <v-col >
        <v-card>
          <v-card-title>マップ区分設定</v-card-title>
          <v-card-text>
            マップ生成時の区分の設定をしてください。<br>
            入力された数値で出現率が決定されます。
          </v-card-text>
          <v-card-actions>
            <v-form>
              <v-text-field v-model="typeRateList[0]" label="青" />
              <v-text-field v-model="typeRateList[1]" label="黄" />
              <v-text-field v-model="typeRateList[2]" label="赤" />
              <v-text-field v-model="typeRateList[3]" label="濃赤" />
              <v-text-field v-model="typeRateList[4]" label="無色" />
            </v-form>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>マップ倍率設定</v-card-title>
          <v-card-text>
            マップ生成時に設定される倍率の設定をしてください。<br>
            ここで設定した倍率は等確立で8マスに1回出現するものとなります。
          </v-card-text>
          <v-card-actions>
            <v-form>
              <v-text-field v-model="rateList[0]" label="倍率1" />
              <v-text-field v-model="rateList[1]" label="倍率2" />
              <v-text-field v-model="rateList[2]" label="倍率3" />
              <v-text-field v-model="rateList[3]" label="倍率4" />
              <v-text-field v-model="rateList[4]" label="倍率5" />
              <v-text-field v-model="rateList[5]" label="倍率6" />
              <v-text-field v-model="rateList[6]" label="倍率7" />
              <v-text-field v-model="rateList[7]" label="倍率8" />
            </v-form>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-btn
            depressed
            color="primary"
            v-on:click="saveMapData"
        >
            Save
        </v-btn>
        <v-btn
            depressed
            color="primary"
            v-on:click="loadMapData"
        >
            Load
        </v-btn>
      </v-col>
    </v-row>
</template>
<script>
export default {

    components: {
    },
    data(){
        return{
            typeRateList: [15, 15, 15, 15, 40],
            rateList: [0.0, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 2.0],
            typeRateKey: "type-rate-key",
            rateKey: "rate-key",
        }
    },
    props: {
    },
    methods:{
      saveMapData: function(){
        // 区分
        var saveJson = JSON.stringify(this.typeRateList);
        localStorage.setItem(this.typeRateKey, saveJson);
        // 倍率
        saveJson = JSON.stringify(this.rateList);
        localStorage.setItem(this.rateKey, saveJson);
      },
      loadMapData: function(){
        // 区分
        var loadJson = localStorage.getItem(this.typeRateKey);
        var loadRate = JSON.parse(loadJson);
        this.typeRateList = loadRate;

        // 倍率
        var loadJson = localStorage.getItem(this.rateKey);
        var loadRate = JSON.parse(loadJson);
        this.rateList = loadRate;
      },
    }
}
</script>
