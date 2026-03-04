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

## 🔢 8. `v-for` bilan Index (Tartib Raqam) Olish

```html
<!-- index.html -->
<li v-for="(note, index) in notes">
    <h2>{{ toUpperCase(note) }}</h2>
    <button @click="deleteHandler(index)">Click</button>
</li>
```

### Nima qiladi?
Massivni aylanayotganda har bir elementning **tartib raqamini** (0 dan boshlab) ham olish imkonini beradi.

### Nima uchun kerak?
Ba'zan elementning o'zidan tashqari, uning **qaysi o'rinda turganini** ham bilish kerak bo'ladi. Masalan, ro'yxatdan ma'lum bir elementni o'chirish uchun uning **index** ini bilish shart — aynan qaysi birini o'chirish kerakligini Vue ga ko'rsatish uchun.

### Qanday ishlaydi?
```
notes = ['1-Task', '2-Task', '3-Task']
    ↓
v-for="(note, index) in notes"
    ↓
1-aylanish: note = "1-Task", index = 0
2-aylanish: note = "2-Task", index = 1
3-aylanish: note = "3-Task", index = 2
    ↓
Har bir <li> da o'chirish tugmasi bor: deleteHandler(index)
Tugma bosilsa → o'sha index dagi element o'chiriladi
```

---

## 🔤 9. `{{ }}` Ichida Funksiya Chaqirish

```html
<!-- index.html -->
<h2>{{ toUpperCase(note) }}</h2>
```

```javascript
// app.js — methods ichida
toUpperCase(item) {
    return item.toUpperCase();
}
```

### Nima qiladi?
`{{ }}` (interpolation) ichida faqat o'zgaruvchi emas, balki **funksiya ham** chaqirish mumkin. Funksiya qaytargan natija ekranda ko'rsatiladi.

### Nima uchun kerak?
Ma'lumotni ekranga chiqarishdan oldin **qayta ishlash** kerak bo'lganda juda foydali. Masalan, matnni katta harflarga o'zgartirish, sanani formatlash, raqamlarni yaxlitlash — bularning barchasi shu usulda qilinadi.

### Qanday ishlaydi?
```
note = "1-Task"
    ↓
{{ toUpperCase(note) }}
    ↓
toUpperCase("1-Task") chaqiriladi
    ↓
"1-TASK" qaytariladi
    ↓
Ekranda "1-TASK" ko'rinadi
```

---

## 🆕 10. Yangi Metodlar — `popHandler`, `deleteHandler`, `keypressHandler`

### `popHandler()` — Oxirgi elementni o'chirish
```javascript
popHandler() {
    this.notes.pop();
}
```
- **Nima qiladi?** `notes` massivining eng **oxirgi** elementini o'chirib tashlaydi.
- **Nima uchun `pop()`?** JavaScript dagi `.pop()` metodi massivning oxirgi elementini olib tashlaydi. Bu oddiy va tez usul — "Delete" tugmasi bosilganda oxirgi qo'shilgan xabarni o'chirish uchun ishlatilgan.

### `deleteHandler(index)` — Ma'lum bir elementni o'chirish
```javascript
deleteHandler(index) {
    this.notes.splice(index, 1);
}
```
- **Nima qiladi?** Berilgan `index` (tartib raqam) bo'yicha **aniq bitta** elementni ro'yxatdan o'chiradi.
- **Nima uchun `splice()`?** JavaScript dagi `.splice(index, 1)` metodi massivning istalgan o'rnidan element olib tashlash imkonini beradi. `index` — qaysi o'rindan, `1` — nechtasini o'chirish kerak.

### Farqi nima?
| Metod | Nimani o'chiradi | Misol |
|-------|-----------------|-------|
| `pop()` | Faqat **oxirgi** elementni | `['A', 'B', 'C']` → `['A', 'B']` |
| `splice(1, 1)` | **Tanlangan** elementni (index=1) | `['A', 'B', 'C']` → `['A', 'C']` |

