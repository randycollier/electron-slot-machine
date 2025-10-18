import enMessagesModule from './en.json'

// Handle different module formats (default export vs named export)
const enMessagesNested = (enMessagesModule as any).default || enMessagesModule

export type Locale = 'en'

// Flatten nested messages for react-intl
// Converts { landing: { title: "X" } } to { "landing.title": "X" }
const flattenMessages = (
  nestedMessages: Record<string, any>,
  prefix = ''
): Record<string, string> => {
  return Object.keys(nestedMessages).reduce((messages: Record<string, string>, key) => {
    const value = nestedMessages[key]
    const prefixedKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'string') {
      messages[prefixedKey] = value
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(messages, flattenMessages(value, prefixedKey))
    }

    return messages
  }, {})
}

const enMessages = flattenMessages(enMessagesNested)

export const messages: Record<Locale, Record<string, string>> = {
  en: enMessages
}

export const defaultLocale: Locale = 'en'

export const getMessages = (locale: Locale): Record<string, string> => {
  const msgs = messages[locale] || messages[defaultLocale]
  return msgs
}

