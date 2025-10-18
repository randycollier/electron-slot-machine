import { useIntl } from 'react-intl'
import { WIN_AMOUNT_MAP, COST_PER_SPIN } from '@/utils/constants'
import '@/assets/how-to-play.css'

const HowToPlay = (): JSX.Element => {
  const { formatMessage } = useIntl()

  // Translations
  const translations = {
    title: formatMessage({ id: 'howToPlay.title', defaultMessage: 'How to Play' }),
    rulesTitle: formatMessage({ id: 'howToPlay.rulesTitle', defaultMessage: 'Game Rules:' }),
    rule1: formatMessage({ id: 'howToPlay.rule1' }, { cost: COST_PER_SPIN }),
    rule2: formatMessage({ id: 'howToPlay.rule2', defaultMessage: 'Match symbols to win prizes' }),
    rule3: formatMessage({
      id: 'howToPlay.rule3',
      defaultMessage: 'The more valuable the match, the bigger the payout!'
    }),
    rule4: formatMessage({
      id: 'howToPlay.rule4',
      defaultMessage: 'Try to achieve the highest balance possible'
    }),
    winningsTitle: formatMessage({
      id: 'howToPlay.winningsTitle',
      defaultMessage: '🏆 Winning Combinations:'
    })
  }

  const winCombinations = Object.entries(WIN_AMOUNT_MAP)
    .map(([symbols, payout]) => ({ symbols, payout }))
    .sort((a, b) => b.payout - a.payout) // Sort by payout (highest first)

  return (
    <div className="how-to-play">
      <h2>{translations.title}</h2>

      <section className="rules">
        <h3>{translations.rulesTitle}</h3>
        <ul>
          <li>{translations.rule1}</li>
          <li>{translations.rule2}</li>
          <li>{translations.rule3}</li>
          <li>{translations.rule4}</li>
        </ul>
      </section>

      <section className="winning-combinations">
        <h3>{translations.winningsTitle}</h3>
        <div className="win-list">
          {winCombinations.map((combo, index) => (
            <div key={index} className="win-item">
              <span className="symbols">{combo.symbols}</span>
              <span className="arrow">→</span>
              <span className="payout">
                {formatMessage({ id: 'howToPlay.creditsLabel' }, { amount: combo.payout })}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HowToPlay
