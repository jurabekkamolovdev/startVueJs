# Vue.js Mixins — O'quv Loyiha

Bu loyiha **Vue.js** da **Mixins** tushunchasini o'rganish uchun yaratilgan.
Mixin — bu bir nechta komponentda takrorlanadigan logikani **bir joyga** yig'ib, keyin istalgan komponentga ulash imkonini beradi.

---

## 📁 Fayl Tuzilishi

```
src/
├── main.js                 — Ilovani yaratish va ishga tushirish
├── App.vue                 — Asosiy komponent (mixin ishlatadi)
├── style.css               — Global stillar
├── mixins/
│   └── alertMixin.js       — Mixin fayli (qayta ishlatiladigan logika)
└── components/
    ├── AppAlert.vue         — Alert (xabar) komponenti
    └── AppBlock.vue         — Alohida blok (mixin ishlatmaydi)
```

---

## 📄 Fayllar Tavsifi

### 1. `main.js` — Ilovani ishga tushirish

```js
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')
```

- `createApp(App)` — Vue ilovasini `App.vue` asosida yaratadi.
- `.mount('#app')` — HTML'dagi `#app` elementiga ulaydi.
- `import './style.css'` — Global stillarni yuklaydi.

---

### 2. `mixins/alertMixin.js` — Mixin (Asosiy mavzu ⭐)

```js
export default {
  data() {
    return {
      isAlertVisible: false
    }
  },
  methods: {
    toggleAlert() {
      this.isAlertVisible = !this.isAlertVisible
    }
  }
}
```

**Nima qiladi:**
- `isAlertVisible` — alert ko'rinadimi yoki yo'qmi, degan holat (state).
- `toggleAlert()` — tugma bosilganda alertni ko'rsatadi yoki yashiradi (`true ↔ false`).

**Nimaga kerak:**
Agar bir nechta komponentda **bir xil** `data` va `methods` kerak bo'lsa, har birida alohida yozish o'rniga, **mixin** ga chiqaramiz va `mixins: [alertMixin]` deb ulaymiz.

---

### 3. `App.vue` — Asosiy komponent (Mixin ishlatadi ✅)

**Template:**
```html
<template>
  <div class="container">
    <AppAlert
      v-if="isAlertVisible"
      title="Xato!"
      text="Habarda xatolik bor"
      type="danger"
      @close="isAlertVisible = false"
    />
    <div class="card">
      <button class="btn" @click="toggleAlert">Habarni ko'rasatish</button>
    </div>
    <AppBlock />
  </div>
</template>
```

**Script:**
```js
import AppAlert from './components/AppAlert.vue'
import AppBlock from './components/AppBlock.vue'
import alertMixin from './mixins/alertMixin.js'

export default {
  mixins: [alertMixin],   // ← Mixin ulandi!
  components: {
    AppAlert,
    AppBlock
  }
}
```

**Qanday ishlaydi:**
1. `mixins: [alertMixin]` — `isAlertVisible` va `toggleAlert()` ni mixin orqali oladi.
2. `data()` va `methods` **komponent ichida yozilmagan**, chunki ular mixindan keladi.
3. Tugma bosilganda → `toggleAlert()` → `isAlertVisible = true` → `AppAlert` ko'rinadi.
4. `AppAlert` dagi "Yopish" tugmasi bosilganda → `@close` eventi → `isAlertVisible = false` → alert yo'qoladi.

---

### 4. `components/AppAlert.vue` — Alert komponenti

```html
<template>
  <div class="alert" :class="type">
    <h2>{{ title }}</h2>
    <h3>{{ text }}</h3>
    <button class="btn" :class="type" @click="$emit('close')">Yopish</button>
  </div>
</template>
```

```js
export default {
  props: {
    title: String,        // Alert sarlavhasi
    text: String,         // Alert matni
    type: {               // Alert turi (danger yoki primary)
      type: String,
      default: 'primary'
    }
  }
}
```

