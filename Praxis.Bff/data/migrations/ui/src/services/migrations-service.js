import config from '../config';

const urls = {
  status: `${config.migrationsApiUrl}`,
  up: `${config.migrationsApiUrl}/up`,
  down: `${config.migrationsApiUrl}/down?`
}

const getAsync = async(url) => {
  const response = await fetch(url, {
    cache: "no-cache",
    headers: {
        "Content-Type": "application/json",
    }
  });
  return await response.json();
}

const postAsync = async(url) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
          "Content-Type": "application/json",
      }
    });
    const { migrated } = await response.json();

    return {
      migrated: migrated,
      error: null
    }
  } catch(error) {
    return {
      migrated: [],
      error: error
    }
  }
}

export class MigrationsService {
  async getStatusAsync() {
    return await getAsync(urls.status);
  };

  async upAsync() {
    return await postAsync(urls.up);
  }

  async downAsync() {
    return await postAsync(urls.down);
  }
}