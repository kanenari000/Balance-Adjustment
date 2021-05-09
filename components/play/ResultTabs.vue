<template>
    <v-col cols="9">
        <v-tabs
        fixed-tabs
        background-color="blue-grey darken-4"
        dark
        v-model="resultTab"
        >
            <v-tab> キャラクターステータス </v-tab>
            <v-tab> 所持武器 </v-tab>
            <v-tab> 所持素材 </v-tab>
            <v-tab> 店舗陳列 </v-tab>
            <v-tab> 店強化 </v-tab>
            <v-tab> マス目サマリ </v-tab>
            <v-tab> 一品物製造状態 </v-tab>
            <v-tab> 大会予約 </v-tab>
        </v-tabs>
        <v-tabs-items v-model="resultTab">
            <v-tab-item>
                <v-row>
                    <v-col><status-result :status="status" /></v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item>
                <v-row>
                    <v-col v-for="weaponName in weaponNames" :key="weaponName">
                        <my-material :itemName="weaponName" :rankPossessions="resultItems.weaponSet[weaponName]"/>
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item>
                <v-row>
                    <v-col v-for="materialName in materialNames" :key="materialName">
                        <my-material :itemName="materialName" :rankPossessions="resultItems.materialSet[materialName]"/>
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item>
                <v-row>
                    <v-col v-for="weaponName in weaponNames" :key="weaponName">
                        <shop-weapons :itemName="weaponName" :rankPossessions="resultItems.weaponSet[weaponName]"/>
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item>
                <shop-update 
                    :shopRateStage="resultItems.shopRateStage" 
                    :shopValueStage="resultItems.shopValueStage"
                    :shopLimitStage="resultItems.shopLimitStage"
                />
            </v-tab-item>
            <v-tab-item>
                <map-summary
                    :mapTypeSelect="resultItems.mapTypeSelect"
                    :trainingSelect="resultItems.trainingSelect"
                    :searchSelect="resultItems.searchSelect"
                />
            </v-tab-item>
            <v-tab-item>
                <v-row>
                    <v-col v-for="weaponName in weaponNames" :key="weaponName">
                        <weapon-progress 
                            :itemName="weaponName" 
                            :rankPossessions="resultItems.weaponProgress[weaponName]"
                            progressMax=10
                        />
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item>
                大会予約できるようにしたい
            </v-tab-item>
        </v-tabs-items>
    </v-col>
</template>
<script>
import {Status} from '~/modules/config/common/status.js';
import {ResultSet} from '~/modules/play/resultSet.js';
import StatusResult from '~/components/play/result/StatusResult.vue';
import MyMaterial from './result/MyMaterial.vue';
import ShopWeapons from './result/ShopWeapons.vue';
import ShopUpdate from './result/ShopUpdate.vue';
import MapSummary from './result/MapSummary.vue';
import WeaponProgress from './result/WeaponProgress.vue';
export default {
    components: {
        StatusResult,
        MyMaterial,
        ShopWeapons,
        ShopUpdate,
        MapSummary,
        WeaponProgress,
    },
    data(){
        return{
            resultTab: null,
            // resultItems: new ResultSet(),
            weaponNames: ["刀剣", "長柄", "打撃", "射撃", "魔法"],
            materialNames: ["金属", "木材", "皮革"],
        }
    },
    props: {
        status: {
            type: Object,
            'default': () => { new Status(1, 1, 1, 1, 1, 1) },
        },
        resultItems: ResultSet,
    },
    methods:{

    }
}
</script>