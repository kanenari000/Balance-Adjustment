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
                    <v-form>
                        <v-text-field v-model="status.strength" label="STR" />
                        <v-text-field v-model="status.dexterity" label="DEX" />
                        <v-text-field v-model="status.defense" label="DEF" />
                        <v-text-field v-model="status.intelligence" label="INT" />
                        <v-text-field v-model="status.speed" label="SPD" />
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
import {Status} from '~/modules/status.js';
export default {

    components: {
    },
    data(){
        return{
            status: new Status(1, 1, 1, 1, 1),
            saveKey: "chara-status-growth",
        }
    },
    props: {
    },
    methods:{
        saveStatusData: function(){
            var saveJson = JSON.stringify(this.status);
            localStorage.setItem(this.saveKey, saveJson);
        },
        loadStatusData: function(){
            var loadJson = localStorage.getItem(this.saveKey);
            var loadStatus = JSON.parse(loadJson);
            this.status = loadStatus;
        },
    }
}
</script>
