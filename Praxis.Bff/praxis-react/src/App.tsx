import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Layout from './components/Layout';
import { User, anonymousUser, UserStateProvider } from './contexts/user-context';
import { Habit, HabitsProvider } from './contexts/habits-context';
import { HistoryItem, HistoryProvider } from './contexts/history-context';
import {getUser} from './services/user-service';
import {getAllHabitsAsync} from './services/habits-service';
import {getHistoryAsync} from './services/history-service';
import Spinner from './components/utils/Spinner';
import { Settings } from 'luxon';

import {shouldPolyfill} from '@formatjs/intl-datetimeformat/should-polyfill'
async function polyfill(locale: string) {
  const unsupportedLocale = shouldPolyfill(locale);
  // This locale is supported
  if (!unsupportedLocale) {
    return Promise.resolve();
  }

  // Load the polyfill 1st BEFORE loading data
  await import('@formatjs/intl-datetimeformat/polyfill-force');

  // Parallelize CLDR data loading
  const dataPolyfills = [
    import('@formatjs/intl-datetimeformat/add-all-tz'),
    import(`../node_modules/@formatjs/intl-datetimeformat/locale-data/${unsupportedLocale}.js`),
  ]
  await Promise.all(dataPolyfills);
}


function App() {
  const [showSpinner, setShowSpinner] = useState(true);
  const [user, setUser] = useState<User>(anonymousUser);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    (async function fetchData(){
        const u = await getUser();
        setUser(u);
        if(u && u.isLoggedIn) {
          await polyfill(u.locale);
          Settings.defaultLocale = u.locale;
          Settings.defaultZone = u.timezone;
          const h = await getAllHabitsAsync();
          setHabits(h);
          const hi = await getHistoryAsync();
          setHistory(hi);
        }
        setShowSpinner(false);
    })();
  }, [])

  return (
    <div>
        {showSpinner?
        <div className="w-screen h-screen flex items-center justify-between bg-main-light text-main-dark">
          <div className="flex-grow"></div>
          <div className="flex-grow-0">
          <Spinner show={showSpinner} />
          </div>
          <div className="flex-grow"></div>
        </div>
        :<BrowserRouter>
          <UserStateProvider user={user}>
            <HabitsProvider habits={habits}>
              <HistoryProvider history={history}>
                <Layout>
                  <Routes />
                </Layout>
              </HistoryProvider>
            </HabitsProvider>
          </UserStateProvider>
        </BrowserRouter>
      }
      </div>
  );
}

export default App;
