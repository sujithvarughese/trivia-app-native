import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { openai } from "@/utilities/api"

export type stateProps = {
  score: number,
  highScore: number,
  questions: any[],
  strikes: number,
  questionIndex: number,
  gameOver: boolean,
  showGameOver: boolean,
  category: number,
  loading: boolean,
  showSettings: boolean,
  completed: boolean,
  aiResponse: string,
}

type SetScoreProps = {
  correct: boolean,
  difficulty: string
}

const initialState: stateProps = {
  score: 0,
  highScore: 0,
  questions: [],
  strikes: 0,
  questionIndex: 0,
  gameOver: false,
  showGameOver: false,
  category: 9,
  loading: false,
  showSettings: true,
  completed: false,
  aiResponse: "",
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setNewGame: (state: stateProps): void => {
      state.score = 0
      state.showSettings = false
      state.questionIndex = 0
      state.strikes = 0
      state.gameOver = false
      state.showGameOver = false
    },
    setCategory: (state: stateProps, action: PayloadAction<number>) => {
      state.category = action.payload
    },
    setScore: (state: stateProps, action: PayloadAction<SetScoreProps>) => {
      if (!action.payload.correct) {
        const strikes = state.strikes + 1
        if (strikes >= 3) {
          if (state.score > state.highScore) {
            state.highScore = state.score
          }
          state.gameOver = true
          state.showGameOver = true
        }
        state.strikes = strikes
        state.completed = true
        return
      }
      let multiplier = 0;
      if (action.payload.difficulty === "Easy") {
        multiplier += 100
      } else if (action.payload.difficulty === "Medium") {
        multiplier += 200
      } else if (action.payload.difficulty === "Hard") {
        multiplier += 500
      }
      state.completed = true
      state.score += multiplier
    },
    setNextQuestion: (state) => {
      state.questionIndex += 1
      state.completed = false
    },
    setShowGameOver: (state, action) => {
      state.showGameOver = action.payload || !state.showGameOver
    },
    setShowSettings: (state, action) => {
      state.showSettings = action.payload || !state.showSettings
    },
    closeAiResponse: (state) => {
      state.aiResponse = ""
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.questions = action.payload
      state.questionIndex = 0
      state.loading = false
      state.completed = false
    })
    builder.addCase(fetchQuestions.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchQuestions.rejected, state => {
      state.loading = false
      console.log("Failed to retrieve questions")
    })
    builder.addCase(fetchAiResponse.fulfilled, (state, action) => {
      state.aiResponse = action.payload
      state.loading = false
    })
    builder.addCase(fetchAiResponse.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchAiResponse.rejected, state => {
      state.loading = false
      console.log("Failed to retrieve response from AI")
    })
  }
})

export const fetchQuestions = createAsyncThunk("game/fetchQuestions", async (category: number) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=25&category=${category}&type=multiple&encode=url3986`)
  type resultsType = {
    category: string,
    difficulty: string,
    question: string,
    incorrect_answers: string[],
    correct_answer: string
  }
  const { results } = await response.json()
  return results.map((result: resultsType) => {
    const category = decodeURIComponent(result.category)
    const difficulty = result.difficulty.charAt(0).toUpperCase().concat(result.difficulty.substring(1))
    const question = decodeURIComponent(result.question)
    const incorrectAnswers = result.incorrect_answers.map((answer: string) => {
      return {
        response: decodeURIComponent(answer),
        correct: false
      }
    })
    const correctAnswer = {
      response: decodeURIComponent(result.correct_answer),
      correct: true
    }
    const choices = [...incorrectAnswers, correctAnswer]
    choices.sort(() => Math.random() - 0.5)
    return { category, difficulty, question, choices }
  })
})

export const fetchAiResponse = createAsyncThunk("game/fetchAiResponse", async (question: string) => {
  const response = await openai.post("", {
    model: "gpt-3.5-turbo-0125",
    max_tokens: 400,
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant for a trivia application to help users get quick facts about trivia questions. You will be given a question and an answer, and should give a brief explanation about the subject. Use light humor when needed: ${question}`
      },
    ]
  })
  return response.data.choices[0].message.content
})

export default gameSlice.reducer;
export const { setNewGame, setCategory, setScore, setNextQuestion, setShowGameOver, setShowSettings, closeAiResponse } = gameSlice.actions