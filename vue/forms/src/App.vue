<template>
  <div class="container">
    <form action="" class="card">
      <h1>Anketa Vue uchun !</h1>
      <div class="form-control">
        <label for="name">Ismingizni nima ?</label>
        <input type="text" id="name" placeholder="Ismingizni yozing">
      </div>

      <div class="form-control">
        <label for="age">Yoshingiz nechida ?</label>
        <input type="number" id="age" value="20">
      </div>

      <div class="form-control">
        <label for="city">Qayerda yashaysiz ?</label>
        <select id="city" class="citySelect">
          <option value="tosh">Toshkent</option>
          <option value="sam">Samarqand</option>
          <option value="sir">Sirdaryo</option>
        </select>
      </div>

      <div class="form-control">
        <label for="">Tokioga borishni hohlaysizmi ?</label>

        <label for="" class="radio">
          <input type="radio" id="yes" name="radio">
          <span></span>
          Ha
        </label>
        <label for="" class="radio">
          <input type="radio" id="no" name="radio">
          <span></span>
          Yo'q
        </label>
      </div>

      <div class="form-control">
        <label>Vue da nimalarni bilasiz</label>

        <label class="checkbox">
          <input type="checkbox" id="vuex">
          <span></span>
          Vuex
        </label>

        <label class="checkbox">
          <input type="checkbox" id="router">
          <span></span>
          Vue Router
        </label>

      </div>

      <div type="submit" class="btn">Yuborish</div>
    </form>
  </div>
</template>

<script>
export default {}
</script>
