<template>
    <q-drawer
        v-model="drawer"
        show-if-above
        mini-to-overlay
        :class="collapsed ? 'shadow-6' : 'shadow-12'"
        :breakpoint="500"
        :mini="collapsed"
        :width="250"
        @click="collapsed = !collapsed"
        class="cursor-pointer"
    >
        <q-scroll-area class="fit">
            <q-list padding>
                <q-item clickable class="toggle justify-end no-focus">
                    <q-icon
                        class="q-py-lg q-px-md"
                        name="svguse:/icons.svg#arrow-right|0 0 18 18"
                        size="1.5em"
                    />
                </q-item>

                <q-item
                    v-for="action in actions"
                    clickable
                    no-ripple
                    class="no-focus"
                    :active="$route.name === action.routeName"
                    :key="action.name"
                    @click="handleClickItem(action.routeName)"
                >
                    <q-item-section avatar class="q-pr-md">
                        <q-icon
                            class="q-pa-xs"
                            :name="`svguse:/icons.svg#${action.icon}|0 0 18 18`"
                            size="1.25em"
                        />
                    </q-item-section>
                    <q-item-section>
                        {{ $t(action.label) }}
                    </q-item-section>
                </q-item>
            </q-list>
        </q-scroll-area>
    </q-drawer>
</template>

<script lang="ts" setup>
import { useNavigate } from "src/hooks/useNavigate";
import { ISidebarActions } from "src/types/ISidebarActions";
import { ref } from "vue";
import { useRoute } from "vue-router";

defineProps<{ actions: ISidebarActions[] }>();

const $route = useRoute();
const { goto } = useNavigate();

const collapsed = ref(true);
const drawer = ref(false);

const handleClickItem = (routeName: string) => {
    collapsed.value = false;
    switch (routeName) {
        default:
            goto(routeName);
            break;
    }
};
</script>

<style scoped lang="sass">
.toggle .q-icon
    opacity: 0.75
    transition: opacity var(--speed-quick) var(--ease)

.toggle:hover .q-icon
    opacity: 1

:deep(.q-drawer--standard) .toggle .q-icon
    transform: rotate(180deg)

.q-item
    opacity: 0.5
    transition: opacity var(--speed-quick) var(--ease)

.q-item:hover
    opacity: 1

.q-item.toggle,
.q-item--active,
.q-item--active:hover
    opacity: 1

.q-item--active
    color: $dark
    background-color: transparentize($cream, 0.5)

.q-item__section--avatar
    min-width: 0
</style>
