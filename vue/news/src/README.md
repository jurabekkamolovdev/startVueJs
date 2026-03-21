# 📰 Vue.js News Ilovasi — `src` Papkasi Hujjati

> Bu README `src` papkasidagi barcha kodlarni tushuntiradi. Kelajakda qayta ko'rib chiqish va eslab qolish uchun yozilgan.

---

## 📁 Fayl Tuzilmasi

```
src/
├── main.js           → Ilovaning kirish nuqtasi (entry point)
├── App.vue           → Asosiy (root) komponent
├── AppButton.vue     → Qayta ishlatiladigan tugma komponenti
├── AppNews.vue       → Yangilik kartochkasi komponenti
├── AppTextOne.vue    → Birinchi matn bloki komponenti
├── AppTextTwo.vue    → Ikkinchi matn bloki komponenti
└── style.css         → Global CSS stillari
```

---

## 🔄 Komponentlar Orasidagi Bog'lanish

```
                    ┌─────────────┐
                    │   App.vue   │  ← Asosiy komponent
                    └──────┬──────┘
           ┌───────────────┼───────────────┐
           │               │               │
    ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
    │ AppButton   │ │  AppNews    │ │ AppTextOne  │
    │   .vue      │ │    .vue     │ │ AppTextTwo  │
    └─────────────┘ └──────┬──────┘ └─────────────┘
                           │
                    ┌──────▼──────┐
                    │ AppButton   │  ← AppNews ichida ham ishlatiladi
                    │   .vue      │
                    └─────────────┘
```

---

## 1️⃣ `main.js` — Kirish Nuqtasi

```js
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')
```

### Nima qiladi?
| Qator | Tushuntirish |
|-------|-------------|
| `import { createApp } from 'vue'` | Vue kutubxonasidan `createApp` funksiyasini chaqiradi |
| `import App from './App.vue'` | Asosiy `App` komponentini import qiladi |
| `import './style.css'` | Global CSS faylini ulaydi |
| `createApp(App).mount('#app')` | Vue ilovasini yaratadi va HTMLdagi `#app` elementiga o'rnatadi |

> 💡 **Eslab qol:** `main.js` — ilovaning **birinchi ishga tushadigan** fayli. U `App.vue` ni olib, ekranga chiqaradi.

---

## 2️⃣ `App.vue` — Asosiy Komponent

Bu faylda **barcha boshqa komponentlar** birlashtirilib boshqariladi.

### 📌 Template (HTML qismi)

```html
<h1>Eng so'ngi yangiliklar - {{ now }}</h1>
<h2>Ochilgan yangiliklar soni: {{ openRate }} | O'qilganlar soni: {{ readRate }}</h2>
```

- `{{ now }}` — bugungi sanani ko'rsatadi
- `{{ openRate }}` — nechta yangilik ochilganini hisoblaydi
- `{{ readRate }}` — nechta yangilik o'qilganini hisoblaydi

### 📌 Dinamik Komponent (Dynamic Component)

```html
<KeepAlive>
  <component :is="componentName"></component>
</KeepAlive>
```

