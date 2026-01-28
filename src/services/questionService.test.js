import { describe, it, expect } from 'vitest'
import {
  reponsesPourQuestion,
  scoreDeReponsePourQuestion,
  scoreMaxPourQuestion,
  detailPourQuestion,
} from './questionService'

const situation = 'diag_risques_entreprise'

describe('#reponsesPourQuestion', () => {
  it('doit retourner les réponses pour une question valide', () => {
    const reponses = reponsesPourQuestion(situation, 'Q1IC01')
    expect(reponses).toEqual(
      expect.arrayContaining([
        {
          intitule: '11 à 49 salariés/agents',
          nom_technique: 'Q1IC01R03',
          score: 0,
        },
      ]),
    )
  })

  it('doit retourner undefined pour une question invalide', () => {
    const reponses = reponsesPourQuestion(situation, 'QuestionInvalide')
    expect(reponses).toBeUndefined()
  })

  it('doit retourner undefined pour une situation invalide', () => {
    const reponses = reponsesPourQuestion('situationInvalide', 'Q1IC01')
    expect(reponses).toBeUndefined()
  })

  it('doit retourner les réponses pour une question existante dans la situation', () => {
    const reponses = reponsesPourQuestion(situation, 'Q1IC02')
    expect(reponses).toEqual(
      expect.arrayContaining([
        {
          intitule: 'Entre 30 et 50 ans',
          nom_technique: 'Q1IC02R02',
          score: 0,
        },
      ]),
    )
  })
})

describe('#scoreDeReponsePourQuestion', () => {
  it('doit retourner le score correct pour une réponse valide', () => {
    const score = scoreDeReponsePourQuestion(situation, 'Q1IC01', 'Q1IC01R2')
    expect(score).toBe(0)
  })

  it('doit retourner 0 pour une réponse invalide', () => {
    const score = scoreDeReponsePourQuestion(situation, 'Q1IC01', 'RéponseInvalide')
    expect(score).toBe(0)
  })

  it('doit retourner 0 pour une question sans réponse', () => {
    const score = scoreDeReponsePourQuestion(situation, 'Q1IC04', 'Lorem Ipsum')
    expect(score).toBe(0)
  })
})

describe('#scoreMaxPourQuestion', () => {
  it('doit retourner le score maximum correct pour une question', () => {
    const maxScore = scoreMaxPourQuestion(situation, 'Q1IC02')
    expect(maxScore).toBe(2)
  })

  it('doit retourner 0 pour une question sans réponse', () => {
    const maxScore = scoreMaxPourQuestion(situation, 'Q1IC04')
    expect(maxScore).toBe(0)
  })
})

describe('#detailPourQuestion', () => {
  it('doit retourner les détails pour une question valide', () => {
    const questionDetails = detailPourQuestion(situation, 'Q1IC01')
    expect(questionDetails).toEqual(
      expect.objectContaining({
        nom_technique: 'Q1IC01',
      }),
    )
  })

  it('doit retourner les détails pour une question valide avec un variant', () => {
    const questionDetails = detailPourQuestion(situation, 'Q1IC01__variant')
    expect(questionDetails).toEqual(
      expect.objectContaining({
        nom_technique: 'Q1IC01',
      }),
    )
  })

  it('doit retourner undefined pour une question invalide', () => {
    const questionDetails = detailPourQuestion(situation, 'QuestionInvalide')
    expect(questionDetails).toBeUndefined()
  })

  it('doit retourner undefined pour une situation invalide', () => {
    const questionDetails = detailPourQuestion('situationInvalide', 'Q1IC01')
    expect(questionDetails).toBeUndefined()
  })
})
