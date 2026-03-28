# 📡 Vue 3 — Teleport

## 📌 Loyiha haqida

Bu loyiha **Vue 3** ning `<Teleport>` komponenti qanday ishlashini o'rganishga bag'ishlangan. Teleport — bu Vue komponentini DOM daraxtining boshqa joyiga "ko'chirish" (teleportatsiya qilish) imkonini beruvchi maxsus Vue 3 komponenti.

---

## 📁 Loyiha tuzilishi (`src/` papkasi)

```
src/
├── App.vue                  # Asosiy komponent (ota komponent)
├── main.js                  # Ilovani ishga tushiruvchi fayl
├── style.css                # Global stillar
└── components/
    └── AppModal.vue          # Modal oyna komponenti
```

---

## 📄 Fayllarning batafsil tushuntirmasi

---

### 1. `main.js` — Ilovani ishga tushirish

```js
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')
```

**Nima qiladi:**
- `createApp(App)` — Vue ilovasini yaratadi, `App.vue` ni asosiy (root) komponent qilib beradi.
- `.mount('#app')` — Ilovani `index.html` dagi `<div id="app">` elementiga ulaydi (render qiladi).
- `import './style.css'` — Global CSS faylni yuklab, butun ilovaga qo'llaydi.

---

### 2. `App.vue` — Asosiy komponent

Bu fayl loyihaning **asosiy** komponenti bo'lib, 3 ta qismdan iborat: `<template>`, `<script>`, `<style>`.

#### 🟢 `<template>` qismi (HTML):

```html
<template>
  <div class="container">
    <div class="card">
      <h1>Modal</h1>
      <button class="btn" @click="isModalVisible = true">Open Modal</button>

      <!-- 1-usul: Teleportsiz (oddiy) -->
      <AppModal
        v-if="isModalVisible"
        @close="isModalVisible = false"
      ></AppModal>

      <!-- 2-usul: Teleport bilan body ga ko'chirish (kommentda) -->
      <!-- <Teleport to="body">
        <AppModal
          v-if="isModalVisible"
          @close="isModalVisible = false"
        ></AppModal>
      </Teleport> -->

      <!-- 3-usul: Teleport bilan #modal elementga ko'chirish (kommentda) -->
      <!-- <Teleport to="#modal">
        <AppModal
          v-if="isModalVisible"
          @close="isModalVisible = false"
        ></AppModal>
      </Teleport> -->
    </div>
  </div>
</template>
```

**Tushuntirish:**

| # | Usul | Tavsif |
|---|------|--------|
| 1 | **Teleportsiz** | `AppModal` komponenti `card` div ichida render bo'ladi. Bu oddiy usul — modal ota element ichida qoladi. |
| 2 | **`<Teleport to="body">`** | Modal `<body>` tagining eng oxiriga ko'chiriladi. Bu CSS z-index va overflow muammolarini hal qiladi. |
| 3 | **`<Teleport to="#modal">`** | Modal `index.html` dagi `<div id="modal">` elementiga ko'chiriladi. Bu aniq joy belgilash usuli. |

> ⚡ **Muhim:** Hozirgi kodda faqat 1-usul (teleportsiz) faol. 2 va 3-usullarni sinash uchun kommentni olib tashlang.

#### 🟡 `<script>` qismi (JavaScript logika):

```js
import AppModal from './components/AppModal.vue'

export default {
  data() {
    return {
      isModalVisible: false    // Modal ko'rinadi yoki ko'rinmaydi
    }
  },
  components: {
    AppModal                   // AppModal komponentini ro'yxatdan o'tkazish
  }
}
```

**Tushuntirish:**
- `isModalVisible` — `false` bo'lsa modal yashirin, `true` bo'lsa modal ko'rinadi.
- `@click="isModalVisible = true"` — Tugma bosilganda modal ochiladi.
- `@close="isModalVisible = false"` — `AppModal` ichidan `close` event kelganda modal yopiladi.

---

### 3. `components/AppModal.vue` — Modal oyna komponenti

```html
<template>
  <div class="backdrop" @click.self="$emit('close')">
    <div class="modal">
      <h1>Hello</h1>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['close']
}
</script>
```

**Tushuntirish:**

- **`backdrop`** — Qoraytirilgan fon (overlay). Modal oynaning orqasida turadi.
- **`@click.self`** — Faqat `backdrop` o'ziga bosilganda ishlaydi (modal ichiga bosilganda ishlamaydi). Bu `.self` modifikatorining kuchi.
- **`$emit('close')`** — Ota komponentga (`App.vue`) `close` eventini yuboradi → modal yopiladi.
- **`emits: ['close']`** — Bu komponent qanday eventlar chiqarishini aniq e'lon qiladi (Vue 3 best practice).
- **`<div class="modal">`** — Modal oynaning o'zi, ichida `<h1>Hello</h1>` matni bor.

