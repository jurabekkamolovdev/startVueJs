# 📁 `src` Papkasi — To'liq Hujjat

Bu papka Vue.js **Forms** loyihasining asosiy manba kodlarini o'z ichiga oladi. Quyida har bir faylning vazifasi va ichidagi kod batafsil tushuntirilgan.

---

## 📂 Fayl Tuzilishi

```
src/
├── App.vue      ← Asosiy komponent (forma)
├── main.js      ← Ilovani ishga tushiruvchi fayl
├── style.css    ← Global CSS stillari
└── README.md    ← Shu hujjat
```

---

## 1. 📄 `main.js` — Ilovani Ishga Tushirish

Bu fayl Vue ilovasining **kirish nuqtasi**. U quyidagi ishlarni bajaradi:

```js
import { createApp } from 'vue'   // Vue kutubxonasidan createApp funksiyasi olinadi
import App from './App.vue'        // Asosiy komponent import qilinadi
import './style.css'               // Global CSS stillari yuklanadi

createApp(App).mount('#app')       // App komponenti #app elementiga ulanadi
```

### Xulosa:
| Qism | Vazifasi |
|------|----------|
| `createApp(App)` | Vue ilovasini yaratadi |
| `.mount('#app')` | HTML dagi `<div id="app">` ga ulaydi |
| `import './style.css'` | Barcha sahifaga global stillarni qo'llaydi |

---

## 2. 📄 `App.vue` — Asosiy Komponent (Anketa Formasi)

Bu loyihaning **yagona va asosiy komponenti**. U **anketa formasi** ko'rinishida ishlaydi.

### 🟢 `<template>` — HTML Qismi

Forma quyidagi maydonlardan iborat:

#### 📝 a) Ism maydoni (`text input`)
```html
<input type="text" v-model.trim="name" placeholder="Ismingizni yozing">
```
- `v-model.trim="name"` — foydalanuvchi kiritgan matnni `name` o'zgaruvchisiga bog'laydi, bosh-oxiridagi bo'sh joylarni olib tashlaydi
- **Validatsiya bor**: ism bo'sh bo'lsa, xato xabari chiqadi

#### 🔢 b) Yosh maydoni (`number input`)
```html
<input type="number" v-model.number="age">
```
- `v-model.number="age"` — kiritilgan qiymatni avtomatik `number` (son) tipiga o'zgartiradi
- Standart qiymati: `23`

#### 🏙️ c) Shahar tanlash (`select`)
```html
<select v-model="city">
  <option value="tosh">Toshkent</option>
  <option value="sam">Samarqand</option>
  <option value="sir">Sirdaryo</option>
</select>
```
- `v-model="city"` — tanlangan shaharni `city` ga bog'laydi
- Standart qiymat: `'tosh'` (Toshkent)

#### ✈️ d) Radio tugmalar — Tokioga borish istagi
```html
<input type="radio" value="yes" v-model="relocate"> Ha
<input type="radio" value="no" v-model="relocate">  Yo'q
```
- `v-model="relocate"` — qaysi biri tanlansa, `'yes'` yoki `'no'` qiymati saqlanadi
- Boshlang'ich qiymat: `null`

#### ✅ e) Checkbox — Vue ko'nikmalari
```html
<input type="checkbox" value="Vuex" v-model="skills">       Vuex
<input type="checkbox" value="Vue Router" v-model="skills"> Vue Router
```
- `v-model="skills"` — massivga bog'langan, bir nechta qiymat tanlanishi mumkin
- Boshlang'ich qiymat: `[]` (bo'sh massiv)

#### 📋 f) Checkbox — Qoidalarga rozilik
```html
<input type="checkbox" v-model="agree"> Qoidalar bilan tanishdim
```
- `v-model="agree"` — `true` yoki `false` qiymat saqlaydi

#### 🚀 g) Yuborish tugmasi
```html
<button type="submit" class="btn">Yuborish</button>
```
- Forma `@submit.prevent="submitHandler"` bilan tutiladi — sahifa qayta yuklanmaydi

---

### 🟡 `<script>` — JavaScript (Logika) Qismi

#### `data()` — Ma'lumotlar
```js
data() {
  return {
    name: '',          // Foydalanuvchi ismi
    age: 23,           // Yoshi (standart 23)
    city: 'tosh',      // Tanlangan shahar
    relocate: null,    // Ko'chish istagi (ha/yo'q)
    skills: [],        // Vue ko'nikmalari massivi
    agree: false,      // Qoidalarga rozilik
    errors: {
      name: null       // Ism validatsiya xatosi
    }
  }
}
```

