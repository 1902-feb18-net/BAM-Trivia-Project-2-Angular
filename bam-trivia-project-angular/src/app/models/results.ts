export class Result {
    // not needed since posting to db will auto fill (resultId: number)
    userQuizId: number;
    qId: number;
    userAnswer: string;
    correct: boolean;
}