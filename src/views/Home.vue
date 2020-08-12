<template>
    <div class="home">
        <div class="section">
            <div class="container">
                <h1 class="title ">List of students</h1>
                <div class="buttons is-right">
                    <div class="control">
                        <router-link
                            to="/add"
                            class="button is-primary is-outlined"
                        >
                            Add student
                        </router-link>
                    </div>
                </div>
                <table class="table is-striped box is-hoverable is-fullwidth">
                    <thead class="title is-6">
                        <tr>
                            <td>Name</td>
                            <td>Surname</td>
                            <td>Gender</td>
                            <td>Date of birth</td>
                            <td>Phone</td>
                            <td>Email</td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in studentsList" :key="item">
                            <td>{{ item.name }}</td>
                            <td>{{ item.surname }}</td>
                            <td>{{ item.gender }}</td>
                            <td>{{ item.bdate }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.email }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

export default {
    name: "Home",
    data() {
        return {
            studentsList: [],
        };
    },
    beforeMount() {
        firebase
            .firestore()
            .collection("students")
            .get()
            .then((snapshot) =>
                snapshot.docs.forEach((doc) => {
                    this.studentsList.push({
                        name: doc.data().name,
                        surname: doc.data().surname,
                        gender: doc.data().gender,
                        bdate: doc.data().bdate,
                        phone: doc.data().phone,
                        email: doc.data().email,
                    });
                })
            );
    },
};
</script>
