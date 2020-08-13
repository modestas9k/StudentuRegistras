<template>
    <div class="addgroup">
        <div class="section">
            <div class="container">
                <form v-on:submit.prevent="editGroup" class=" box max">
                    <h1 class="title">Add Group</h1>
                    <Notification
                        v-if="notification"
                        v-on:close="notification = false"
                        :type="type"
                        :message="Message"
                    />
                    <div class="field">
                        <label class="label" for="class">Class Name</label>
                        <input
                            class="input"
                            v-model="className"
                            type="text"
                            name="class"
                            placeholder="Enter class Name"
                            required
                        />
                    </div>
                    <div class="field">
                        <label for="lectur" class="label">Lecturer</label>
                        <input
                            class="input"
                            v-model="lecturer"
                            type="text"
                            name="lectur"
                            placeholder="Enter class Lecturer"
                        />
                    </div>
                    <label class="label">Student List</label>
                    <ul class="list-group">
                        <li
                            class="list-group-item"
                            v-for="student in studentList"
                            :key="student.id"
                        >
                            <label>
                                <input
                                    type="checkbox"
                                    :value="`${student.id}`"
                                    v-model="studentListGroup"
                                />
                                {{ `${student.name} ${student.surname}` }}
                            </label>
                        </li>
                    </ul>
                    <div class="buttons">
                        <button
                            class="button is-primary my-4"
                            :class="loading && 'is-loading'"
                            type="submit"
                        >
                            Submit changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import Notification from "../components/Notification";
export default {
    name: "addgroup",
    components: { Notification },
    data() {
        return {
            studentList: [],
            studentListGroup: [],
            className: "",
            lecturer: "",
            notification: false,
            Message: "",
            loading: false,
        };
    },
    methods: {
        editGroup() {
            firebase
                .firestore()
                .collection("groups")
                .doc(this.$route.params.id)
                .set({
                    name: this.className,
                    lecturer: this.lecturer,
                    studentList: this.studentListGroup,
                })
                .then(() => {
                    this.loading = false;
                    this.notification = true;
                    this.type = "is-success";
                    this.Message = "You have changed successfully";
                })
                .catch((error) => {
                    this.loading = false;
                    this.notification = true;
                    this.type = "is-danger";
                    this.Message = `There was a problem : ${error.message}`;
                });
        },
    },
    beforeMount() {
        firebase
            .firestore()
            .collection("groups")
            .doc(this.$route.params.id)
            .get()
            .then((doc) => {
                this.className = doc.data().name;
                this.lecturer = doc.data().lecturer;
                this.studentListGroup = doc.data().studentList;
            })
            .catch((error) => {
                this.error = true;
                this.errorType = "is-danger";
                this.errorMessage = error.message;
            });
        firebase
            .firestore()
            .collection("students")
            .get()
            .then((snapshot) =>
                snapshot.docs.forEach((doc) => {
                    this.studentList.push({
                        id: doc.id,
                        name: doc.data().name,
                        surname: doc.data().surname,
                    });
                })
            );
    },
};
</script>

<style scoped>
.max {
    max-width: 600px;
    margin: 0 auto;
}
</style>
