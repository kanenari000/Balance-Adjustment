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
            <v-tab> 一品物製造状態 </v-tab>
            <v-tab> 所持素材 </v-tab>
            <v-tab> 店舗陳列 </v-tab>
            <v-tab> 店強化 </v-tab>
            <v-tab> 大会予約 </v-tab>
            <v-tab> マス目サマリ </v-tab>
            <v-tab> 武器レシピ </v-tab>
        </v-tabs>
        <v-tabs-items v-model="resultTab">
            <v-tab-item eager>
                <v-row>
                    <v-col><status-result :status="status" /></v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item eager>
                <v-row>
                    <v-col v-for="weaponName in weaponNames" :key="weaponName">
                        <my-material :itemName="weaponName" :rankPossessions="resultItems.weaponSet[weaponName]"/>
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item eager>
                <v-row>
                    <v-col v-for="weaponName in weaponNames" :key="weaponName">
                        <weapon-progress 
                            :itemName="weaponName" 
                            :rankPossessions="resultItems.weaponProgress[weaponName]"
                            :progressMax="configInfo.weaponProgress"
                        />
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item eager>
                <v-row>
                    <v-col v-for="materialName in materialNames" :key="materialName">
                        <my-material :itemName="materialName" :rankPossessions="resultItems.materialSet[materialName]"/>
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item eager>
                <v-row>
                    <v-col v-for="weaponName in weaponNames" :key="weaponName">
                        <shop-weapons
                            :itemName="weaponName"
                            :rankPossessions="resultItems.shopWeaponSet[weaponName]"
                            :hasWeaponsNum="resultItems.weaponSet[weaponName]"
                            @setWeapons="setWeapons"
                        />
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item eager>
                <shop-update 
                    :shopRateStage="resultItems.shopRateStage" 
                    :shopValueStage="resultItems.shopValueStage"
                    :shopLimitStage="resultItems.shopLimitStage"
                    @updateShopStage="updateShopStage"
                />
            </v-tab-item>
            <v-tab-item eager>
                <calendars
                    :battleDays="battleDays"
                    @setBattleDays="setBattleDays"
                />
            </v-tab-item>
            <v-tab-item eager>
                <map-summary
                    :mapTypeSelect="resultItems.mapTypeSelect"
                    :trainingSelect="resultItems.trainingSelect"
                    :searchSelect="resultItems.searchSelect"
                />
            </v-tab-item>
            <v-tab-item>
                <view-weapon-recipe :weaponsInfoList="configInfo.weaponsInfoList" />
            </v-tab-item>
        </v-tabs-items>
    </v-col>
</template>
<script>
import {Status} from '~/modules/config/common/status.js';
import {ResultSet} from '~/modules/play/resultSet.js';
import {ConfigItems} from '~/modules/config/common/configItems.js';
import StatusResult from '~/components/play/result/StatusResult.vue';
import MyMaterial from './result/MyMaterial.vue';
import ShopWeapons from './result/ShopWeapons.vue';
import ShopUpdate from './result/ShopUpdate.vue';
import MapSummary from './result/MapSummary.vue';
import WeaponProgress from './result/WeaponProgress.vue';
import Calendars from './result/Calendars.vue';
import ViewWeaponRecipe from './result/ViewWeaponRecipe.vue';
export default {
    components: {
        StatusResult,
        MyMaterial,
        ShopWeapons,
        ShopUpdate,
        MapSummary,
        WeaponProgress,
        Calendars,
        ViewWeaponRecipe,
    },
    data(){
        return{
            resultTab: null,
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
        configInfo: {
            type: ConfigItems,
            'default': () => { new ConfigItems()},
        },
        battleDays: Array,

    },
    methods:{
        setWeapons: function(weapon){
            this.$set(
                this.resultItems.shopWeaponSet[weapon["weapon"]],
                [weapon["rank"]],
                this.resultItems.shopWeaponSet[weapon["weapon"]][weapon["rank"]] + weapon["setNum"]
            );
        },
        updateShopStage: function(item){
            this.$emit("updateShop", item);
        },
        setBattleDays: function(item){
            this.$emit("setBattleDays", item);
        }

    },
    
}
</script>