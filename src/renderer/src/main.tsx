import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { IntlProvider } from 'react-intl'
import App from './App'
import { defaultLocale, getMessages } from './locales'

const locale = defaultLocale
const messages = getMessages(locale)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* @ts-expect-error - Type incompatibility between React 18 and react-intl v7 */}
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <App />
    </IntlProvider>
  </React.StrictMode>
)
