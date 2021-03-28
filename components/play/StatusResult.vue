<template>
    <v-card>
        <v-subheader :inset="inset">キャラクターステータス</v-subheader>
        <v-list>
            <v-list-item>
                <v-list-item-action>
                    <v-icon>mdi-sword</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                        STR : {{status.strength}}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider
                :inset="inset"
            ></v-divider>
            <v-list-item>
                <v-list-item-action>
                    <v-icon>mdi-hand</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                        DEX : {{status.dexterity}}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider
                :inset="inset"
            ></v-divider>
            <v-list-item>
                <v-list-item-action>
                    <v-icon>mdi-shield</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                        DEF : {{status.defense}}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider
                :inset="inset"
            ></v-divider>
            <v-list-item>
                <v-list-item-action>
                    <v-icon>mdi-doctor</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                        INT : {{status.intelligence}}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider
                :inset="inset"
            ></v-divider>
            <v-list-item>
                <v-list-item-action>
                    <v-icon>mdi-shoe-print</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>
                        SPD : {{status.speed}}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>
<script>
import {Status} from '~/modules/status.js';
export default {
    components: {
    },
    data(){
        return{
            inset: true,
        }
    },
    props: {
        status: {
            type: Object,
            'default': () => { new Status(1, 1, 1, 1, 1) },
        }
    },
    methods:{

    }
}
</script>