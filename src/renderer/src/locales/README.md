# Internationalization (i18n) Setup

This directory contains all translation files and i18n configuration for the application.

## 📁 Structure

```
locales/
├── en.json                      # English translations
├── index.ts                     # i18n configuration
├── useTranslation.example.tsx   # Usage examples (can be deleted)
└── README.md                    # This file
```

## 🚀 Quick Start

The app is already configured with English translations. The `IntlProvider` is set up in `main.tsx`.

## 📝 Usage Examples

### Method 1: FormattedMessage Component (Recommended for JSX)

```tsx
import { FormattedMessage } from 'react-intl'

function MyComponent() {
  return (
    <h1>
      <FormattedMessage id="app.title" />
    </h1>
  )
}
```

### Method 2: useIntl Hook (For variables, attributes, or logic)

```tsx
import { useIntl } from 'react-intl'

function MyComponent() {
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'app.title' })
  
  return <h1>{title}</h1>
}
```

### With Variables

```tsx
// In component
<FormattedMessage 
  id="gameScreen.player" 
  values={{ name: 'John' }} 
/>

// Or with hook
const text = intl.formatMessage(
  { id: 'gameScreen.player' },
  { name: 'John' }
)
```

## 🌍 Adding New Languages

1. Create a new JSON file (e.g., `es.json` for Spanish)
2. Copy the structure from `en.json`
3. Translate all values
4. Update `locales/index.ts`:

```ts
import enMessages from './en.json'
import esMessages from './es.json'

export type Locale = 'en' | 'es'

export const messages: Record<Locale, Record<string, any>> = {
  en: enMessages,
  es: esMessages
}
```

## 📚 Translation Keys Structure

The keys follow a hierarchical structure:

- `app.*` - Application-level translations
- `landing.*` - Landing/home page
- `playerLogin.*` - Login form
- `leaderboard.*` - Leaderboard component
- `gameIntroduction.*` - Game intro screen
- `gameScreen.*` - Main game screen
- `howToPlay.*` - Instructions
- `symbols.*` - Game symbols
- `wins.*` - Winning combinations
- `messages.*` - User feedback messages
- `common.*` - Reusable common strings

## 🔧 Best Practices

1. **Always use translation keys** - Never hardcode strings
2. **Keep keys descriptive** - `gameScreen.insufficientFunds` not `error1`
3. **Group related translations** - Use dot notation for hierarchy
4. **Provide context** - Use comments in JSON for translator notes
5. **Test with long text** - Some languages are longer than English

## 📖 Resources

- [react-intl Documentation](https://formatjs.io/docs/react-intl/)
- [ICU Message Syntax](https://formatjs.io/docs/core-concepts/icu-syntax/)

