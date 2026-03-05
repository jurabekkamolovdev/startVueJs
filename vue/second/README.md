# 🟢 Vue.js 3 — Asosiy Tushunchalar

> Bu loyiha **Vue.js 3** ning asosiy tushunchalarini o'rganish uchun yaratilgan.
> Quyida har bir tushuncha batafsil tushuntirilgan — takrorlash va mustahkamlash uchun foydali!

---

## 📁 Loyiha Tuzilishi

```
second/
├── index.html   ← Asosiy HTML fayl (Vue template)
├── app.js       ← Vue ilovasi (JavaScript logika)
├── style.css    ← Dizayn (CSS)
└── README.md    ← Hujjat (shu fayl)
```

---

## 🚀 Vue 3 ni CDN Orqali Ulash

Vue.js ni hech narsa o'rnatmasdan, faqat bitta `<script>` teg bilan ishlatish mumkin:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

> 💡 Bu usul **CDN (Content Delivery Network)** deyiladi — internetdan tayyor kutubxonani yuklab oladi.

---

## 🏗️ `Vue.createApp()` — Ilova Yaratish

Vue ilovasini yaratish uchun `Vue.createApp()` funksiyasi ishlatiladi:

```javascript
Vue.createApp({
    // bu yerga data, methods va boshqalar yoziladi
}).mount('#app')
```

| Qism | Vazifasi |
|------|----------|
| `Vue.createApp({...})` | Yangi Vue ilovasi yaratadi |
| `.mount('#app')` | Ilovani HTML dagi `id="app"` elementiga ulaydi |

> 📌 `.mount('#app')` — Vue ilovasini qaysi HTML element ichida ishlashini ko'rsatadi. HTML da `<div id="app">` bo'lishi kerak.

---

## 📦 `data()` — Reaktiv Ma'lumotlar

`data()` — Vue ichidagi **o'zgaruvchilar**ni e'lon qiladigan maxsus funksiya:

```javascript
data() {
    return {
        title: 'Hello, Vue!',
        items: [1, 2, 3, 4, 5, 6],
    }
}
```

### ⚡ Reaktivlik nima?

`data()` ichidagi ma'lumot o'zgarganda, **sahifa avtomatik yangilanadi** — buni qo'lda qilish shart emas!

```
title o'zgarsa → <h1> tegi avtomatik yangilanadi
items o'zgarsa → <li> ro'yxati avtomatik yangilanadi
```

| Xususiyat | Turi | Tavsifi |
|-----------|------|---------|
| `title` | `String` | Sahifa sarlavhasi — `<h1>` da ko'rinadi |
| `items` | `Array` | Ro'yxat elementlari — `<li>` larda ko'rinadi |

> 🔑 **Qoida:** `data()` har doim **funksiya** bo'lishi va **obyekt qaytarishi** kerak (`return {}`).

---

## 🛠️ `methods` — Metodlar (Funksiyalar)

`methods` — Vue ichida funksiyalar yozish uchun ishlatiladi:

```javascript
methods: {
    addItem() {
        this.items.push(this.$refs.inputValue.value)
        this.$refs.inputValue.value = ''
    }
}
```

### `this` kalit so'zi

`methods` ichida `this` orqali `data()` dagi ma'lumotlarga murojaat qilish mumkin:

```javascript
this.items      // → data() dagi items massiviga kirish
this.title      // → data() dagi title ga kirish
this.$refs      // → HTML elementlarga to'g'ridan-to'g'ri kirish
```

> 🧠 **Eslab qoling:** `methods` ichidagi funksiyalarni HTML da `v-on` yoki `@` orqali chaqirish mumkin.

---

## 🏷️ `v-text` — Matn Ko'rsatish Direktivasi

`v-text` — element ichidagi barcha matnni o'zgartiradi:

```html
<h1 v-text="title"></h1>
```

Bu quyidagiga teng:

```html
<h1>{{ title }}</h1>
```

