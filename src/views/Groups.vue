<template>
    <div class="groups">
        <div class="section">
            <div class="container box">
                <h1 class="title">List of groups</h1>
                <div class="buttons is-right">
                    <div class="control">
                        <router-link
                            to="/addgroup"
                            class="button is-primary is-outlined"
                        >
                            Add group
                        </router-link>
                    </div>
                </div>

                <table class="table is-striped  is-hoverable is-fullwidth">
                    <thead class="title is-6">
                        <tr>
                            <td>Class Name</td>
                            <td>Lecturer</td>
                            <td>Students</td>
                            <td>Edit Group</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="group in groupList" :key="group.id">
                            <td>{{ group.name }}</td>
                            <td>{{ group.lecturer }}</td>
                            <td>
                                <ul>
                                    <li
                                        v-for="student in group.studentList"
                                        :key="student.id"
                                    >
                                        {{ student.fullName }}
                                    </li>
                                </ul>
                            </td>
                            <td>
                                <router-link :to="/editgroup/ + group.id">
                                    Edit
                                </router-link>
                            </td>
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
    name: "groups",
    data() {
        return {
            groupList: [],
        };
    },

    beforeMount() {
        firebase
            .firestore()
            .collection("groups")
            .get()
            .then((snapshot) =>
                snapshot.docs.forEach((groupDoc) => {
                    this.groupList.push({
                        id: groupDoc.id,
                        name: groupDoc.data().name,
                        lecturer: groupDoc.data().lecturer,
                        studentList: [],
                    });

                    console.log(groupDoc.data().studentList);

                    groupDoc.data().studentList.forEach((itemId) => {
                        firebase
                            .firestore()
                            .collection("students")
                            .doc(itemId)
                            .get()
                            .then((studentDoc) => {
                                let group = this.groupList.find(
                                    (group) => group.id === groupDoc.id
                                );

                                group.studentList.push({
                                    id: itemId,
                                    fullName:
                                        studentDoc.data().name +
                                        " " +
                                        studentDoc.data().surname,
                                });
                            });
                    });
                })
            )
            .catch((error) => {
                console.log(error);
            });
    },
};
</script>

<style></style>
