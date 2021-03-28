<template>
    <v-row >
        <v-col>
            <weapon-status ref="Weapon1" weponName="刀剣" saveKey="weapon-status1" />
        </v-col>
        <v-col>
            <weapon-status ref="Weapon2" weponName="長柄" saveKey="weapon-status2" />
        </v-col>
        <v-col>
            <weapon-status ref="Weapon3" weponName="魔法" saveKey="weapon-status3" />
        </v-col>
        <v-col>
            <weapon-status ref="Weapon4" weponName="射撃" saveKey="weapon-status4" />
        </v-col>
        <v-col>
            <weapon-status ref="Weapon5" weponName="格闘" saveKey="weapon-status5" />
        </v-col>
        <v-col>
            <v-btn
                depressed
                color="primary"
                v-on:click="saveWeaponData"
            >
                Save
            </v-btn>
            <v-btn
                depressed
                color="primary"
                v-on:click="loadWeaponData"
            >
                Load
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
import WeaponStatus from '~/components/config/WeaponStatus.vue';
export default {
  components: {
    WeaponStatus,
  },
  data(){
    return{
    }
  },
  props: {
  },
  methods:{
      saveWeaponData: function(){
        this.$refs.Weapon1.saveWeaponData();
        this.$refs.Weapon2.saveWeaponData();
        this.$refs.Weapon3.saveWeaponData();
        this.$refs.Weapon4.saveWeaponData();
        this.$refs.Weapon5.saveWeaponData();
      },
      loadWeaponData: function(){
        this.$refs.Weapon1.loadWeaponData();
        this.$refs.Weapon2.loadWeaponData();
        this.$refs.Weapon3.loadWeaponData();
        this.$refs.Weapon4.loadWeaponData();
        this.$refs.Weapon5.loadWeaponData();
      },

  }
}
</script>