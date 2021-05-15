<template>
    <v-card>
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
                    <v-icon>mdi-numeric-1-circle-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                        PRE : {{status.preemption}}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider
                :inset="inset"
            ></v-divider>
            <v-list-item>
                <v-list-item-action>
                    <v-icon>mdi-run-fast</v-icon>
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
import {Status} from '~/modules/config/common/status.js';
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
            type: Status,
            'default': () => { new Status(1, 1, 1, 1, 1, 1) },
        }
    },
    methods:{

    }
}
</script>