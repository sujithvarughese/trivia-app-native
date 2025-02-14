import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { openai } from "@/utilities/api"

export type stateProps = {
  score: number,
  highScore: number,
  questions: any[],
  strikes: number,
  questionIndex: number,
  gameOver: boolean,
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
    setGameOver: (state) => {
      if (state.score > state.highScore) {
        state.highScore = state.score
      }
      state.gameOver = true
      state.completed = true
    },
    unsetGameOver: (state) => {
      state.gameOver = false
      state.score = 0
      state.strikes = 0
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
  let run = await openai.post("/threads/runs", {
    assistant_id: process.env.EXPO_PUBLIC_ASSISTANT_ID,
    thread: {
      messages: [{role: "user", content: question }]
    }
  })
  const threadId = run.data.thread_id
  const runId = run.data.id
  while (run.data.status !== "completed") {
    run = await openai.get(`/threads/${threadId}/runs/${runId}`)
  }
  if (run.data.status === 'completed') {
    const messages = await openai.get(`/threads/${threadId}/messages`)
    openai.delete(`https://api.openai.com/v1/threads/${threadId}`)
    return messages.data.data[0].content[0].text.value.replace(/\【.*?】/g, '')
  }
})

export default gameSlice.reducer;
export const { setNewGame, setCategory, setScore, setNextQuestion, setGameOver, unsetGameOver, setShowSettings, closeAiResponse } = gameSlice.actions