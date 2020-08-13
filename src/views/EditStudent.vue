<template>
    <div class="addstudent">
        <div class="section">
            <div class="container">
                <Notification
                    v-if="notification"
                    v-on:close="notification = false"
                    :type="type"
                    :message="Message"
                />
                <form v-on:submit.prevent="editStudent" class="box">
                    <h1 class="title is-2">Edit Student</h1>
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                v-model="name"
                                placeholder="Student name"
                                required
                            />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Surname</label>
                        <div class="control">
                            <input
                                class="input"
                                v-model="surname"
                                type="text"
                                placeholder="Student last name"
                                required
                            />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Gender</label>
                        <div class="control">
                            <label class="radio">
                                <input
                                    type="radio"
                                    v-model="gender"
                                    value="male"
                                />
                                Male
                            </label>
                            <label class="radio">
                                <input
                                    type="radio"
                                    v-model="gender"
                                    value="female"
                                />
                                Female
                            </label>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Birth date</label>
                        <div class="control">
                            <input
                                class="input"
                                v-model="bdate"
                                type="text"
                                placeholder="1994-01-20"
                                required
                            />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Phone</label>
                        <div class="control">
                            <input
                                class="input"
                                v-model="phone"
                                type="number"
                                placeholder="860011111"
                                required
                            />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input
                                class="input"
                                v-model="email"
                                type="email"
                                placeholder="Student email"
                                required
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
                                Submit Schanges
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
import "firebase/firestore";
import Notification from "../components/Notification";

export default {
    name: "add",
    components: { Notification },
    data() {
        return {
            name: "",
            surname: "",
            gender: "",
            bdate: "",
            phone: Number,
            email: "",
            notification: false,
            Message: "",
            loading: false,
        };
    },
    methods: {
        editStudent() {
            this.loading = true;
            firebase
                .firestore()
                .collection("students")
                .doc(this.$route.params.id)
                .set({
                    name: this.name,
                    surname: this.surname,
                    gender: this.gender,
                    bdate: this.bdate,
                    phone: this.phone,
                    email: this.email,
                })
                .then(() => {
                    this.loading = false;
                    this.notification = true;
                    this.type = "is-success";
                    this.Message = "You have added a student to student list.";
                })
                .catch((error) => {
                    this.loading = false;
                    this.notification = true;
                    this.type = "is-danger";
                    this.Message = `There was a problem adding student: ${error.message}`;
                });
        },
    },
    beforeMount() {
        firebase
            .firestore()
            .collection("students")
            .doc(this.$route.params.id)
            .get()
            .then((doc) => {
                this.name = doc.data().name;
                this.surname = doc.data().surname;
                this.gender = doc.data().gender;
                this.bdate = doc.data().bdate;
                this.phone = doc.data().phone;
                this.email = doc.data().email;
            })
            .catch((error) => {
                this.error = true;
                this.errorType = "is-danger";
                this.errorMessage = error.message;
            });
    },
};
</script>
