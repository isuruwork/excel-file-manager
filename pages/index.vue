<script setup lang="ts">
import { ref } from 'vue'
import { useFileStore } from '../stores/fileStore'
const { uploadFile, downloadFile } = useFileStore()

const selectedFile = ref<File | null>(null)

function handleFileInput(event: Event): void {
  selectedFile.value = event.target.files[0]
}

function handleUpload(): void {
  selectedFile && uploadFile(selectedFile.value)
}
</script>

<template>
  <div class="container flex-col space-y-10 mx-auto items-center mt-10">
    <h1 class="text-2xl font-semibold flex my-auto">Excel Files</h1>
    <div class="flex items-center">
      <div>
        <input type="file" @change="handleFileInput"
          class="w-50 text-black text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" />
      </div>
      <button class="btn ms-10" @click="handleUpload">Upload</button>
      <a class="btn ms-10" @click.prevent="downloadFile()">
        Download
      </a>
    </div>
    <div>
    </div>
  </div>
</template>
