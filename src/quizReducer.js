export const initialState = {
    currentQuestionIndex: -1,
    score: 0,
    isQuizStarted: false,
    isQuizFinished: false,
    previousScore: null,
  };
  
  export function quizReducer(state, action) {
    switch (action.type) {
      case 'START_QUIZ':
        return {
          ...state,
          currentQuestionIndex: 0,
          score: 0,
          isQuizStarted: true,
          isQuizFinished: false
        };
      case 'ANSWER_QUESTION':
        return {
          ...state,
          score: action.payload.isCorrect ? state.score + 1 : state.score
        };
      case 'NEXT_QUESTION':
        {
          const nextIndex = state.currentQuestionIndex + 1;
          return {
            ...state,
            currentQuestionIndex: nextIndex,
            isQuizFinished: nextIndex >= action.payload.totalQuestions
          };
        }
      case 'TIME_UP':
        {
          const nextIndex = state.currentQuestionIndex + 1;
          return {
            ...state,
            currentQuestionIndex: nextIndex,
            isQuizFinished: nextIndex >= action.payload.totalQuestions
          };
        }
      case 'FINISH_QUIZ':
        return {
          ...state,
          isQuizFinished: true
        };
      case 'RESTART_QUIZ':
        return {
          ...state,
          previousScore: state.score,
          currentQuestionIndex: 0,
          score: 0,
          isQuizStarted: true,
          isQuizFinished: false
        };
      default:
        return state;
    }
  }
  