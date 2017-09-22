<template>
    <div id="app">
        <navbar></navbar>
        <router-view name='main'></router-view>
    </div>
</template>

<script>
import navbar from './components/navbar';
export default {
    name: 'app',
    data() {
        return {
        };
    },
    components: {
        navbar,
    },
};
</script>