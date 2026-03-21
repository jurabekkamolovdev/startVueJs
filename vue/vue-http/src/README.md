# 📂 `src` Papkasi — To'liq Tushuntirish

> **Loyiha nomi:** vue-http  
> **Texnologiyalar:** Vue 3 · Axios · Firebase Realtime Database · CSS  
> **Maqsad:** Foydalanuvchi ismini kiritib, Firebase'ga saqlash, o'qish va o'chirish (CRUD)

---

## 🗂 Fayllar Tuzilmasi

```
src/
├── main.js              ← Ilovaning kirish nuqtasi (entry point)
├── App.vue              ← Asosiy komponent (forma + mantiq)
├── AppPeopleList.vue    ← Bolalar komponent (ro'yxat ko'rsatish)
└── style.css            ← Global CSS stillari
```

---

## 1️⃣ `main.js` — Ilovaning Kirish Nuqtasi

```js
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')
```

### 🔑 Nima qiladi?

| Qator | Vazifasi |
|-------|----------|
| `import { createApp } from 'vue'` | Vue kutubxonasidan `createApp` funksiyasini chaqiradi |
| `import App from './App.vue'` | `App.vue` — asosiy komponentni import qiladi |
| `import './style.css'` | Global CSS stillarini ulaydi |
| `createApp(App).mount('#app')` | Vue ilovasini yaratib, HTML'dagi `#app` elementiga ulaydi |

> 💡 **Eslab qol:** `main.js` — bu "ilova yoqilishi" (start) fayli. Hamma narsa shu yerdan boshlanadi.

---

## 2️⃣ `App.vue` — Asosiy Komponent (Bosh komponent)

Bu fayl **3 qismdan** iborat: `<template>`, `<script>`, `<style>`.

### 📋 Template (HTML qismi)

```html
<template>
  <div class="container">
    <!-- 📝 FORMA: Ism kiritish -->
    <form class="card" @submit.prevent="createPerson">
      <h1>Malumotlar Ombori bilan ishlash</h1>
      <div class="form-control">
        <label for="name">Ismingiz nima ?</label>
        <input type="text" id="name"
               placeholder="Ismingizni yozing"
               v-model.trim="name">
      </div>
      <button class="btn" type="submit"
              :disabled="name.length === 0">Yuborish</button>
    </form>

    <!-- 📋 RO'YXAT: Odamlar ro'yxati -->
    <AppPeopleList
      :people="people"
      @load="loadPeople"
      @remove="removePerson"
    ></AppPeopleList>
  </div>
</template>
```

#### 🧠 Muhim Tushunchalar:

| Direktiva / Sintaksis | Ma'nosi |
|-----------------------|---------|
| `@submit.prevent` | Forma yuborilganda sahifani yangilamaydi (preventDefault) |
| `v-model.trim="name"` | Input qiymatini `name` o'zgaruvchiga bog'laydi, boshidagi/oxiridagi bo'sh joylarni olib tashlaydi |
| `:disabled="name.length === 0"` | Agar `name` bo'sh bo'lsa — tugma o'chiriladi (disabled) |
| `:people="people"` | `people` massivini bolalar komponentga **prop** sifatida uzatadi |
| `@load="loadPeople"` | Bolalar komponentdan `load` event kelganda `loadPeople` metodini chaqiradi |
| `@remove="removePerson"` | Bolalar komponentdan `remove` event kelganda `removePerson` metodini chaqiradi |

---

### ⚙️ Script (JavaScript qismi)

#### 📦 Data (Ma'lumotlar)

```js
data() {
  return {
    name: '',      // Input maydoni uchun — foydalanuvchi kiritgan ism
    people: []     // Firebase'dan kelgan odamlar ro'yxati
  }
}
```

#### 🔄 Lifecycle Hook — `mounted()`

```js
mounted() {
  this.loadPeople()
}
```

> **Nima qiladi?** Komponent DOM'ga ulanganida avtomatik ravishda `loadPeople()` ni chaqiradi — ya'ni sahifa ochilganda darhol ma'lumotlar yuklanadi.

---

#### 📌 Metodlar (methods)

##### ✅ `createPerson()` — Yangi odam qo'shish

```
Foydalanuvchi ism yozadi → "Yuborish" tugmasini bosadi → Firebase'ga POST so'rov yuboriladi
```

```
┌─────────────┐     POST      ┌──────────────────┐
│  Forma      │  ──────────►  │  Firebase DB      │
│  (ism)      │               │  /people.json     │
└─────────────┘               └──────────────────┘
       │                              │
       │         ◄── JSON javob ──    │
       │         (yangi id qaytadi)   │
       ▼                              
  people massiviga 
  boshiga qo'shiladi (unshift)
  va input tozalanadi
```