### `keypressHandler(event)` — Klaviatura hodisasini ushlash
```javascript
keypressHandler(event) {
    if (event.key === 'Enter') {
        this.addHandler();
    }
}
```
- **Nima qiladi?** Foydalanuvchi klaviaturada tugma bosganda, **qaysi tugma** bosilganini tekshiradi. Agar `Enter` bo'lsa — `addHandler()` ni chaqirib, xabarni ro'yxatga qo'shadi.
- **Nima uchun kerak?** Foydalanuvchi har safar sichqoncha bilan "Submit" tugmasini bosishi shart emas — `Enter` bosib ham jo'natish mumkin bo'ladi. Bu **qulay foydalanuvchi tajribasi** (UX) uchun juda muhim.

---

## ⌨️ 11. Hodisa Modifikatorlari — `.enter`, `.prevent` va boshqalar

```html
<!-- index.html -->
<input v-on:keypress.enter="addHandler">
```

### Nima qiladi?
`v-on:keypress.enter` — faqat **Enter** tugmasi bosilgandagina funksiyani ishga tushiradi. Boshqa tugmalar bosilganda hech narsa qilmaydi.

### Nima uchun kerak?
Yuqoridagi `keypressHandler` da biz qo'lda `if (event.key === 'Enter')` deb tekshirdik. Lekin Vue **modifikator** orqali buni juda qisqa va oson qilish imkonini beradi. Ya'ni bir xil natija — lekin **kamroq kod** bilan.

### Taqqoslash:
```javascript
// ❌ Uzun usul — methods da qo'lda tekshirish
keypressHandler(event) {
    if (event.key === 'Enter') {
        this.addHandler();
    }
}
```
```html
<!-- ✅ Qisqa usul — modifikator bilan -->
<input v-on:keypress.enter="addHandler">
```