| Tushuncha | Tushuntirish |
|-----------|-------------|
| `<component :is="...">` | Vue'da **dinamik komponent** — qaysi komponent ko'rsatilishi `componentName` qiymatiga bog'liq |
| `<KeepAlive>` | Komponent almashtirilganda **holatni saqlaydi** (masalan, inputdagi yozilgan matn yo'qolmaydi) |

> 💡 **Eslab qol:** `KeepAlive` — komponent o'chirilganda uni **yo'q qilmaydi**, balki **xotirada saqlaydi**. Qaytib kelganda avvalgi holat saqlanib qoladi.

### 📌 Yangiliklar ro'yxati

```html
<AppNews
  v-for="item in news"
  :key="item.id"
  :title="item.title"
  :desc="item.desc"
  :is-open="item.isOpen"
  :is-read="item.isRead"
  @news-open="open"
  @news-read="read(item.id)"
  @unmark="unmark()"
></AppNews>
```

| Atribut | Nima uchun |
|---------|-----------|
| `v-for="item in news"` | `news` massivi bo'ylab **har bir yangilik uchun** `AppNews` yaratadi |
| `:key="item.id"` | Har bir elementga **noyob kalit** beradi (Vue bunga qarab elementlarni farqlaydi) |
| `:title`, `:desc` | Ota komponentdan bolaga **ma'lumot uzatish** (props) |
| `@news-open` | Bola komponentdan ota komponentga **signal yuborish** (event/$emit) |

### 📌 Data (Ma'lumotlar)

```js
data() {
  return {
    active: 'one',        // Hozir qaysi tab tanlangan
    now: new Date().toLocaleDateString(),  // Bugungi sana
    openRate: 0,           // Ochilgan yangiliklar soni
    readRate: 0,           // O'qilgan yangiliklar soni
    news: [                // Yangiliklar massivi
      { id: 1, title: '...', desc: '...', isOpen: false, isRead: false },
      { id: 2, title: '...', desc: '...', isOpen: false, isRead: false }
    ]
  }
}
```

> 💡 **Eslab qol:** `data()` — komponentning **o'zgaruvchan holati**. Bu qiymatlar o'zgarganda, ekrandagi ko'rinish **avtomatik yangilanadi** (reactivity).

### 📌 Methods (Usullar)

```js
methods: {
  open() {
    this.openRate++     // Yangilik ochilganda hisoblagichni oshiradi
  },
  read(id) {
    const item = this.news.find((item) => item.id === id)
    item.isRead = true  // Yangilikni "o'qilgan" deb belgilaydi
    this.readRate++
  },
  unmark() {
    this.readRate--     // "O'qilgan" belgisini olib tashlaydi
  }
}
```

### 📌 Computed (Hisoblangan xususiyatlar)

```js
computed: {
  componentName() {
    return this.active === 'one' ? 'AppTextOne' : 'AppTextTwo'
  },
  oneColor() {
    return this.active === 'one' ? 'primary' : ''
  },
  twoColor() {
    return this.active === 'two' ? 'primary' : ''
  }
}
```

| Computed | Nima qiladi |
|----------|------------|
| `componentName` | `active` qiymatiga qarab **qaysi komponentni ko'rsatishni** aniqlaydi |
| `oneColor` | "One" tugmasi **faol bo'lsa** yashil rang beradi |
| `twoColor` | "Two" tugmasi **faol bo'lsa** yashil rang beradi |

> 💡 **Eslab qol:** `computed` — `data`ga bog'liq bo'lgan **hisoblangan qiymat**. `data` o'zgarganda `computed` ham avtomatik qayta hisoblanadi. `methods`dan farqi — `computed` **keshlanadi** (cache), ya'ni keraksiz qayta-qayta ishlamaydi.

---

## 3️⃣ `AppButton.vue` — Tugma Komponenti

```html
<template>
  <button class="btn" :class="color" @click="$emit('action')">
    <slot />
  </button>
</template>
```

```js
props: {
  color: {
    type: String,
    default: '',
    validator(value) {
      return ['', 'primary', 'danger'].includes(value)
    }
  }
}
```

### Asosiy Tushunchalar

| Tushuncha | Tushuntirish |
|-----------|-------------|
| `props` | Ota komponentdan **tashqaridan** keladigan ma'lumot |
| `color` prop | Tugma rangini belgilaydi: `''` (oddiy), `'primary'` (yashil), `'danger'` (qizil) |
| `validator` | Faqat ruxsat etilgan qiymatlarni qabul qiladi — noto'g'ri qiymatda konsolda **ogohlantirish** chiqadi |
| `$emit('action')` | Tugma bosilganda ota komponentga **"action"** signalini yuboradi |
| `<slot />` | Tugma ichidagi **matnni** ota komponent belgilaydi (masalan: `<AppButton>One</AppButton>`) |

> 💡 **Eslab qol:** `<slot />` — ota komponent bola komponent ichiga **kontent yuborish** imkonini beradi. `<AppButton>Matn</AppButton>` — "Matn" so'zi `<slot />` o'rniga tushadi.

---

## 4️⃣ `AppNews.vue` — Yangilik Kartochkasi

Bu komponent **har bir yangilikni** alohida ko'rsatadi.

### Qanday ishlaydi?

```
┌─────────────────────────────────────┐
│ 📰 Yangilik sarlavhasi             │
│ [Open]  [Qayta o'qish]             │  ← tugmalar
│                                     │
│ (ochilganda):                       │
│ Lorem ipsum dolor sit amet...       │
│ [Read]                              │  ← faqat o'qilmagan bo'lsa ko'rinadi
└─────────────────────────────────────┘
```

### Props (Tashqaridan keladigan ma'lumotlar)

```js
props: {
  title: { type: String },       // Yangilik sarlavhasi
  desc: { type: String },        // Yangilik matni
  isOpen: { type: Boolean, default: false },  // Ochiqmi?
  isRead: { type: Boolean, default: false }   // O'qilganmi?
}
```

### Data (Ichki holat)

```js
data() {
  return {
    isNewsOpen: this.isOpen,   // props dan nusxa oladi
    isNewsRead: this.isRead    // props dan nusxa oladi
  }
}
```

> ⚠️ **Muhim:** Vue'da propsni **to'g'ridan-to'g'ri o'zgartirish mumkin emas**. Shuning uchun `props` qiymati `data`ga ko'chiriladi va `data` orqali boshqariladi.

### Methods (Usullar)

| Metod | Nima qiladi |
|-------|------------|
| `open()` | Yangilikni **ochadi/yopadi** (`isNewsOpen` ni teskari qiladi). Agar ochilsa, `news-open` signalini yuboradi |
| `read()` | Yangilikni **o'qilgan** deb belgilaydi va yopadi. `news-read` signalini yuboradi |
| `unmark()` | **O'qilgan** belgisini olib tashlaydi. `unmark` signalini yuboradi |

### Shartli Ko'rsatish (v-if)

```html
<AppButton v-if="isNewsRead" color="danger" @action="unmark">Qayta o'qish</AppButton>
```

- `v-if="isNewsRead"` — faqat yangilik **o'qilgan bo'lsa** "Qayta o'qish" tugmasi ko'rinadi
- `v-if="!isNewsRead"` — faqat yangilik **hali o'qilmagan bo'lsa** "Read" tugmasi ko'rinadi

> 💡 **Eslab qol:** `$emit` — bola komponentdan ota komponentga **signal yuborish** usuli. Ota komponent `@signal-nomi="metod"` bilan ushbu signalni tinglaydi.

---

## 5️⃣ `AppTextOne.vue` va `AppTextTwo.vue` — Matn Bloklari

Bu ikki komponent **dinamik komponent** sifatida `App.vue` ichida almashtiriladi.

### `AppTextOne.vue`
```html
<div class="card">
  <h2>Text number One</h2>
  <hr />
  <p>Lorem ipsum dolor sit amet...</p>
  <div class="form-control">
    <input type="text">   ← KeepAlive tufayli matn saqlanadi!
  </div>
</div>
```

### `AppTextTwo.vue`
```html
<div class="card">
  <h2>Text number Two</h2>
  <hr />
  <p>Lorem ipsum dolor sit amet...</p>
</div>
```

> 💡 **Eslab qol:** `AppTextOne` ichida `<input>` bor. `<KeepAlive>` yordamida inputga yozilgan matn komponent almashtirilganda **yo'qolmaydi**. Agar `KeepAlive` bo'lmasa, har gal "One" tugmasini bosganda inputdagi matn **qaytadan bo'sh** bo'ladi.

---

## 6️⃣ `style.css` — Global Stillar

### Ranglar Palitrasi 🎨

| Rang | Hex Kodi | Qayerda ishlatiladi |
|------|----------|-------------------|
| 🔵 Qorong'i ko'k | `#1b263b` | Sahifa fon rangi (`body`) |
| 🟢 Yashil | `#40916c` | Tugmalar, focus holati |
| 🔴 Qizil | `#c1121f` | Danger (xavfli) tugma |
| ⚪ Oq | `white` | Card fon rangi |

### Asosiy Stillar

```css
* { margin: 0; padding: 0; box-sizing: border-box; }  /* Global reset */

body { background-color: #1b263b; }   /* Qorong'i fon */

.container {
  width: 50%;          /* Ekranning yarmi */
  margin: 0 auto;      /* Markazga joylash */
  display: flex;
  flex-direction: column;
  gap: 20px;            /* Kartochkalar orasidagi bo'shliq */
}

.card {
  padding: 40px;
  border-radius: 10px;  /* Yumaloq burchaklar */
  background-color: white;
}

.btn {
  width: 120px;
  border-radius: 50px;  /* To'liq yumaloq tugma */
  cursor: pointer;
}

.btn.primary { background-color: #40916c; color: white; }   /* Faol tugma */
.btn.danger  { background-color: #c1121f; color: white; }   /* Xavfli tugma */
```

---

## 🧠 Vue.js Tushunchalari Xulosa

| Tushuncha | Qisqacha | Misol |
|-----------|---------|-------|
| **data()** | Komponentning o'zgaruvchan holati | `openRate: 0` |
| **props** | Ota → Bola ma'lumot uzatish | `:title="item.title"` |
| **$emit** | Bola → Ota signal yuborish | `$emit('news-open')` |
| **computed** | Keshlanadigan hisoblangan qiymat | `componentName()` |
| **methods** | Oddiy funksiyalar | `open()`, `read()` |
| **v-for** | Ro'yxat bo'ylab takrorlash | `v-for="item in news"` |
| **v-if** | Shartli ko'rsatish | `v-if="isNewsRead"` |
| **:key** | v-for elementiga noyob kalit | `:key="item.id"` |
| **slot** | Bola ichiga kontent yuborish | `<slot />` |
| **KeepAlive** | Komponent holatini saqlash | `<KeepAlive>` |
| **Dynamic Component** | Komponentni dinamik almashtirish | `<component :is="...">` |

---

## 🔁 Ma'lumot Oqimi Diagrammasi

```
  Ota (App.vue)                         Bola (AppNews.vue)
  ─────────────                         ──────────────────
       │                                       │
       │── :title, :desc (props) ────────────▶ │
       │── :is-open, :is-read (props) ───────▶ │
       │                                       │
       │◀── @news-open ($emit) ────────────────│  ← Yangilik ochildi
       │◀── @news-read ($emit) ────────────────│  ← Yangilik o'qildi
       │◀── @unmark ($emit) ──────────────────│  ← Belgi olib tashlandi
       │                                       │
       │                Bola (AppButton.vue)
       │                ───────────────────
       │── :color (prop) ────────────────────▶ │
       │◀── @action ($emit) ──────────────────│  ← Tugma bosildi
```

> 💡 **Yakuniy Eslatma:** Vue.js'da ma'lumot **yuqoridan pastga** (props), signallar esa **pastdan yuqoriga** ($emit) harakatlanadi. Bu **bir tomonlama ma'lumot oqimi** (one-way data flow) deyiladi.