**Kod xususiyatlari:**
- `fetch()` — brauzerning o'zidan keladigan HTTP so'rov funksiyasi ishlatilgan
- `method: 'POST'` — yangi ma'lumot yaratish uchun
- `JSON.stringify()` — JavaScript obyektini JSON matnga aylantiradi
- `this.people.unshift(...)` — yangi elementni **ro'yxat boshiga** qo'shadi
- `try...catch` — xatolikni ushlash uchun

---

##### 📥 `loadPeople()` — Ma'lumotlarni yuklash

```
Sahifa ochiladi → Firebase'dan GET so'rov → Javobni people massiviga yozadi
```

```
┌──────────────────┐    GET     ┌──────────────────┐
│  App.vue         │ ────────►  │  Firebase DB      │
│  loadPeople()    │            │  /people.json     │
└──────────────────┘            └──────────────────┘
       │                               │
       │    ◄── { key1: {firstName},   │
       │         key2: {firstName} }   │
       ▼
  Object.keys(data).map(...)
  → [{id, firstName}, ...]
```

**Kod xususiyatlari:**
- `axios.get()` — Axios kutubxonasi orqali GET so'rov (fetch'dan qulayroq)
- `Object.keys(data).map(...)` — Firebase'dan kelgan obyektni massivga aylantiradi
- Agar `data` null/bo'sh bo'lsa — `people = []` qilib qo'yadi

> ⚠️ **E'tibor:** `createPerson` da `fetch()`, `loadPeople` da esa `axios` ishlatilgan — bu **ikkalasini ham o'rganish** uchun qilingan.

---

##### 🗑️ `removePerson(id)` — Odamni o'chirish

```
Foydalanuvchi "O'chirish" tugmasini bosadi → Firebase'dan DELETE so'rov → Lokal massivdan filter qilib olib tashlaydi
```

```
┌──────────────────┐   DELETE   ┌──────────────────┐
│  App.vue         │ ────────►  │  Firebase DB      │
│  removePerson()  │            │  /people/{id}.json│
└──────────────────┘            └──────────────────┘
       │
       ▼
  this.people.filter(person => person.id !== id)
  → o'chirilgan element ro'yxatdan chiqariladi
```

**Kod xususiyatlari:**
- `axios.delete()` — Firebase'dan ma'lumotni o'chiradi
- `.filter()` — lokal massivdan ham mos kelmaydigan elementni olib tashlaydi

---

### 🔗 Komponentlar ro'yxati

```js
components: {
  AppPeopleList   // Bolalar komponentni ro'yxatga kiritish
}
```

---

## 3️⃣ `AppPeopleList.vue` — Bolalar Komponent

Bu komponent faqat **ro'yxatni ko'rsatadi** va **eventlarni ota komponentga yuboradi**.

### Template

```html
<!-- Agar odamlar bor bo'lsa -->
<div v-if="people.length !== 0">
  <div class="card row" v-for="person in people" :key="person.id">
    <h3>{{ person.firstName }}</h3>
    <button class="btn danger" @click="$emit('remove', person.id)">
      O'chirish
    </button>
  </div>
</div>

<!-- Agar odamlar yo'q bo'lsa -->
<div class="card center" v-else>
  <h3>Malumotlar hali yoq</h3>
  <button class="btn" @click="$emit('load')">Malumotlarni yukalsh</button>
</div>
```

### 🧠 Muhim Tushunchalar:

| Tushuncha | Tushuntirish |
|-----------|-------------|
| `props: { people: [] }` | Ota komponentdan `people` massivini qabul qiladi |
| `v-if` / `v-else` | Shartli ko'rsatish — ma'lumot bormi yoki yo'qmi |
| `v-for="person in people"` | Har bir odam uchun karta yaratadi |
| `:key="person.id"` | Har bir elementga unikal kalit beradi (Vue optimizatsiyasi uchun) |
| `$emit('remove', person.id)` | Ota komponentga **"bu odamni o'chir"** degan signal yuboradi |
| `$emit('load')` | Ota komponentga **"ma'lumotlarni yukla"** degan signal yuboradi |

### 📊 Ota ↔ Bola Aloqasi (Props & Events)

```
┌──────────────────────────────────────────┐
│              App.vue (OTA)               │
│                                          │
│  people massivi ──── :people ────►       │
│                                          │
│  loadPeople()  ◄──── @load ─────         │
│  removePerson() ◄── @remove ────         │
│                                   │      │
│            ┌──────────────────────▼──┐   │
│            │  AppPeopleList (BOLA)   │   │
│            │                        │   │
│            │  props: people         │   │
│            │  $emit('load')         │   │
│            │  $emit('remove', id)   │   │
│            └────────────────────────┘   │
└──────────────────────────────────────────┘
```

> 💡 **Eslab qol:**  
> **Props** = Otadan bolaga ma'lumot uzatish (↓ pastga)  
> **Events ($emit)** = Boladan otaga signal yuborish (↑ tepaga)

---

## 4️⃣ `style.css` — Global Stillar

