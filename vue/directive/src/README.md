# 📘 Vue.js Custom Directives (O'zbekcha)

Bu loyiha **Vue.js da Custom Directives** (maxsus direktivalar) mavzusini o'rganish uchun yaratilgan.

---

## 📁 Fayl tuzilmasi

```
src/
├── App.vue                      # Asosiy komponent
├── main.js                      # Vue ilovasini yaratish va mount qilish
├── style.css                    # Global CSS stillar
├── README.md                    # Shu fayl — tushuntirish
└── directives/
    ├── focusDirective.js         # v-focus — avtomatik fokus direktivasi
    └── colorDirective.js         # v-color — rang o'zgartirish direktivasi
```

---

## 🧠 Mavzu: Custom Directives nima?

Vue.js da **directive** — bu DOM elementlariga maxsus xatti-harakat (behavior) qo'shish uchun ishlatiladigan vosita.  
Vue o'zi bilan birga tayyor direktivalar beradi: `v-if`, `v-for`, `v-model`, `v-bind` va hokazo.

Lekin ba'zan o'zimiz **shaxsiy (custom) direktiva** yaratishimiz kerak bo'ladi. Masalan:
- Sahifa yuklanganda `input`ga avtomatik fokus qo'yish
- Matn rangini dinamik o'zgartirish
- Elementga maxsus animatsiya qo'shish

Custom direktiva **Vue component emas**, balki **DOM bilan to'g'ridan-to'g'ri ishlaydigan past darajali (low-level) vosita**.

---

## 📄 Fayllar tushuntirishi

### 1. `main.js` — Ilovani ishga tushirish

```js
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')
```

- `createApp(App)` — Vue ilovasini `App.vue` komponentidan yaratadi.
- `.mount('#app')` — Uni `index.html` dagi `#app` elementiga ulaydi.
- `import './style.css'` — Global stillarni yuklaydi.

---

### 2. `directives/focusDirective.js` — `v-focus` direktivasi

```js
export default {
  mounted(el) {
    el.focus()
  }
}
```

**Nima qiladi?**  
Element DOM ga qo'shilganda (`mounted` hook), avtomatik ravishda **fokus** qo'yadi.

**Qayerda ishlatilgan?**  
`App.vue` da `<input v-focus />` ko'rinishida — sahifa ochilganda kursor avtomatik inputga tushadi.

**Lifecycle hook:**
| Hook | Qachon ishlaydi |
|------|-----------------|
| `mounted` | Element DOM ga birinchi marta qo'shilganda |

---

### 3. `directives/colorDirective.js` — `v-color` direktivasi

Bu direktiva ancha murakkab — **modifierlar** va **lifecycle hooklar** bilan ishlaydi.

```js
let intervalId

const mouseover = event => {
  event.target.style.color = 'black'
}

const mouseout = event => {
  event.target.style.color = 'white'
}

export default {
  mounted(el, binding) {
    el.style.color = binding.value

    if (binding.modifiers.blink) {
      let flag = true
      intervalId = setInterval(() => {
        el.style.color = flag ? 'white' : binding.value
        flag = !flag
      }, 1000)
    }

    if (binding.modifiers.hover) {
      el.addEventListener('mouseover', mouseover)
      el.addEventListener('mouseout', mouseout)
    }
  },

  updated(el, binding) {
    el.style.color = binding.value
  },

  unmounted(el, binding) {
    clearInterval(intervalId)
    el.removeEventListener('mouseover', mouseover)
    el.removeEventListener('mouseout', mouseout)
  }
}
```

#### 🔍 Batafsil tushuntirish:

**`binding` obyekti nima?**  
Har bir custom direktivaga Vue avtomatik `binding` obyektini beradi:

| Xususiyat | Ma'nosi | Misol |
|-----------|---------|-------|
| `binding.value` | Direktivaga berilgan qiymat | `v-color="color"` → `color` o'zgaruvchisining qiymati (`'red'`) |
| `binding.modifiers` | Nuqta bilan qo'shilgan modifikatorlar | `v-color.blink.hover` → `{ blink: true, hover: true }` |

#### 📌 `mounted` hook — element DOM ga qo'shilganda:
1. **Rangni o'rnatish:** `el.style.color = binding.value` — matn rangini berilgan rangga o'zgartiradi.
2. **`.blink` modifieri:** Agar `.blink` yoqilgan bo'lsa — har 1 soniyada matn rangi **oq** va **berilgan rang** o'rtasida almashib turadi (miltillash effekti).
3. **`.hover` modifieri:** Agar `.hover` yoqilgan bo'lsa — sichqoncha ustiga kelganda rang **qora** ga, ketganda **oq** ga o'zgaradi.

#### 📌 `updated` hook — `binding.value` o'zgarganda:
- Masalan, tugma bosilganda rang `'red'` dan `'blue'` ga o'zgarsa — bu hook matn rangini yangilaydi.

