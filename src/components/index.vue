<template>
    <div class="main">
        <loader v-if="loading" />
        <table border="1" v-else>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
            </tr>
            <tr v-for="user in data" :key="user.refId">
                <td>{{ user.refId }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
            </tr>
        </table>
        <div class="buttons">
            <button @click="getPreviousData()">Previous</button>
            <button @click="getNextData()">Next</button>
        </div>
    </div>



</template>


<script setup>
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { orderBy, limit, startAfter, endBefore } from 'firebase/firestore'
import firebase from 'firebase/compat';
import loader from './loader.vue'

let data = ref([]);
let last = undefined;
const db = firebase.firestore();
let loading = ref(false);

onMounted(() => {
    getData();
})

async function getData() {
  
    loading.value = true;
    const first = db.collection('users')
        .orderBy('name')
        .limit(3);

    const snapshot = await first.get();
    last = snapshot.docs[snapshot.docs.length - 1]

    // console.log(snapshot)

    snapshot.docs.map(doc => {
        data.value.push(doc.data());
    })
    loading.value = false;

}

async function getNextData() {

    loading.value = true;

    data.value = [];
    const next = db.collection('users')
        .orderBy('name')
        .startAfter(last.data().name)
        .limit(3);

    const snapshot = await next.get();

    last = snapshot.docs[snapshot.docs.length - 1]


    snapshot.docs.map(doc => {
        data.value.push(doc.data());
    })
    loading.value = false;


}

async function getPreviousData() {

   
    loading.value = true;

    data.value = [];
    const next = db.collection('users')
        .orderBy('name')
        .endBefore(last.data().name)
        .limit(3);

    const snapshot = await next.get();

    last = snapshot.docs[snapshot.docs.length - 1]

    // console.log(snapshot)

    snapshot.docs.map(doc => {
        data.value.push(doc.data());
    })
    loading.value = false;


}
</script>

<style lang="scss" scoped>
.main {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    table {
        width: 100%;
        height: 100%;

        tr {
            td {
                padding: 1rem;
            }
        }
    }

    .buttons {
        margin: 1rem auto;
    }
}
</style>