| Farqi | `v-text` | `{{ }}` (Interpolation) |
|-------|----------|------------------------|
| Ishlatish | Butun matnni almashtiradi | Matn ichiga qo'shadi |
| Misol | `<h1 v-text="title"></h1>` | `<h1>{{ title }}</h1>` |
| Aralash matn | ❌ Mumkin emas | ✅ `Salom, {{ name }}!` |

> 💡 Agar element ichida boshqa matn bilan aralashtirmoqchi bo'lsangiz, `{{ }}` ishlating.

---

## 🔁 `v-for` — Ro'yxat Ko'rsatish (Loop)

`v-for` — massiv yoki obyekt bo'ylab aylanib, har bir element uchun HTML yaratadi:

```html
<li v-for="(item, index) in items" v-bind:key="item">
    <h2>{{ item }}</h2>
</li>
```

### Sintaksis tushuntirish:

```
v-for="(item, index) in items"
         │       │         │
         │       │         └── data() dagi massiv nomi
         │       └──────────── har bir elementning tartib raqami (0, 1, 2, ...)
         └──────────────────── har bir elementning qiymati
```

### Misol:

Agar `items = [1, 2, 3]` bo'lsa:

| `index` | `item` | Natija |
|---------|--------|--------|
| 0 | 1 | `<h2>1</h2>` |
| 1 | 2 | `<h2>2</h2>` |
| 2 | 3 | `<h2>3</h2>` |

> ⚠️ **Muhim:** `v-for` ishlatganda har doim `v-bind:key` qo'shish kerak — bu Vue ga elementlarni farqlashga yordam beradi.

---

## 🔑 `v-bind:key` — Unikal Kalit

`v-for` bilan birga ishlatiladi. Har bir elementga **unikal identifikator** beradi:

```html
<li v-for="(item, index) in items" v-bind:key="item">
```

### Nima uchun kerak?

| Holat | `key` siz | `key` bilan |
|-------|-----------|-------------|
| Element qo'shilganda | Barcha ro'yxat qaytadan chiziladi 🐢 | Faqat yangi element qo'shiladi ⚡ |
| Element o'chirilganda | Noto'g'ri element o'chishi mumkin ❌ | To'g'ri element o'chadi ✅ |

> 📌 **Qisqa yozilishi:** `v-bind:key="item"` → `:key="item"`

---

## 🎯 `v-on` — Hodisa Tinglagich (Event Listener)

`v-on` — foydalanuvchi amallarini (click, keyup, input...) ushlab oladi:

### 1️⃣ Click hodisasi — Element bosilganda

```html
<li v-on:click="items.splice(index, 1)">
```

> Bosilgan element ro'yxatdan **o'chiriladi** (`splice` orqali).

### 2️⃣ Keyup hodisasi — Klaviatura bosilganda

```html
<input type="text" v-on:keyup.enter="addItem" ref="inputValue">
```

> **Enter** tugmasi bosilganda `addItem()` metodi chaqiriladi.

### Qisqa yozilishi:

| To'liq | Qisqa |
|--------|-------|
| `v-on:click="..."` | `@click="..."` |
| `v-on:keyup.enter="..."` | `@keyup.enter="..."` |
| `v-on:input="..."` | `@input="..."` |

---

## 🛡️ Hodisa Modifikatorlari (Event Modifiers)

Modifikatorlar hodisa xatti-harakatini boshqaradi. Ular `.` (nuqta) orqali qo'shiladi:

### `.enter` — Faqat Enter tugmasi

```html
<input v-on:keyup.enter="addItem">
```

> **Enter** bosilgandagina ishlaydi, boshqa tugmalar uchun ishlamaydi.

### `.stop` — Hodisa Tarqalishini To'xtatish

```html
<input type="text" v-on:click.stop>
```

