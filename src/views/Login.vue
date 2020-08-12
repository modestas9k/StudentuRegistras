<template>
    <div class="login">
        <div class="section">
            <div class="container box max">
                <h1 class="title">Login</h1>
                <Notification
                    v-if="notification"
                    v-on:close="notification = false"
                    :type="type"
                    :message="Message"
                />
                <form v-on:submit.prevent="login">
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input
                                class="input"
                                type="email"
                                v-model="email"
                                placeholder="e.g. alexsmith@gmail.com"
                            />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input
                                class="input"
                                v-model="password"
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button
                                class="button is-primary"
                                :class="loading && 'is-loading'"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import Notification from "../components/Notification";

export default {
    name: "Login",
    components: { Notification },
    data() {
        return {
            email: "",
            password: "",
            notification: false,
            Message: "",
            loading: false,
        };
    },
    methods: {
        login() {
            this.loading = true;
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(
                    () => this.$router.push("/"),
                    (error) => {
                        this.notification = true;
                        this.type = "is-danger";
                        this.Message = error.message;
                        this.loading = false;
                    }
                );
        },
    },
};
</script>

<style scoped>
.max {
    max-width: 600px;
    margin: 0 auto;
}
</style>
