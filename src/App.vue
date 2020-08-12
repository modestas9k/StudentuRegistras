<template>
    <div id="app">
        <Navigation />
        <section class="section">
            <div class="container">
                <router-view />
            </div>
        </section>
    </div>
</template>
<script>
import Navigation from "./components/Navigation";
export default {
    name: "app",
    components: { Navigation },
};
</script>

<style></style>
