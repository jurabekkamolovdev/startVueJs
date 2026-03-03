# 🟢 Vue.js 3 — Asosiy Tushunchalar

> Bu loyiha Vue.js 3 ni **CDN** orqali ulagan holda, eng muhim asosiy tushunchalarni amalda ko'rsatadi.  
> Quyida har bir tushuncha **nima**, **nima uchun kerak** va **qanday ishlaydi** — barchasi batafsil tushuntirilgan.

---

## 📦 Loyiha Tuzilishi

| Fayl | Vazifasi |
|------|----------|
| `index.html` | Dasturning HTML skeleti — Vue direktivlari shu yerda ishlatilgan |
| `app.js` | Vue ilovasining mantiqiy qismi — data, methods va mount shu yerda |

---

## 🚀 1. Vue Ilovasini Yaratish va Ulash — `createApp` va `mount`

```javascript
// app.js — eng oxirgi qator
Vue.createApp(App).mount("#app")
```

### Nima qiladi?
- `Vue.createApp(App)` — yangi Vue ilovasi yaratadi. `App` — bu biz yozgan barcha sozlamalar (data, methods) joylashgan obyekt.
- `.mount("#app")` — ilovani HTML dagi `id="app"` bo'lgan elementga **ulaydi** (mount qiladi).

### Nima uchun kerak?
Vue o'zi HTML ni boshqarishi uchun, avval unga **qaysi qismni boshqarishi kerakligini** ko'rsatish shart. `mount` aynan shu vazifani bajaradi — "mana shu `<div>` ichidagi narsalar seniki, o'zing boshqar" degan ma'noni bildiradi.

### Qanday ishlaydi?
```
HTML sahifa yuklandi
    ↓
Vue.createApp(App) — ilova yaratildi
    ↓
.mount("#app") — <div id="app"> topildi va Vue unga ulandi
    ↓
Endi bu div ichidagi {{ }}, v-bind, v-on, v-for — hammasi ishlaydi
```

---

## 📊 2. Ma'lumotlar Ombori — `data()`

```javascript
// app.js
data() {
    return {
        title: 'Message',
        placeholder: 'Habar yozing',
        inputValue: '',
        notes: ['1-Task', '2-Task']
    }
}
```