### Boshqa foydali modifikatorlar:
| Modifikator | Vazifasi |
|-------------|----------|
| `.enter` | Faqat Enter bosilganda |
| `.tab` | Faqat Tab bosilganda |
| `.esc` | Faqat Esc bosilganda |
| `.prevent` | `event.preventDefault()` ni avtomatik chaqiradi (forma yuborilishini to'xtatish uchun) |
| `.stop` | `event.stopPropagation()` — hodisaning yuqoriga tarqalishini to'xtatadi |

---

## 👁️ 12. Shartli Ko'rsatish — `v-if` / `v-else`

```html
<!-- index.html -->
<ul v-if="notes.length !== 0">
    <!-- Ro'yxat elementlari -->
</ul>

<div v-else>
    <h2>Heshnarsa yoq toldir</h2>
</div>
```

### Nima qiladi?
- **`v-if`** — berilgan shart **to'g'ri** (`true`) bo'lsa, elementni ekranda **ko'rsatadi**.
- **`v-else`** — `v-if` sharti **noto'g'ri** (`false`) bo'lsa, o'rniga boshqa elementni **ko'rsatadi**.

### Nima uchun kerak?
Ko'pincha ma'lum bir holatlarda turli xil narsalarni ko'rsatish kerak bo'ladi. Masalan:
- Ro'yxat **bo'sh** bo'lsa → "Hech narsa yo'q" degan xabar chiqarish
- Ro'yxatda **elementlar bor** bo'lsa → ro'yxatni ko'rsatish

### Qanday ishlaydi?
```
notes = ['1-Task', '2-Task']  →  notes.length = 2  →  2 !== 0 = TRUE
    ↓
v-if="notes.length !== 0"  →  SHART TO'G'RI
    ↓
<ul> ro'yxati ko'rinadi ✅
<div v-else> YASHIRINADI ❌
```
```
notes = []  →  notes.length = 0  →  0 !== 0 = FALSE
    ↓
v-if="notes.length !== 0"  →  SHART NOTO'G'RI
    ↓
<ul> ro'yxati YASHIRINADI ❌
<div v-else> ko'rinadi ✅  →  "Heshnarsa yoq toldir"
```

### Muhim farq — `v-if` vs `v-show`:
| Xususiyat | `v-if` | `v-show` |
|-----------|--------|----------|
| Qanday ishlaydi | Elementni DOM dan **butunlay olib tashlaydi** | Elementni `display: none` bilan **yashiradi** |
| Qachon ishlatiladi | Kam o'zgaradigan shartlar uchun | Tez-tez ko'rinib/yashirinadigan elementlar uchun |

---

## 🧠 13. Hisoblangan Xususiyatlar — `computed`

```javascript
// app.js
computed: {
    doubleCount() {
        console.log('dCount');
        return this.notes.length * 2
    }
}
```

```html
<!-- index.html -->
<strong>Notes {{ notes.length }}</strong> | DoubleCount {{ doubleCount }}
```

### Nima qiladi?
`data()` dagi ma'lumotlar asosida yangi qiymat **hisoblaydi** va uni ekranda ko'rsatish imkonini beradi.

### Nima uchun kerak?
Masalan, `notes` massivida 3 ta element bor — `doubleCount` avtomatik `6` ni ko'rsatadi. Element qo'shilsa yoki o'chirilsa, qiymat **o'zi yangilanadi**.

### `methods` dagi oddiy funksiya bilan farqi nima?

Bu juda **muhim** savol! Ikkalasi ham bir xil natija beradi, lekin **ishlash tarzi** boshqacha:

```javascript
// ❌ methods da yozilgan variant
methods: {
    doubleCount() {
        console.log('dCount');
        return this.notes.length * 2
    }
}
// HTML da: {{ doubleCount() }} — qavslar bilan chaqiriladi
```

```javascript
// ✅ computed da yozilgan variant
computed: {
    doubleCount() {
        console.log('dCount');
        return this.notes.length * 2
    }
}
// HTML da: {{ doubleCount }} — qavslarsiz, o'zgaruvchi kabi ishlatiladi
```

### Asosiy farq — **Keshlash (Caching)**:

| Xususiyat | `methods` | `computed` |
|-----------|-----------|------------|
| Chaqirilishi | Har safar sahifa qayta chizilganda **qayta ishga tushadi** | Faqat bog'liq ma'lumot o'zgargandagina **qayta hisoblanadi** |
| Keshlash | ❌ Yo'q — har doim qaytadan ishlaydi | ✅ Bor — natija keshlanadi, tezroq ishlaydi |
| Yozilishi | `{{ doubleCount() }}` qavslar bilan | `{{ doubleCount }}` qavslarsiz |

### Qanday ishlaydi?
```
notes = ['1-Task', '2-Task']  →  notes.length = 2
    ↓
computed: doubleCount → 2 * 2 = 4 (hisoblab, KESHLADI)
    ↓
Ekranda: "DoubleCount 4"
    ↓
Agar title o'zgarsa (notes O'ZGARMADI)
    ↓
doubleCount QAYTA ISHLAMAYDI — keshdan oladi (tezkor!)
    ↓
Agar notes ga yangi element qo'shilsa (notes O'ZGARDI)
    ↓
doubleCount QAYTA HISOBLANADI → 3 * 2 = 6
```

> 💡 **Qoida:** Agar funksiya faqat `data()` dagi ma'lumotlar asosida hisoblanadigan qiymat qaytarsa — **computed** ishlating. Bu tezroq va samaraliroq ishlaydi.

---

## 👀 14. Kuzatuvchi — `watch`

```javascript
// app.js
watch: {
    inputValue(value) {
        console.log('Watch', value)
    }
}
```

### Nima qiladi?
`data()` ichidagi biror o'zgaruvchini **kuzatadi** — u o'zgarganda **avtomatik** ishga tushadigan funksiya.

### Nima uchun kerak?
Ba'zan o'zgaruvchi o'zgarganda **qo'shimcha harakat** bajarish kerak bo'ladi. Masalan:
- Foydalanuvchi yozayotgan matnni **konsolga chiqarish** (debug uchun)
- Qidiruv so'zi o'zgarganda **API ga so'rov jo'natish**
- Ma'lum bir qiymatga yetganda **ogohlantirish** ko'rsatish
- Ma'lumotni **localStorage** ga saqlash

### Qanday ishlaydi?
```
Foydalanuvchi inputga "S" yozdi
    ↓
inputValue = "S" bo'ldi (data o'zgardi)
    ↓
watch: inputValue() avtomatik ishga tushdi
    ↓
Konsolda: "Watch S" chiqdi
    ↓
Foydalanuvchi "a" qo'shdi → inputValue = "Sa"
    ↓
watch yana ishga tushdi → Konsolda: "Watch Sa"
```

### `watch` funksiyasining parametrlari:
```javascript
watch: {
    inputValue(yangiQiymat, eskiQiymat) {
        console.log('Eski:', eskiQiymat)
        console.log('Yangi:', yangiQiymat)
    }
}
```
- **1-parametr** — o'zgaruvchining **yangi** qiymati
- **2-parametr** — o'zgaruvchining **eski** (avvalgi) qiymati

### `watch` vs `computed` — farqi nima?

| Xususiyat | `computed` | `watch` |
|-----------|------------|---------|
| Vazifasi | Yangi **qiymat hisoblash** va qaytarish | O'zgarishga **javoban harakat** qilish |
| Ishlash tarzi | return bilan natija qaytaradi | Hech narsa qaytarmaydi, faqat yon effekt bajaradi |
| Misol | `doubleCount → notes.length * 2` | `inputValue o'zgardi → konsolga yozish` |
| Qachon ishlatiladi | Ma'lumotni **qayta ishlash** kerak bo'lganda | Ma'lumot o'zgarganda **biror amalni bajarish** kerak bo'lganda |

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
5. computed hisoblanadi — doubleCount = 4
    ↓
6. Ekranda:
   - {{ title }}         → "Message" ko'rinadi
   - v-bind:placeholder  → inputda "Habar yozing" ko'rinadi
   - v-if                → notes.length !== 0 → ro'yxat ko'rinadi
   - v-for               → "1-TASK", "2-TASK" (toUpperCase bilan)
   - doubleCount          → "4" ko'rinadi
    ↓
7. Foydalanuvchi input ga "Salom" deb yozdi
    ↓
8. v-on:input → inputChangeHandler() ishladi
    ↓
9. inputValue = "Salom" bo'ldi
    ↓
10. watch ishga tushdi → konsolda "Watch Salom" chiqdi
    ↓
11. {{ inputValue }} → ekranda "You message: Salom" ko'rindi
    ↓
12. Foydalanuvchi Enter bosdi YOKI "Submit" tugmasini bosdi
    ↓
13. addHandler() ishladi → "Salom" ro'yxatga qo'shildi
    ↓
14. v-for → yangi <li> paydo bo'ldi: "SALOM" (toUpperCase)
    ↓
15. computed → doubleCount = 6 ga yangilandi
    ↓
16. Foydalanuvchi bitta element yonidagi tugmani bosdi
    ↓
17. deleteHandler(index) → o'sha element o'chirildi (splice)
    ↓
18. Agar hammasi o'chirilsa → v-if false → "Heshnarsa yoq toldir" chiqadi
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
| `{{ fn() }}` | `{{ toUpperCase(note) }}` | Interpolation ichida funksiya chaqirish |
| `v-bind` | `:attr="val"` | Atributni o'zgaruvchiga ulash |
| `v-on` | `@event="fn"` | Hodisani funksiyaga bog'lash |
| `.enter` | `@keypress.enter="fn"` | Hodisa modifikatori (faqat Enter) |
| `v-for` | `v-for="item in list"` | Ro'yxat elementlarini yaratish |
| `v-for` + index | `v-for="(item, i) in list"` | Ro'yxat + tartib raqam |
| `v-if` | `v-if="shart"` | Shartli ko'rsatish |
| `v-else` | `<div v-else>` | `v-if` noto'g'ri bo'lganda ko'rsatish |
| `computed` | `computed: { fn() {...} }` | Keshlangan hisoblangan qiymat |
| `watch` | `watch: { prop(val) {...} }` | O'zgarishni kuzatish va javoban harakat |
| `this` | `this.inputValue` | Komponent ichidagi ma'lumotga murojaat |
| `.push()` | `this.notes.push(val)` | Massivga element qo'shish |
| `.pop()` | `this.notes.pop()` | Oxirgi elementni o'chirish |
| `.splice()` | `this.notes.splice(i, 1)` | Ma'lum index dagi elementni o'chirish |
