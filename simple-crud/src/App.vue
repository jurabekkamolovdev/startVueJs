<template>
  <div class="app-container">
    <div class="glass-card">
      <header>
        <h1>Vazifalar (CRUD)</h1>
        <p>Vue 3 Composition API &amp; Vite</p>
      </header>
      
      <!-- Add/Edit form -->
      <form @submit.prevent="saveItem" class="crud-form">
        <input 
          v-model="currentItem.title" 
          placeholder="Vazifa nomi..." 
          required 
          class="input-field" 
        />
        <input 
          v-model="currentItem.description" 
          placeholder="Tavsifi..." 
          class="input-field" 
        />
        <button type="submit" class="btn btn-primary">
          {{ isEditing ? "Saqlash" : "Qo'shish" }}
        </button>
        <button v-if="isEditing" type="button" @click="cancelEdit" class="btn btn-secondary">
          Bekor qilish
        </button>
      </form>

      <!-- List -->
      <div class="list-container">
        <transition-group name="list" tag="ul" class="item-list">
          <li v-for="item in items" :key="item.id" class="item" :class="{ completed: item.completed }">
            <div class="item-content" @click="toggleComplete(item)">
              <div class="checkbox">
                <span v-if="item.completed">✓</span>
              </div>
              <div class="texts">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </div>
            <div class="actions">
              <button @click.stop="editItem(item)" class="icon-btn edit-btn">✏️</button>
              <button @click.stop="deleteItem(item.id)" class="icon-btn delete-btn">🗑️</button>
            </div>
          </li>
        </transition-group>
        <div v-if="items.length === 0" class="empty-state">
          Hech qanday vazifa yo'q. Yangi qo'shing!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const items = ref([])
const currentItem = ref({ title: '', description: '' })
const isEditing = ref(false)
let editId = null

// Load from LocalStorage
onMounted(() => {
  const saved = localStorage.getItem('vue3-crud-items')
  if (saved) {
    items.value = JSON.parse(saved)
  }
})

// Save to LocalStorage automatically
watch(items, (newVal) => {
  localStorage.setItem('vue3-crud-items', JSON.stringify(newVal))
}, { deep: true })

const saveItem = () => {
  if (isEditing.value) {
    const index = items.value.findIndex(i => i.id === editId)
    if (index !== -1) {
      items.value[index] = { ...items.value[index], ...currentItem.value }
    }
  } else {
    items.value.push({
      id: Date.now(),
      title: currentItem.value.title,
      description: currentItem.value.description,
      completed: false
    })
  }
  resetForm()
}

const editItem = (item) => {
  isEditing.value = true
  editId = item.id
  currentItem.value = { title: item.title, description: item.description }
}

const deleteItem = (id) => {
  if (confirm("Rostdan o'chirmoqchimisiz?")) {
    items.value = items.value.filter(i => i.id !== id)
  }
}

const toggleComplete = (item) => {
  item.completed = !item.completed
}

const cancelEdit = () => {
  resetForm()
}

const resetForm = () => {
  isEditing.value = false
  editId = null
  currentItem.value = { title: '', description: '' }
}
</script>

<style scoped>
.app-container {
  width: 100vw;
  max-width: 100%;
}

.glass-card {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  padding: 35px;
  box-shadow: 0 16px 40px 0 rgba(0, 0, 0, 0.4);
}

header {
  text-align: center;
  margin-bottom: 30px;
}

h1 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 5px;
  background: -webkit-linear-gradient(#fff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

header p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.crud-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.input-field {
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  background: var(--bg-input);
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.input-field:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(0, 242, 254, 0.2);
}

.btn {
  padding: 14px 20px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(0, 242, 254, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 242, 254, 0.5);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.25);
}

.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.item:hover {
  border-color: var(--glass-border);
  background: rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.item.completed {
  opacity: 0.6;
}

.item.completed h3 {
  text-decoration: line-through;
  color: #a0aec0;
}

.item-content {
  display: flex;
  align-items: center;
  gap: 18px;
  flex: 1;
  cursor: pointer;
}

.checkbox {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid var(--accent);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.item.completed .checkbox {
  background: var(--success);
  border-color: var(--success);
}

.texts {
  display: flex;
  flex-direction: column;
}

.texts h3 {
  font-size: 1.15rem;
  font-weight: 500;
  margin-bottom: 4px;
}

.texts p {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.actions {
  display: flex;
  gap: 10px;
}

.icon-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.delete-btn:hover {
  background: rgba(255, 71, 87, 0.3);
}

.empty-state {
  text-align: center;
  padding: 30px;
  color: var(--text-secondary);
  font-style: italic;
  font-size: 1.1rem;
}

/* Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
