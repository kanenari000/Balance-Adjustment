<template>
    <v-simple-table fixed-header height="450px" dense>
        <template v-slot:default>
            <thead>
                <tr>
                    <th rowspan="2" width="8%">ターン</th>
                    <th colspan="3" width="25%">自分</th>
                    <th colspan="3" width="25%">敵</th>
                    <th rowspan="2" width="42%">行動ログ</th>
                </tr>
                <tr>
                    <th>残HP</th><th>行動値ゲージ</th><th>奥義ゲージ</th>
                    <th>残HP</th><th>行動値ゲージ</th><th>奥義ゲージ</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(log, index) in battleLogs" :key="index">
                    <td>{{log.tarn}}</td>
                    <td>{{log.myLeftHp}}</td>
                    <td>{{log.myActionValue}}</td>
                    <td>{{log.myMysteryValue}}</td>
                    <td>{{log.enemyLeftHp}}</td>
                    <td>{{log.enemyActionValue}}</td>
                    <td>{{log.enemyMysteryValue}}</td>
                    <td>{{log.logMessage}}</td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
export default {
    components: {
    },
    data(){
        return{

        }
    },
    props: {
        battleLogs: Array,
    },
    methods:{

    },
    mounted(){

    },
}
</script>
<style>

</style>