**Qanday ishlaydi:**
- `props` orqali tashqaridan `title`, `text`, `type` qabul qiladi.
- `:class="type"` — `type` qiymatiga qarab CSS klass qo'shadi (`danger` → qizil, `primary` → yashil).
- `$emit('close')` — "Yopish" tugmasi bosilganda ota komponentga signal yuboradi.

---

### 5. `components/AppBlock.vue` — Alohida blok (Mixin ishlatmaydi ❌)

```html
<template>
  <AppAlert
    v-if="isAlertVisible"
    title="Xato!"
    text="Habarda xatolik bor"
    type="danger"
    @close="isAlertVisible = false"
  />
  <div class="card">
    <button class="btn" @click="toggleAlert">Habarni ko'rasatish</button>
  </div>
</template>
```

```js
export default {
  data() {
    return {
      isAlertVisible: false   // ← To'g'ridan-to'g'ri yozilgan
    }
  },
  methods: {
    toggleAlert() {            // ← To'g'ridan-to'g'ri yozilgan
      this.isAlertVisible = !this.isAlertVisible
    }
  },
  components: { AppAlert }
}
```

**Muammo:** Bu komponent `App.vue` bilan **bir xil** logikaga ega, lekin mixin ishlatmagan.
Natijada **kod takrorlanishi (code duplication)** yuzaga kelgan.

**Yechim:** `mixins: [alertMixin]` deb ulasa, `data()` va `methods` ni olib tashlash mumkin edi.

---

### 6. `style.css` — Global stillar

| Klass | Vazifasi |
|---|---|
| `*` | Reset — margin, padding nolga |
| `body` | Qorong'i fon (`#1b263b`) |
| `.container` | Markaziy konteyner (60% kenglik) |
| `.card` | Oq fon, yumaloq burchaklar |
| `.alert` | Xabar bloki, chap tomondan rang chizig'i |
| `.alert.danger` | Qizil chiziq (xato xabari) |
| `.alert.primary` | Yashil chiziq (oddiy xabar) |
| `.btn` | Yashil tugma, yumaloq |
| `.btn:disabled` | O'chirilgan holat (kulrang) |
| `.btn.danger` | Qizil tugma |
| `.form-control` | Forma elementlari uchun stil |

---

## 🔄 Ishlash Jarayoni (Oqim)

```
Foydalanuvchi tugmani bosadi
        ↓
  toggleAlert() ishlaydi
        ↓
  isAlertVisible = true
        ↓
  v-if="isAlertVisible" → AppAlert ko'rinadi
        ↓
  "Yopish" tugmasi bosiladi
        ↓
  $emit('close') → isAlertVisible = false
        ↓
  AppAlert yo'qoladi
```

---

## 📊 Mixin vs To'g'ridan-to'g'ri yozish

| | `App.vue` (Mixin ✅) | `AppBlock.vue` (Mixinsiz ❌) |
|---|---|---|
| `data` qayerda? | `alertMixin.js` da | Komponent ichida |
| `methods` qayerda? | `alertMixin.js` da | Komponent ichida |
| Kod takrorlanishi | Yo'q | Bor |
| Qayta ishlatish | Oson | Qiyin |

---

## ⚠️ Eslatma

Vue 3 da mixinlar o'rniga **Composition API** (`composables`) ishlatish tavsiya etiladi:

```js
// composables/useAlert.js
import { ref } from 'vue'

export function useAlert() {
  const isAlertVisible = ref(false)

  function toggleAlert() {
    isAlertVisible.value = !isAlertVisible.value
  }

  return { isAlertVisible, toggleAlert }
}
```

**Sababi:** Mixin bilan nomlar to'qnashuvi (name collision) muammosi bo'lishi mumkin — ya'ni mixin va komponentda bir xil nomdagi `data` yoki `method` bo'lsa, kutilmagan xatoliklar yuzaga keladi. Composition API da bunday muammo yo'q.