> Bu juda muhim tushuncha! Misolda `<li>` bosilganda element o'chadi. Lekin `<li>` ichidagi `<input>` ga bosilganda ham `<li>` ning click hodisasi ishlaydi. `.stop` modifikatori buni **to'xtatadi**.

#### Vizual tushuntirish:

```
┌──────────────────────── <li> v-on:click="o'chirish" ─────────┐
│                                                               │
│   📝 Item matni     ┌─── <input> ───────────────────┐        │
│                      │  .stop → click LI ga o'tmaydi │        │
│                      └───────────────────────────────┘        │
└───────────────────────────────────────────────────────────────┘

.stop siz:   input bosilsa → LI ham ishga tushadi → element o'chadi ❌
.stop bilan: input bosilsa → LI ga signal bormaydi → xavfsiz ✅
```

### Boshqa foydali modifikatorlar:

| Modifikator | Vazifasi |
|-------------|----------|
| `.prevent` | `event.preventDefault()` — standart xatti-harakatni bekor qiladi |
| `.once` | Hodisa faqat **1 marta** ishlaydi |
| `.self` | Faqat element **o'zi** bosilganda ishlaydi (ichki elementlar emas) |

---

## 📋 `ref` va `$refs` — HTML Elementga To'g'ridan-To'g'ri Kirish

`ref` — HTML elementga **nom berish**, `$refs` — bu element bilan **JavaScript da ishlash**:

### HTML da nom berish:

```html
<input type="text" ref="inputValue">
```

### JavaScript da kirish:

```javascript
this.$refs.inputValue.value   // → input ichidagi qiymatni olish
this.$refs.inputValue.value = ''  // → input ni tozalash
```

### Nima uchun kerak?

Oddiy JavaScript da `document.getElementById()` yoki `document.querySelector()` ishlatamiz. Vue da esa `ref` / `$refs` — bu xuddi shunga o'xshash, lekin **Vue usulida**:

| Oddiy JS | Vue usuli |
|----------|-----------|
| `document.getElementById('myInput')` | `this.$refs.myInput` |
| `document.querySelector('.input').value` | `this.$refs.inputValue.value` |

> 💡 `ref` — `v-model` ishlatish imkoni bo'lmagan holatlarda foydali.

---

## 👁️ `v-show` — Shartli Ko'rsatish

`v-show` — elementni **ko'rsatish yoki yashirish** uchun ishlatiladi:

```html
<h2 v-show="!items.length">Items Yoq</h2>
```

### Qanday ishlaydi?

