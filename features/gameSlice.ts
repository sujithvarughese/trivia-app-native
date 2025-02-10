import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

type stateProps = {
  score: number,
  highScore: number,
  completed: any[],
  questions: any[],
  gameOver: boolean,
  category: number,
  loading: boolean,
}

const initialState: stateProps = {
  score: 0,
  highScore: 0,
  completed: [],
  questions: [],
  gameOver: false,
  category: 9,
  loading: false
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setNewGame: (state: stateProps, action): void => {
      state.questions = action.payload
      state.score = 0
      state.completed.push(state.questions.pop())
    },
    setQuestions: (state, action) => {
      state.questions = action.payload
    },
    addQuestion: (state) => {
      state.completed.push(state.questions.pop())
    },
    setScore: (state, action) => {
      let multiplier = 0;
      if (action.payload === "Easy") {
        multiplier += 100
      } else if (action.payload === "Medium") {
        multiplier += 200
      } else if (action.payload === "Hard") {
        multiplier += 500
      }
      state.score += multiplier
    },
    setGameOver: (state) => {
      if (state.score > state.highScore) {
        state.highScore = state.score
      }
      state.gameOver = true
    },
    unsetGameOver: (state) => {
      state.gameOver = false
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.questions = action.payload
      state.loading = false
    })
    builder.addCase(fetchQuestions.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchQuestions.rejected, state => {
       state.loading = false
      console.log("Failed to retrieve questions")
    })
  }
})

export const fetchQuestions = createAsyncThunk("game/fetchQuestions", async (category: 9) => {
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy&type=multiple`)
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

export default gameSlice.reducer;
export const { setNewGame, setQuestions, addQuestion, setScore, setGameOver, unsetGameOver } = gameSlice.actions