# 📂 SRC Papkasi — To'liq Hujjat

Bu loyiha **Vue.js 3** da yozilgan **Yangiliklar ilovasi**dir. Foydalanuvchi yangilikni ochishi, o'qishi va o'qilganligini bekor qilishi mumkin.

---

## 📁 Fayllar Tuzilmasi

| Fayl | Vazifasi |
|---|---|
| `main.js` | Ilovani ishga tushiruvchi asosiy fayl |
| `App.vue` | Asosiy (root) komponent — barcha mantiq shu yerda |
| `AppNews.vue` | Bitta yangilik kartochkasi komponenti |
| `AppButton.vue` | Qayta ishlatiluvchi tugma komponenti |
| `style.css` | Global CSS stillari |

---

## 1. 📄 `main.js` — Kirish nuqtasi

```js
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')
```

### Nima qiladi?
- `createApp(App)` — Vue ilovasini `App.vue` komponentidan yaratadi
- `.mount('#app')` — Ilovani HTML'dagi `<div id="app">` ga ulaydi
- `import './style.css'` — Global stillarni yuklaydi

---

## 2. 🏠 `App.vue` — Asosiy Komponent

Bu **bosh komponent** bo'lib, barcha ma'lumotlar va asosiy metodlar shu yerda.

### 📌 data() — Ma'lumotlar

```js
data() {
  return {
    openRate: 0,    // Yangilik necha marta ochilgani
    readRate: 0,    // O'qilgan yangiliklar soni
    news: [         // Yangiliklar ro'yxati (massiv)
      {
        id: 1,
        title: 'RealHakaton boshlanishi uchun vaqt?',
        desc: 'Lorem ipsum...',
        isOpen: false,    // Ochiqmi?
        wasRead: false    // O'qilganmi?
      },
      {
        id: 2,
        title: 'Markaziy Bankning Hakatoni haqida',
        desc: 'Lorem ipsum...',
        isOpen: false,
        wasRead: false
      }
    ]
  }
}
```

### 📌 methods — Metodlar

| Metod | Nima qiladi |
|---|---|
| `open()` | `openRate` ni 1 ga oshiradi (yangilik ochilganda) |
| `read(id)` | Yangilikni "o'qilgan" deb belgilaydi, `wasRead = true`, `isOpen = false`, `readRate++` |
| `unmark(id)` | "O'qilgan" belgisini olib tashlaydi, `wasRead = false`, `isOpen = true`, `readRate--` |

### 📌 Template — Shablon

```html
<AppNews v-for="item in news"
  :key="item.id"
  :title="item.title"
  :desc="item.desc"
  :is-open="item.isOpen"
  :was-read="item.wasRead"
  @open-news="open"
  @read-news="read(item.id)"
  @unmark="unmark(item.id)"
/>
```

