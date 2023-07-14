<template>
    <div class="w-[90%] mt-[1%] ml-[5%] bg-white rounded-lg shadow-md object-cover">
      <div>
        <div class="h-full w-full">
            <div class="p-6">
                <div class="flex items-baseline">
                    <span class="text-gray-600 text-md uppercase font-bold tracking-wide">Migrations management</span>
                    <button @click="isOpenHeader = !isOpenHeader" class="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path v-if="!isOpenHeader" stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            <path v-if="isOpenHeader" stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </div>
                <div v-if="isOpenHeader">
                    <div class="flex items-baseline">
                        <span class="text-gray-600 text-xs uppercase font-semibold tracking-wide">Go up:</span>
                        <button @click="onUpAsync()" class="mt-1 ml-2 py-1 px-2 rounded-md bg-green-700 text-green-300 text-xs uppercase font-semibold tracking-wide">Up</button>
                    </div>
                    <div class="flex items-baseline">
                        <span class="text-gray-600 text-xs uppercase font-semibold tracking-wide">Go one migration down:</span>
                        <button @click="onDownAsync()" class="mt-1 ml-2 py-1 px-2 rounded-md bg-violet-700 text-violet-300 text-xs uppercase font-semibold tracking-wide">Down</button>
                    </div>
                    
                </div>
            </div>
        </div>
      </div>
      <div v-if="isOpenHeader && showMigrated()" class="border-t-2 border-gray-200">
        <ul id="available-migrations" class="px-6 py-3">
            <li v-for="migration in migrated.migrations" class="mt-1 flex text-gray-600 text-sm" :key="migration">
                <svg :class="migrated.direction === 'up'? 'text-green-300' : 'text-red-500'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                <span class="font-semibold tracking-wide">{{ migration }}</span>
            </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>

  export default {
    props: ['migrated', 'upAsync', 'downAsync'],
    data() {
        return {
            isOpenHeader: false,
        }
    },
    methods: {
        async onUpAsync() {
            await this.upAsync();
        },
        async onDownAsync() {
            await this.downAsync();
        },
        showMigrated() {
            return this.migrated && this.migrated.migrations.length > 0;
        }
    }
  }
  </script>