#### `formIsValid()` — Validatsiya metodi
```js
formIsValid() {
  if (this.name.length === 0) {
    this.errors.name = 'Ismingizni kiriting'  // Xato xabari
    return false
  } else {
    this.errors.name = null
    return true
  }
}
```
- Ism **bo'sh bo'lsa** → xato chiqadi, forma yuborilmaydi
- Ism **kiritilgan bo'lsa** → xato tozalanadi, `true` qaytadi

#### `submitHandler()` — Formani yuborish
```js
submitHandler() {
  if (this.formIsValid()) {
    console.group('Form Data')
    console.log('Name: ', this.name)
    console.log('Age: ', this.age)
    console.log('City: ', this.city)
    console.log('Relocate: ', this.relocate)
    console.log('Skills: ', this.skills)
    console.log('Agree:', this.agree)
    console.groupEnd()
  }
}
```
- Avval `formIsValid()` tekshiradi
- Agar forma to'g'ri to'ldirilgan bo'lsa — barcha ma'lumotlarni **konsolga** chop etadi

---

### 🔴 `<style scoped>` — Komponentga xos stillar

```css
.form-control small {
  font-size: 18px;
  color: red;            /* Xato xabari qizil rangda */
}

.form-control.invalid input {
  border-color: red;     /* Xato bo'lsa input chegarasi qizaradi */
}
```
- `scoped` — bu stillar **faqat shu komponentga** ta'sir qiladi

---

## 3. 📄 `style.css` — Global Stillar

Bu fayl butun ilovaga umumiy dizayn beradi.

### 🔧 Asosiy Sozlamalar
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background-color: #1b263b; }  /* Qorong'i ko'k fon */
```

### 📦 Konteyner (`.container`)
- Kenglik: **50%**, markazda joylashgan
- Flexbox bilan vertikal tizilgan, orasida **20px** bo'shliq

### 🃏 Karta (`.card`)
- Oq fon, **40px** ichki bo'shliq, **10px** yumaloq burchaklar
- Forma elementlarini o'z ichiga oladi

### 📥 Forma Elementlari (`.form-control`)
- Har bir maydon vertikal tizilgan
- `input` — 100% kenglik, 30px balandlik, focus holati: **yashil chegara** (`#40916c`)
- `select` — xuddi shunga o'xshash stillar

### ☑️ Checkbox (`.checkbox`)
- Standart checkbox yashirilgan (`opacity: 0`)
- Uning o'rniga **18x18px** qora chegarali kvadrat ko'rsatiladi
- Tanlanganda **yashil fon** (`#40916c`) bo'ladi

### 🔘 Radio tugma (`.radio`)
- Standart radio yashirilgan
- O'rniga **20x20px** dumaloq element ko'rsatiladi
- Tanlanganda **qora fon** bo'ladi

### 🟢 Yuborish tugmasi (`.btn`)
- Shaffof fon, yashil chegara va yashil matn
- **50px** yumaloq burchaklar (pill shakl)
- Kenglik: **120px**

---

## 🎯 Loyihada Ishlatilingan Vue Tushunchalari

| Tushuncha | Qaerda | Tushuntirish |
|-----------|--------|-------------|
| `v-model` | Barcha input, select, checkbox, radio | Ikki tomonlama ma'lumot bog'lash |
| `v-model.trim` | Ism inputi | Bo'sh joylarni avtomatik olib tashlash |
| `v-model.number` | Yosh inputi | Qiymatni `number` tipiga o'zgartirish |
| `v-if` | Xato xabarlari | Shartli ko'rsatish |
| `:class` (v-bind:class) | `.form-control` | Dinamik CSS klass qo'shish |
| `@submit.prevent` | `<form>` | Formani standart yuborishni to'xtatish |
| `data()` | Script | Komponent holati (state) |
| `methods` | Script | Komponent metodlari |
| `scoped style` | Style | Faqat shu komponentga tegishli stillar |

---

## 🔄 Forma Ishlash Ketma-ketligi

```
1. Foydalanuvchi formani to'ldiradi
          ↓
2. "Yuborish" tugmasini bosadi
          ↓
3. @submit.prevent → submitHandler() chaqiriladi
          ↓
4. formIsValid() tekshiradi
          ↓
   ┌──────────────────────┐
   │ Ism bo'shmi?          │
   ├── Ha → Xato chiqadi   │
   ├── Yo'q → Davom etadi  │
   └──────────────────────┘
          ↓
5. Konsolga barcha ma'lumotlar chop etiladi
```

---

> 💡 **Eslatma:** Bu loyiha Vue.js da **formalar bilan ishlash**, `v-model` direktivasi va oddiy **validatsiya** qilishni o'rganish uchun yaratilgan.