#### 📌 `unmounted` hook — element DOM dan olib tashlanganda:
- `setInterval` ni to'xtatadi (xotira oqishini oldini oladi).
- `mouseover` va `mouseout` event listenerlarini olib tashlaydi.

---

### 4. `App.vue` — Asosiy komponent

```html
<template>
  <div class="container">
    <div class="card">
      <h1 v-color.blink.hover="color">Formani to'ldiring!</h1>
      <form class="form-control">
        <label for="name">Ismingiz nima?</label>
        <input v-focus type="text" id="name" />
      </form>

      <button class="btn" @click="color = 'blue'">Rangni o'zgartirish</button>
    </div>
  </div>
</template>

<script>
import focusDirective from './directives/focusDirective.js'
import colorDirective from './directives/colorDirective.js'

export default {
  data() {
    return {
      color: 'red'
    }
  },

  directives: {
    focus: focusDirective,
    color: colorDirective
  }
}
</script>
```

#### 🔍 Nima bo'lyapti?

1. **`v-focus`** — `<input>` elementiga qo'yilgan, sahifa ochilganda kursor shu yerga tushadi.
2. **`v-color.blink.hover="color"`** — `<h1>` elementiga qo'yilgan:
   - Dastlab rang `'red'` (data dan keladi)
   - `.blink` — har sekundda miltillaydi
   - `.hover` — sichqoncha ustiga kelsa rang o'zgaradi
   - `="color"` — `data()` dagi `color` o'zgaruvchisidan qiymat oladi
3. **Tugma** — bosilganda `color` ni `'blue'` ga o'zgartiradi → `v-color` direktivasining `updated` hooki ishlaydi va rang yangilanadi.
4. **`directives`** — komponent ichida **lokal** directive sifatida ro'yxatdan o'tkazilgan:
   ```js
   directives: {
     focus: focusDirective,
     color: colorDirective
   }
   ```

---

### 5. `style.css` — Global stillar

- **Reset:** `*` selektori bilan `margin`, `padding`, `box-sizing` tozalangan.
- **Body:** `background-color: #1d3557` (to'q ko'k rang).
- **`.container`** — markazlashtirilgan, `flexbox` layout.
- **`.card`** — oq fon, `border-radius`, padding — karta ko'rinishidagi blok.
- **`.btn`** — yashil tugma (`#52b788`), rounded, hover va active holatlar.
- **`.btn.primary`** — shaffof fon bilan outlined tugma.
- **`.btn.danger`** — qizil rang tugma (danger action uchun).
- **`.form-control`** — form elementlari uchun layout (label va input).

---

## 🧩 Asosiy tushunchalar xulosa

| Tushuncha | Tushuntirish |
|-----------|-------------|
| **Custom Directive** | DOM elementga maxsus xatti-harakat qo'shish |
| **`mounted` hook** | Element DOM ga qo'shilganda ishlaydi |
| **`updated` hook** | Binding qiymati o'zgarganda ishlaydi |
| **`unmounted` hook** | Element DOM dan olib tashlanganda ishlaydi |
| **`binding.value`** | Direktivaga uzatilgan qiymat |
| **`binding.modifiers`** | Direktivaga nuqta bilan qo'shilgan modifikatorlar |
| **Lokal directive** | Faqat bitta komponent ichida ishlaydigan direktiva |
| **Global directive** | `app.directive()` orqali butun ilova uchun ro'yxatdan o'tkazilgan direktiva |

---

## 💡 Global vs Lokal directive

Bu loyihada direktivalar **lokal** tarzda ishlatilgan (komponent ichida `directives` opsiyasi orqali).

Agar **global** qilmoqchi bo'lsangiz, `main.js` da shunday yozasiz:

```js
import { createApp } from 'vue'
import App from './App.vue'
import focusDirective from './directives/focusDirective.js'

const app = createApp(App)
app.directive('focus', focusDirective) // Global
app.mount('#app')
```

Bu holda `v-focus` ni istalgan komponentda ishlatish mumkin, uni qayta import qilmasdan.

---

## ✅ Xulosa

Bu loyihada:
1. ✅ **Custom directive** yaratish o'rganilgan (`focusDirective`, `colorDirective`)
2. ✅ **Lifecycle hooklar** ishlatilgan (`mounted`, `updated`, `unmounted`)
3. ✅ **`binding.value`** orqali direktivaga qiymat uzatish
4. ✅ **`binding.modifiers`** orqali modifikatorlar bilan ishlash (`.blink`, `.hover`)
5. ✅ **Event listener** qo'shish va olib tashlash (`mouseover`, `mouseout`)
6. ✅ **setInterval** bilan animatsiya va uni tozalash
7. ✅ Direktivalarni **lokal** tarzda ro'yxatdan o'tkazish