### Nima qiladi?
Ilova uchun kerak bo'lgan **barcha ma'lumotlarni** (o'zgaruvchilarni) bitta joyda e'lon qiladi va saqlaydi.

### Nima uchun kerak?
Vue ning eng kuchli tomoni — **reaktivlik**. `data()` ichidagi biror qiymat o'zgarganda, ekrandagi ko'rinish **avtomatik yangilanadi**. Masalan, `title` ni o'zgartirsangiz, ekrandagi `<h1>` ham o'sha zahoti yangilanadi. Buni qo'lda qilishingiz shart emas.

### Har bir o'zgaruvchining vazifasi:

| O'zgaruvchi | Turi | Nima uchun kerak |
|-------------|------|------------------|
| `title` | `String` | Sahifa sarlavhasini dinamik ko'rsatish uchun |
| `placeholder` | `String` | Input maydonchasiga maslahat matn qo'yish uchun |
| `inputValue` | `String` | Foydalanuvchi yozayotgan matnni saqlash uchun |
| `notes` | `Array` | Qo'shilgan xabarlar ro'yxatini saqlash uchun |

### Muhim qoida:
`data()` — bu **funksiya** bo'lishi shart (oddiy obyekt emas). Sababi: agar bir nechta komponent bo'lsa, har biri **o'zining alohida nusxasini** olishi kerak. Funksiya har safar yangi obyekt qaytaradi, shuning uchun ma'lumotlar aralashib ketmaydi.

---

## 🔧 3. Funksiyalar (Metodlar) — `methods`

```javascript
// app.js
methods: {
    inputChangeHandler(event) {
        this.inputValue = event.target.value
    },

    addHandler() {
        this.notes.push(this.inputValue)
        this.inputValue = ''
    }
}
```

### Nima qiladi?
Foydalanuvchi biror harakat qilganda (tugma bosish, yozish kabi) **bajariladigan funksiyalarni** e'lon qiladigan joy.

### Nima uchun kerak?
Dasturning **mantiqiy qismi** shu yerda yoziladi. Ma'lumotlarni o'zgartirish, hisoblash, tekshirish — bularning barchasi `methods` ichida bajariladi.

### Har bir metodning vazifasi:

#### `inputChangeHandler(event)`
```
Foydalanuvchi input ga yozmoqda
    ↓
Har bir harf yozilganda "input" hodisasi ishga tushadi
    ↓
event.target.value — foydalanuvchi yozgan matnni oladi
    ↓
this.inputValue ga saqlaydi
    ↓
Ekrandagi "You message: ..." avtomatik yangilanadi (reaktivlik!)
```

#### `addHandler()`
```
Foydalanuvchi "Submit" tugmasini bosdi
    ↓
this.notes.push(this.inputValue) — yozilgan matnni ro'yxatga qo'shadi
    ↓
this.inputValue = '' — input maydonchasini tozalaydi
    ↓
Ekrandagi ro'yxat avtomatik yangilanadi (reaktivlik!)
```

### `this` kalit so'zi nima?
`this` — bu Vue komponentining o'ziga ishora qiladi. `this.inputValue` deganda, `data()` ichidagi `inputValue` o'zgaruvchisiga murojaat qilinmoqda.

---

## 📝 4. Ma'lumotni Ekranga Chiqarish — `{{ }}` (Interpolation)

```html
<!-- index.html -->
<h1>{{ title }}</h1>
<h2>You message: {{ inputValue }}</h2>
```

### Nima qiladi?
`data()` ichidagi o'zgaruvchining qiymatini HTML sahifada **ko'rsatadi**.

### Nima uchun kerak?
Oddiy HTML da `<h1>` ichiga yozilgan matn doimo bir xil bo'lib qoladi. Lekin `{{ title }}` yozsangiz, Vue `title` o'zgaruvchisining **hozirgi qiymatini** chiqaradi va qiymat o'zgarganda **avtomatik yangilaydi**.

### Qanday ishlaydi?
```
data() dagi title = "Message"
    ↓
{{ title }}  →  ekranda "Message" ko'rinadi
    ↓
Agar title = "Salom" ga o'zgarsa
    ↓
{{ title }}  →  ekranda "Salom" ko'rinadi (avtomatik!)
```

---

## 🔗 5. Atributlarni Bog'lash — `v-bind`

```html
<!-- index.html -->
<input v-bind:placeholder="placeholder"
       v-bind:value="inputValue">
```

### Nima qiladi?
HTML atributlarini (`placeholder`, `value`, `src`, `class`, `href` va h.k.) Vue dagi **o'zgaruvchilarga ulaydi**.

### Nima uchun kerak?
Oddiy HTML da atributga faqat **qat'iy matn** yozish mumkin. Lekin `v-bind` orqali atributning qiymati **dinamik** bo'ladi — ya'ni `data()` dagi o'zgaruvchi o'zgarganda, atribut ham o'zgaradi.

### Misol:
```
data() dagi placeholder = "Habar yozing"
    ↓
v-bind:placeholder="placeholder"
    ↓
Input maydonchada "Habar yozing" degan maslahat matni ko'rinadi
    ↓
Agar placeholder = "Ismingizni yozing" ga o'zgarsa
    ↓
Input maydoncha avtomatik yangilanadi
```

### Qisqartirilgan yozuvi:
`v-bind:` o'rniga faqat `:` yozish mumkin — natija bir xil:
```html
<!-- To'liq yozuv -->
<input v-bind:placeholder="placeholder">

<!-- Qisqartirilgan yozuv (ko'p ishlatiladi) -->
<input :placeholder="placeholder">
```

---

## 🖱️ 6. Hodisalarni Tinglash — `v-on`

```html
<!-- index.html -->
<input v-on:input="inputChangeHandler">
<button v-on:click="addHandler">Submit</button>
```

### Nima qiladi?
Foydalanuvchining harakatlarini (bosish, yozish, sichqoncha harakati) **ushlab**, javob sifatida `methods` dagi funksiyani **ishga tushiradi**.

### Nima uchun kerak?
Interaktiv dastur yaratish uchun — ya'ni foydalanuvchi biror narsa qilganda, dastur unga **javob berishi** kerak. `v-on` aynan shu bog'lanishni ta'minlaydi.

### Qanday ishlaydi?

#### `v-on:input` — yozish hodisasi
```
Foydalanuvchi inputga harf yozdi
    ↓
"input" hodisasi yuz berdi
    ↓
v-on:input="inputChangeHandler" — bu hodisani ushladi
    ↓
inputChangeHandler() metodi ishga tushdi
    ↓
Yozilgan matn inputValue ga saqlandi
```

#### `v-on:click` — bosish hodisasi
```
Foydalanuvchi "Submit" tugmasini bosdi
    ↓
"click" hodisasi yuz berdi
    ↓
v-on:click="addHandler" — bu hodisani ushladi
    ↓
addHandler() metodi ishga tushdi
    ↓
Xabar ro'yxatga qo'shildi, input tozalandi
```

### Qisqartirilgan yozuvi:
`v-on:` o'rniga faqat `@` yozish mumkin — natija bir xil:
```html
<!-- To'liq yozuv -->
<button v-on:click="addHandler">Submit</button>

<!-- Qisqartirilgan yozuv (ko'p ishlatiladi) -->
<button @click="addHandler">Submit</button>
```

---

## 🔄 7. Ro'yxat Yaratish — `v-for`

```html
<!-- index.html -->
<li v-for="note in notes">
    <h2>{{ note }}</h2>
</li>
```

### Nima qiladi?
Massiv (`Array`) yoki Obyekt ichidagi ma'lumotlar bo'yicha **aylanib**, har bir element uchun **alohida HTML element** yaratadi.

### Nima uchun kerak?
Ro'yxatdagi ma'lumotlar soni oldindan noma'lum bo'lganda juda foydali. Masalan, foydalanuvchi qancha xabar qo'shsa — shuncha `<li>` **avtomatik yaratiladi**. Qo'lda yozish shart emas.

### Qanday ishlaydi?
```
notes = ['1-Task', '2-Task']
    ↓
v-for="note in notes" — massivni aylanadi
    ↓
1-aylanish: note = "1-Task"  →  <li><h2>1-Task</h2></li>
2-aylanish: note = "2-Task"  →  <li><h2>2-Task</h2></li>
    ↓
Agar yangi element qo'shilsa (masalan: "3-Task")
    ↓
3-aylanish: note = "3-Task"  →  <li><h2>3-Task</h2></li>  (avtomatik!)
```

---

## 🔁 Umumiy Ishlash Jarayoni

Quyida dasturning boshidan oxirigacha qanday ishlashi ko'rsatilgan:

```
1. Sahifa yuklandi
    ↓
2. Vue.createApp(App) — ilova yaratildi
    ↓
3. .mount("#app") — <div id="app"> ga ulandi
    ↓
4. data() ishga tushdi — title, inputValue, notes tayyor
    ↓
5. Ekranda:
   - {{ title }}         → "Message" ko'rinadi
   - v-bind:placeholder  → inputda "Habar yozing" ko'rinadi
   - v-for               → "1-Task", "2-Task" ro'yxati chiqdi
    ↓
6. Foydalanuvchi input ga "Salom" deb yozdi
    ↓
7. v-on:input → inputChangeHandler() ishladi
    ↓
8. inputValue = "Salom" bo'ldi
    ↓
9. {{ inputValue }} → ekranda "You message: Salom" ko'rindi
    ↓
10. Foydalanuvchi "Submit" tugmasini bosdi
    ↓
11. v-on:click → addHandler() ishladi
    ↓
12. notes = ['1-Task', '2-Task', 'Salom'] bo'ldi
    ↓
13. v-for → yangi <li> avtomatik paydo bo'ldi
    ↓
14. inputValue = '' — input maydonchasi tozalandi
```

---

## 📌 Xulosa Jadvali

| Tushuncha | Yozilishi | Vazifasi |
|-----------|-----------|----------|
| `createApp` | `Vue.createApp(App)` | Vue ilovasini yaratish |
| `mount` | `.mount("#app")` | Ilovani HTML ga ulash |
| `data()` | `data() { return {...} }` | O'zgaruvchilarni saqlash (reaktiv) |
| `methods` | `methods: { fn() {...} }` | Funksiyalarni e'lon qilish |
| `{{ }}` | `{{ title }}` | Ma'lumotni ekranga chiqarish |
| `v-bind` | `v-bind:attr="val"` yoki `:attr="val"` | Atributni o'zgaruvchiga ulash |
| `v-on` | `v-on:event="fn"` yoki `@event="fn"` | Hodisani funksiyaga bog'lash |
| `v-for` | `v-for="item in list"` | Ro'yxat elementlarini yaratish |
| `this` | `this.inputValue` | Komponent ichidagi ma'lumotga murojaat |