### 🎨 Ranglar Palitrasi

| Rang | Hex kodi | Qayerda ishlatilgan |
|------|----------|---------------------|
| 🌑 Qorong'i ko'k | `#1b263b` | Sahifa orqa foni |
| 🟢 Yashil | `#40916c` | Tugma (button) rangi |
| 🔴 Qizil | `#c1121f` | "O'chirish" tugmasi (danger) |
| 🟤 Qora | `#0d1b2a` | Matn va label rangi |
| 🟩 Yashil (yorqin) | `#06d6a0` | Input focus holati |
| ⬜ Kulrang | `#ced4da` | Disabled tugma foni |

### 📐 Asosiy CSS Klasslari

| Klass | Vazifasi |
|-------|----------|
| `.container` | Sahifadagi asosiy konteyner (60% kenglik, markazda) |
| `.card` | Oq karta — forma va har bir element uchun |
| `.card.center` | Markazlashtirilgan karta |
| `.card.row` | Gorizontal tartibdagi karta (ism + tugma yonma-yon) |
| `.form-control` | Forma ichidagi label + input guruhi |
| `.btn` | Asosiy tugma (yashil, dumaloq burchak) |
| `.btn:disabled` | O'chirilgan tugma holati |
| `.btn.danger` | Xavfli tugma (qizil — o'chirish uchun) |

---

## 📡 Firebase Ma'lumotlar Oqimi (Data Flow)

```
Firebase Realtime Database
URL: https://vue-with-https-bab88-default-rtdb.firebaseio.com/people.json

Ma'lumot tuzilmasi:
{
  "-NxAbC123": { "firstName": "Ali" },
  "-NxAbC456": { "firstName": "Vali" },
  "-NxAbC789": { "firstName": "Sardor" }
}
```

### CRUD Amallari:

| Amal | HTTP Metod | Endpoint | Kutubxona |
|------|-----------|----------|-----------|
| **C**reate (yaratish) | `POST` | `/people.json` | `fetch()` |
| **R**ead (o'qish) | `GET` | `/people.json` | `axios.get()` |
| **D**elete (o'chirish) | `DELETE` | `/people/{id}.json` | `axios.delete()` |

---

## 🧩 Umumiy Arxitektura Sxemasi

```
┌─────────────────────────────────────────────────────┐
│                    main.js                          │
│           createApp(App).mount('#app')              │
│                     │                               │
│                     ▼                               │
│  ┌─────────────────────────────────────────┐        │
│  │              App.vue                    │        │
│  │                                         │        │
│  │  data: { name, people }                 │        │
│  │                                         │        │
│  │  Metodlar:                              │        │
│  │  ├── createPerson()  → POST (fetch)     │        │
│  │  ├── loadPeople()    → GET  (axios)     │        │
│  │  └── removePerson()  → DELETE (axios)   │        │
│  │                                         │        │
│  │         │ :people    ▲ @load, @remove   │        │
│  │         ▼            │                  │        │
│  │  ┌──────────────────────────┐           │        │
│  │  │   AppPeopleList.vue      │           │        │
│  │  │   ├── v-for → kartalar   │           │        │
│  │  │   ├── $emit('load')      │           │        │
│  │  │   └── $emit('remove',id) │           │        │
│  │  └──────────────────────────┘           │        │
│  └─────────────────────────────────────────┘        │
│                                                     │
│  style.css → barcha komponentlarga global stillar   │
└─────────────────────────────────────────────────────┘
                      │
                      ▼  HTTP so'rovlar
         ┌───────────────────────┐
         │  Firebase Realtime DB │
         │  /people.json         │
         └───────────────────────┘
```

---

## ✏️ Xulosa — Nimalarni O'rgandik?

| # | Mavzu | Qayerda ko'rildi |
|---|-------|-----------------|
| 1 | `v-model` — ikki tomonlama bog'lanish | `App.vue` — input |
| 2 | `@submit.prevent` — formani boshqarish | `App.vue` — forma |
| 3 | `:disabled` — shartli disable qilish | `App.vue` — tugma |
| 4 | `props` — otadan bolaga ma'lumot | `AppPeopleList.vue` |
| 5 | `$emit` — boladan otaga signal | `AppPeopleList.vue` |
| 6 | `v-for` + `:key` — ro'yxat render qilish | `AppPeopleList.vue` |
| 7 | `v-if` / `v-else` — shartli ko'rsatish | `AppPeopleList.vue` |
| 8 | `fetch()` — brauzer HTTP so'rov | `App.vue` — createPerson |
| 9 | `axios` — tashqi kutubxona HTTP so'rov | `App.vue` — loadPeople |
| 10 | `async/await` — asinxron so'rovlar | Barcha metodlarda |
| 11 | `mounted()` — lifecycle hook | `App.vue` |
| 12 | Firebase Realtime DB — CRUD | App.vue — barcha metodlar |