| `items.length` | `!items.length` | Natija |
|-----------------|------------------|--------|
| `3` (elementlar bor) | `false` | ❌ Yashirin (`display: none`) |
| `0` (bo'sh) | `true` | ✅ Ko'rinadi |

### `v-show` vs `v-if` farqi:

| Xususiyat | `v-show` | `v-if` |
|-----------|----------|--------|
| Ishlash usuli | CSS `display: none` bilan yashiradi | DOM dan butunlay **olib tashlaydi** |
| Tezlik | ⚡ Tez (faqat CSS o'zgaradi) | 🐢 Sekinroq (DOM qayta quriladi) |
| Qachon ishlatiladi | Tez-tez ko'rsatish/yashirish kerak bo'lganda | Kamdan-kam o'zgaradigan sharoitlarda |

> 🧠 **Qoida:** Ko'p marta almashtirilsa → `v-show`, kamdan-kam → `v-if`.

---

## 📐 `{{ }}` — Matn Interpolyatsiyasi (Mustache Syntax)

Ikki qavslik `{{ }}` — `data()` dagi qiymatlarni HTML ichida ko'rsatish uchun:

```html
<h2>{{ item }}</h2>
```

### Ichida JavaScript ifodalar ham yozish mumkin:

```html
{{ item.toUpperCase() }}      <!-- → "HELLO" -->
{{ items.length }}             <!-- → 6 -->
{{ title + '!!!' }}            <!-- → "Hello, Vue!!!" -->
{{ items.length > 0 ? 'Bor' : 'Yoq' }}  <!-- Shart -->
```

> ⚠️ `{{ }}` faqat **matn joylarda** ishlaydi, HTML atribut ichida ishlamaydi. Atributlar uchun `v-bind` ishlating.

---

## 🧮 `computed` — Hisoblangan Xususiyatlar

> ⚠️ Bu loyihada `computed` kommentga olingan, lekin tushunib qo'yish muhim!

`computed` — `data()` ga asoslangan **avtomatik hisoblanadigan** qiymatlar:

```javascript
computed: {
    evenItems() {
        return this.items.filter(val => val % 2 === 0)
    }
}
```

### `computed` vs `methods` farqi:

| Xususiyat | `computed` | `methods` |
|-----------|-----------|-----------|
| Keshlanadi | ✅ Ha — faqat bog'liq data o'zgarganda qayta ishlaydi | ❌ Yo'q — har safar chaqirilganda ishlaydi |
| Chaqirish | `{{ evenItems }}` (qavssiz) | `{{ getEvenItems() }}` (qavsli) |
| Ishlash vaqti | ⚡ Tez (keshdan oladi) | 🐢 Har safar qayta ishlaydi |
| Qachon ishlatiladi | Ma'lumotni **qayta ishlash** kerak bo'lganda | **Harakat** (action) bajarilganda |

### Misol:

```javascript
// methods da — har safar ishlaydi
methods: {
    getEvenItems() {
        return this.items.filter(val => val % 2 === 0)
    }
}

// computed da — faqat items o'zgarganda ishlaydi ⚡
computed: {
    evenItems() {
        return this.items.filter(val => val % 2 === 0)
    }
}
```

> 💡 **Qoida:** Agar `data()` dan yangi qiymat **hisoblash** kerak bo'lsa — `computed` ishlating.

---

## 🔄 Loyihaning Ish Jarayoni

```
┌────────────────────────────────────────────────────┐
│                   FOYDALANUVCHI                     │
│                                                    │
│  1. Input ga matn yozadi                           │
│  2. Enter bosadi → addItem() ishlaydi              │
│  3. Yangi element items ga qo'shiladi              │
│  4. v-for avtomatik yangi <li> yaratadi            │
│  5. Element bosilsa → splice orqali o'chiriladi    │
│  6. items bo'sh bo'lsa → "Items Yoq" ko'rinadi    │
└────────────────────────────────────────────────────┘
```

---

## 📚 Xulosa Jadvali

| Tushuncha | Qisqa Tavsif | Misol |
|-----------|-------------|-------|
| `createApp()` | Vue ilovasi yaratish | `Vue.createApp({...}).mount('#app')` |
| `data()` | Reaktiv o'zgaruvchilar | `data() { return { title: '...' } }` |
| `methods` | Funksiyalar | `methods: { addItem() {...} }` |
| `v-text` | Matn ko'rsatish | `<h1 v-text="title">` |
| `{{ }}` | Matn interpolyatsiyasi | `<h2>{{ item }}</h2>` |
| `v-for` | Ro'yxat yaratish | `v-for="item in items"` |
| `v-bind:key` | Unikal kalit | `:key="item"` |
| `v-on` / `@` | Hodisa tinglagich | `@click="..."` |
| `.enter` | Enter modifikatori | `@keyup.enter="addItem"` |
| `.stop` | Hodisa tarqalishini to'xtatish | `@click.stop` |
| `ref` / `$refs` | HTML elementga kirish | `ref="inputValue"` |
| `v-show` | Ko'rsatish/yashirish | `v-show="!items.length"` |
| `computed` | Hisoblangan xususiyat | `computed: { evenItems() {...} }` |

---

> ✨ **Har kuni takrorlang, kod yozing, va tajriba orttiring!**
> Vue.js — o'rganish oson, lekin imkoniyatlari cheksiz! 🚀
