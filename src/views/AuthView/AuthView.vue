<template>
  <div id="wrapper">
    <form v-on:submit.prevent="noop" id="main" v-bind:style="{'border-color':borderColor}">
        <span id="authLabel">{{this.dictionary.auth}}</span>
        <input type="text" placeholder="логин" v-model="name" autofocus>
        <input type="text" placeholder="пароль" v-model="password" readonly>
        <button @click="submit()">{{this.dictionary.login}}</button>
        <span>{{this.dictionary.loginWithoutLoginAndPassword}}</span>
        <span v-show="!checkLogin" id="checkLogin">{{this.dictionary.badLoginOrPasspord}}</span>
    </form>
  </div>
</template>

<style src="./AuthView.scss" lang="scss" scoped></style>
<script src="./AuthView.js"></script>