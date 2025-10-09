import { describe, it, expect } from 'vitest'
import { scoreDeReponsePourQuestion, scoreMaxPourQuestion } from './questionService'

const situation = 'diag_risques_entreprise'

describe('#scoreDeReponsePourQuestion', () => {
  it('doit retourner le score correct pour une réponse valide', () => {
    const score = scoreDeReponsePourQuestion(situation, 'Q1PG01', 'Q1PG01R2')
    expect(score).toBe(0)
  })

  it('doit retourner 0 pour une réponse invalide', () => {
    const score = scoreDeReponsePourQuestion(situation, 'Q1PG01', 'RéponseInvalide')
    expect(score).toBe(0)
  })

  it('doit retourner 0 pour une question sans réponse', () => {
    const score = scoreDeReponsePourQuestion(situation, 'Q1PG04', 'Lorem Ipsum')
    expect(score).toBe(0)
  })
})

describe('#scoreMaxPourQuestion', () => {
  it('doit retourner le score maximum correct pour une question', () => {
    const maxScore = scoreMaxPourQuestion(situation, 'Q1PG02')
    expect(maxScore).toBe(2)
  })

  it('doit retourner 0 pour une question sans réponse', () => {
    const maxScore = scoreMaxPourQuestion(situation, 'Q1PG04')
    expect(maxScore).toBe(0)
  })
})