**Tushuntirish:**
- `v-for="item in news"` — Har bir yangilik uchun `AppNews` komponentini yaratadi
- `:key` — Vue uchun unikal kalit (id bo'yicha)
- `:title`, `:desc`, `:is-open`, `:was-read` — **Props** orqali ma'lumot yuborish (ota → bola)
- `@open-news`, `@read-news`, `@unmark` — **Events** orqali bola komponentdan xabar olish (bola → ota)

---

## 3. 📰 `AppNews.vue` — Yangilik Kartochkasi

Bu komponent **bitta yangilik**ni ko'rsatadi.

### 📌 Props — Tashqaridan keladigan ma'lumotlar

| Prop | Turi | Default | Vazifasi |
|---|---|---|---|
| `title` | String | — | Yangilik sarlavhasi |
| `desc` | String | — | Yangilik matni |
| `isOpen` | Boolean | `false` | Ochiq/yopiq holati |
| `wasRead` | Boolean | `false` | O'qilgan/o'qilmagan holati |

### 📌 data() — Ichki holat

```js
data() {
  return {
    openNews: this.isOpen  // Props'dan olingan qiymatni ichki holatga o'tkazish
  }
}
```

> ⚠️ **Muhim:** Vue'da props'ni to'g'ridan-to'g'ri o'zgartirish **mumkin emas**. Shuning uchun `isOpen` propsini `openNews` ichki data ga ko'chirib olamiz va uni o'zgartiramiz.

### 📌 methods — Metodlar

| Metod | Nima qiladi |
|---|---|
| `open()` | `openNews` ni toggle qiladi (ochiq ↔ yopiq). Agar ochilsa, `open-news` eventini yuboradi |
| `read()` | Avval `open()` ni chaqiradi (yopish uchun), keyin `read-news` eventini yuboradi |

### 📌 watch — Kuzatuvchi

```js
watch: {
  isOpen(value) {
    this.openNews = value
  }
}
```

**Nima uchun kerak?** — Ota komponent `isOpen` propsini o'zgartirganda, ichki `openNews` ham yangilanishi kerak. `watch` bu o'zgarishni kuzatadi.

### 📌 emits — Eventlar

```js
emits: {
  'open-news': null  // Yangilik ochilganda yuboriladi
}
```

Komponent 3 ta event yuboradi:
1. `open-news` — Yangilik ochilganda
2. `read-news` — "Read" tugmasi bosilganda
3. `unmark` — "Bekor qilish" tugmasi bosilganda

### 📌 Template mantiqiy

```
Agar openNews = false:
  [Sarlavha] [Open tugma]

Agar openNews = true:
  [Sarlavha] [Close tugma]
  [Matn ko'rinadi]
  [Read tugma] (faqat o'qilmagan bo'lsa)

Agar wasRead = true:
  [Bekor qilish tugma] ko'rinadi
```

---

## 4. 🔘 `AppButton.vue` — Qayta Ishlatiluvchi Tugma

Bu **universal tugma** komponenti bo'lib, loyihaning istalgan joyida ishlatiladi.

### 📌 Props

| Prop | Turi | Default | Mumkin qiymatlar |
|---|---|---|---|
| `color` | String | `''` | `''`, `'primary'`, `'danger'` |

### 📌 Validator

```js
validator(value) {
  return ['', 'primary', 'danger'].includes(value)
}
```

Faqat ruxsat etilgan qiymatlarni qabul qiladi. Boshqa qiymat berilsa, Vue konsolda **ogohlantirish** ko'rsatadi.

### 📌 Template

```html
<button class="btn" :class="color" @click="$emit('action')">
  <slot/>
</button>
```

- `:class="color"` — Dinamik CSS klass qo'shadi (`primary` yoki `danger`)
- `@click="$emit('action')"` — Bosilganda `action` eventini yuboradi
- `<slot/>` — Ota komponent bergan matnni ko'rsatadi (masalan: "Open", "Read", "Bekor qilish")

---

## 5. 🎨 `style.css` — Global Stillar

| Selektor | Vazifasi |
|---|---|
| `*` | Barcha elementlar uchun `margin: 0`, `padding: 0`, `box-sizing: border-box` |
| `body` | Qorong'i ko'k fon (`#001d3d`) |
| `.container` | Markazlashtirilgan, 50% kenglik, vertikal flex layout |
| `.card` | Oq fon, yumaloq burchaklar, padding bilan kartochka |
| `.btn` | Bazaviy tugma stili (100px kenglik, yumaloq) |
| `.btn.primary` | Yashil chegarali, shaffof fon (`#52b788`) |
| `.btn.danger` | Qizil fon (`#c1121f`), oq matn, 200px kenglik |
| `.btn-card` | Tugmalarni gorizontal joylashtirish |

---

## 🔄 Ma'lumot Oqimi (Data Flow)

```
App.vue (Ota)
  │
  ├── Props bilan ma'lumot yuboradi ──→ AppNews.vue (Bola)
  │     :title, :desc, :is-open, :was-read       │
  │                                                │
  │     ←── Events bilan xabar oladi ─────────────┘
  │     @open-news, @read-news, @unmark
  │
  └── AppNews.vue ichida:
        │
        ├── Props bilan ──→ AppButton.vue (Nabirasi)
        │     :color                    │
        │                               │
        │     ←── @action event ────────┘
        └──
```

**Xulosa:**
- **Props** = Yuqoridan pastga ma'lumot (Ota → Bola)
- **Events ($emit)** = Pastdan yuqoriga xabar (Bola → Ota)

---

## 🧠 O'rganilgan Vue Tushunchalari

| Tushuncha | Fayl | Izoh |
|---|---|---|
| `createApp().mount()` | `main.js` | Ilovani yaratish va DOM ga ulash |
| `data()` | `App.vue`, `AppNews.vue` | Reaktiv ma'lumotlar |
| `methods` | `App.vue`, `AppNews.vue` | Funktsiyalar |
| `props` | `AppNews.vue`, `AppButton.vue` | Ota → Bola ma'lumot uzatish |
| `$emit` | `AppNews.vue`, `AppButton.vue` | Bola → Ota event yuborish |
| `v-for` | `App.vue` | Ro'yxat bo'yicha takrorlash |
| `:key` | `App.vue` | Unikal identifikator |
| `v-if` | `AppNews.vue` | Shartli ko'rsatish |
| `watch` | `AppNews.vue` | Props o'zgarishini kuzatish |
| `validator` | `AppButton.vue` | Props qiymatini tekshirish |
| `<slot/>` | `AppButton.vue` | Dinamik kontent joylash |
| `:class` | `AppButton.vue` | Dinamik CSS klass |