---

### 4. `style.css` — Global stillar

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```
> 🎨 **Reset** — barcha elementlarning default margin/padding ni olib tashlaydi.

```css
body {
  background-color: #1d3557;   /* Qorong'i ko'k fon */
}
```

```css
.container {
  width: 60%;
  margin: 0 auto;             /* Markazga joylash */
  margin-top: 5px;
  display: flex;
  gap: 10px;
  flex-direction: column;
}
```

```css
.card {
  background-color: white;
  border-radius: 10px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
```
> 🃏 Oq rangli karta — asosiy content shu ichida turadi.

```css
.btn {
  width: 150px;
  padding: 10px;
  border: none;
  background-color: #52b788;   /* Yashil rang */
  color: white;
  cursor: pointer;
  border-radius: 50px;         /* To'liq yumaloq burchak */
  font-size: 15px;
  transition: all 0.5s;        /* Silliq o'tish animatsiyasi */
}
```

```css
.btn.primary {                  /* Shaffof yashil tugma */
  background-color: transparent;
  border: 1px solid #52b788;
  color: #52b788;
}

.btn.danger {                   /* Qizil xavf tugmasi */
  width: 200px;
  background-color: #c1121f;
  color: white;
}
```

```css
.backdrop {
  position: fixed;
  inset: 0;                    /* top/right/bottom/left = 0 */
  background-color: rgba(0, 0, 0, 0.5);  /* Yarim shaffof qora */
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
```
> 🌑 **Backdrop** — butun ekranni qoplaydigan yarim shaffof qora fon.

```css
.modal {
  background: white;
  border-radius: 12px;
  padding: 35px;
  width: 360px;
  margin-top: 100px;           /* Tepadan 100px pastga */
  position: relative;
}
```
> 📦 **Modal** — oq rangli oyna, ekranning yuqori-markazida ko'rinadi.

---

## 🧠 Teleport nima va nima uchun kerak?

### Muammo:
Oddiy holatda modal `card` div ichida render bo'ladi. Lekin modal butun ekranni qoplashi kerak. Agar ota elementda `overflow: hidden` yoki `position: relative` bo'lsa, modal to'g'ri ko'rinmasligi mumkin.

### Yechim — `<Teleport>`:
```html
<Teleport to="body">
  <AppModal />
</Teleport>
```

`<Teleport>` komponenti Vue 3 da mavjud. U **komponentni DOM ning boshqa joyiga** jismonan ko'chiradi, lekin **Vue komponent daraxti (component tree)** da ota-bola munosabati saqlanib qoladi.

### Asosiy xususiyatlari:

| Xususiyat | Tavsif |
|-----------|--------|
| `to="body"` | Komponentni `<body>` tagiga ko'chiradi |
| `to="#modal"` | Komponentni `id="modal"` elementiga ko'chiradi |
| `to=".my-class"` | Komponentni CSS selektor orqali topilgan elementga ko'chiradi |
| Vue reaktivlik | Teleport ichidagi komponent hali ham ota komponentdan `props` va `events` ni oladi |

### Qachon ishlatiladi?

- ✅ **Modal oynalar** — z-index va overflow muammolarini oldini olish uchun
- ✅ **Tooltip / Popup** — ota elementdan tashqariga chiqarish uchun
- ✅ **Notification** — ekranning burchagida ko'rsatish uchun
- ✅ **Fullscreen komponentlar** — butun ekranni egallashi kerak bo'lgan UI

---

## 🚀 Loyihani ishga tushirish

```bash
# Dependencylarni o'rnatish
npm install

# Dev serverini ishga tushirish
npm run serve

# Production uchun build
npm run build
```

---

## 📝 Xulosa

Bu loyihada **Vue 3 Teleport** tushunchasi amaliy misolda ko'rsatilgan:

1. `App.vue` — modal ochish/yopish logikasi bor ota komponent
2. `AppModal.vue` — oddiy modal oyna komponenti (backdrop + modal)
3. 3 xil usul ko'rsatilgan: **teleportsiz**, **`<Teleport to="body">`**, **`<Teleport to="#modal">`**
4. `style.css` — modal, backdrop, tugma va kartalar uchun global stillar

> 💡 Teleport — bu **DOM joyini** o'zgartiradi, lekin **Vue komponent munosabatlarini** o'zgartirmaydi. Shuning uchun `props`, `events`, va boshqa Vue xususiyatlari odatdagidek ishlayveradi.
