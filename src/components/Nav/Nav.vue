<template>
    <div id="nav">
        <div>
            <router-link to="/">Home</router-link> |
            <router-link to="/registrations">Registrations</router-link> |
            <router-link to="/admin">Admin</router-link>
        </div>
        <router-view/>
    </div>
</template>

<style scoped lang="less">
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>