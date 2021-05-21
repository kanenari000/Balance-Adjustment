<template>
    <v-row justify="center">
      <v-col>
        <v-card>
          <v-card-title>キャラクター成長補正</v-card-title>
          <v-card-text>
            キャラクターの成長補正を設定してください<br>
            ※「1」の場合、補正なしの状態
          </v-card-text>
          <v-card-actions>
            <status-set :status.sync="cStatus" />
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>コンボ</v-card-title>
          <v-row><v-col>【訓練】</v-col></v-row>
          <v-row>
            <v-col>
              <v-card-actions><v-form>
                <v-text-field v-model="cTrainingCombo.rate" label="コンボ増加率" />
              </v-form></v-card-actions>
            </v-col>
            <v-col>
              <v-card-actions><v-form>
                <v-text-field v-model="cTrainingCombo.max" label="コンボ最大値" />
              </v-form></v-card-actions>
            </v-col>
          </v-row>
          <v-divider />
          <v-row><v-col>【探索】</v-col></v-row>
          <v-row>
            <v-col>
              <v-card-actions><v-form>
                <v-text-field v-model="cSearchCombo.rate" label="コンボ増加率" />
              </v-form></v-card-actions>
            </v-col>
            <v-col>
              <v-card-actions><v-form>
                <v-text-field v-model="cSearchCombo.max" label="コンボ最大値" />
              </v-form></v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>マップ区分設定</v-card-title>
          <v-card-text>
            マップ生成時の区分の設定をしてください。<br>
            入力された数値で出現率が決定されます。
          </v-card-text>
          <v-card-actions>
            <v-form>
              <template  v-for="(type, index) in typeRateLabel">
                <v-text-field
                  :key="index"
                  v-model="cTypeRateList[index]"
                  :label="type"
                />
              </template>
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
              <template v-for="index in [0,1,2,3,4,5,6,7]">
                <v-text-field
                  :key="index"
                  v-model="cMapRateList[index]"
                  :label="`倍率${index}`"
                />
              </template>
            </v-form>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>一品物製造ダイス値</v-card-title>
          <v-card-text>
            一品物を製造するまでに必要なダイス数を設定してください。
          </v-card-text>
          <v-card-actions>
            <v-form>
              <v-text-field
                v-model="progress"
                label="一品物製造ダイス値"
              />
            </v-form>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
</template>
<script>
import StatusSet from './StatusSet.vue';
export default {
  components: {
    StatusSet,
  },
  data(){
    return{
      typeRateLabel: ["青", "黄", "赤", "濃赤", "無色"]
    }
  },
  props: {
    status: Object,
    trainingCombo: Object,
    searchCombo: Object,
    typeRateList: Array,
    mapRateList: Array,
    weaponProgress: Number,
  },
  computed: {
    cStatus:{
      get(){
        return this.status;
      },
      set(value){
        this.$emit('update:status', value);
      }
    },
    cTrainingCombo:{
      get(){
        return this.trainingCombo;
      },
      set(value){
        this.$emit('update:trainingCombo', value);
      }
    },
    cSearchCombo:{
      get(){
        return this.searchCombo;
      },
      set(value){
        this.$emit('update:searchCombo', value);
      }
    },
    cTypeRateList:{
      get(){
        return this.typeRateList;
      },
      set(value){
        this.$emit('update:typeRateList', value);
      }
    },
    cMapRateList: {
      get(){
        return this.mapRateList;
      },
      set(value) {
        this.$emit('update:mapRateList', value);
      }
    },
    progress: {
      get(){
        return this.weaponProgress;
      },
      set(value) {
        this.$emit('update:weaponProgress', Number(value));
      }
    },
  }
}
</script>
