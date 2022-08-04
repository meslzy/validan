<template>
  <div id="container-404">
    <img src="/images/404.svg" alt="validan logo">
    <h2 id="message">{{ message() }}</h2>
    <h3>Try going back to our homepage.</h3>
    <h4>
      <RouterLink id="redirect" to="/">Home</RouterLink>
    </h4>
  </div>
</template>

<script>
const messages = [
  "Looks like we've got some missing page",
  "This page is outside of the Universe",
];

export default {
  methods: {
    message () {
      return messages[Math.floor(Math.random() * messages.length)];
    }
  }
};
</script>

<style scoped lang="scss">
#container-404 {
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  img {
    height: 160px;
  }

  h4 {
    a {
      padding: 0 10px;
    }
  }
}
</style>
