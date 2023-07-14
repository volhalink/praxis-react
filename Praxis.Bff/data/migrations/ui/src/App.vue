<template>
    <div id='app' class='antialiased text-gray-900'>
      <div>
        <div v-if="error">
          <div class="w-[90%] mt-6 ml-[5%] bg-red-200 rounded-lg shadow-md object-cover">
            <span class="text-red-600 text-md uppercase font-bold tracking-wide">{{ error }}</span>
          </div>
        </div>
        <div>
          <MigrationsStatus :status="status" />
          <MigrationsManagement :migrated="migrated" :upAsync="upAsync" :downAsync="downAsync" />
        </div>
      </div>
    </div>
</template>

<script>
import MigrationsStatus from './components/MigrationsStatus';
import MigrationsManagement from './components/MigrationsManagement';

import { MigrationsService } from './services/migrations-service';
const migrationsService = new MigrationsService();
const status = await migrationsService.getStatusAsync();

export default {
  name: 'app',
  components: {
    MigrationsStatus,
    MigrationsManagement,
  },
  data() {
    return {
      status: status,
      migrated: {
        migrations: [],
        direction: 'none'
      },
      migrationsService: migrationsService,
      error: null,
    }
  },
  methods: {
    async upAsync() {
      const {migrated, error} = await migrationsService.upAsync();
      this.error = error;
      this.migrated = {
        migrations: migrated,
        direction: 'up'
      };
      this.status = await migrationsService.getStatusAsync();
    },
    async downAsync() {
      const {migrated, error} = await migrationsService.downAsync();
      this.error = error;
      this.migrated = {
        migrations: migrated,
        direction: 'down'
      };
      this.status = await migrationsService.getStatusAsync();
    }
  },
}
</script>

<style src='./assets/tailwind.css'></style>