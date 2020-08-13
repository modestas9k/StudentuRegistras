import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Students",
        component: Home,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/groups",
        name: "Groups",
        component: () =>
            import(/* webpackChunkName: "groups" */ "../views/Groups.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/addgroup",
        name: "AddGroup",
        component: () =>
            import(/* webpackChunkName: "addgroup" */ "../views/AddGroup.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/editgroup/:id",
        name: "Edit Group",
        component: () =>
            import(
                /* webpackChunkName: "editgroup" */ "../views/EditGroup.vue"
            ),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/editstudent/:id",
        name: "Edit Student",
        component: () =>
            import(
                /* webpackChunkName: "editstudent" */ "../views/EditStudent.vue"
            ),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/Login.vue"),
        meta: {
            requiresAnon: true,
        },
    },
    {
        path: "/register",
        name: "Register",
        component: () =>
            import(/* webpackChunkName: "register" */ "../views/Register.vue"),
        meta: {
            requiresAnon: true,
        },
    },
    {
        path: "/add",
        name: "Add",
        component: () =>
            import(/* webpackChunkName: "add" */ "../views/Add.vue"),
        meta: {
            requiresAuth: true,
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user && to.matched.some((route) => route.meta.requiresAuth)) {
            next({ path: "/login" });
        } else if (
            user &&
            to.matched.some((route) => route.meta.requiresAnon)
        ) {
            next({ path: "/" });
        } else {
            next();
        }
    });
});

export default router;
