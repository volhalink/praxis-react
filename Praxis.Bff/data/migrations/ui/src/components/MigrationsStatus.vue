<template>
    <div class="w-[90%] mt-[1%] ml-[5%] bg-white rounded-lg shadow-md object-cover">
        <div class="h-full w-full">
            <div class="p-6">
              <div class="flex items-baseline">
                    <span class="text-gray-600 text-md uppercase font-bold tracking-wide">Migrations status</span>
                    <button @click="isOpenHeader = !isOpenHeader" class="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path v-if="!isOpenHeader" stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            <path v-if="isOpenHeader" stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </div>
                <div v-if="isOpenHeader">
                    <ul id="history-migrations" class="lg:max-w-2xl w-fit">
                        <li v-for="migration in status" class="mt-1 text-gray-600 text-sm" :key="migration.fileName">
                          <div class="mt-1 flex items-baseline justify-between">
                            <span :class="migration.appliedAt.toUpperCase() === 'PENDING'? 'text-amber-600' : 'text-green-800'" class="text-md uppercase font-semibold tracking-wide">{{ migration.appliedAt}}</span>
                            <span class="ml-3 text-gray-800 text-xs uppercase font-semibold tracking-wide">{{ migration.fileName }}</span>
                          </div>
                        </li>
                    </ul>   
               </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['status'],
    data() {
      return {
        isOpenHeader: false,
      }
    }
  }
  </script>