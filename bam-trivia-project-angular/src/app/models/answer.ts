// public int Id { get; set; }
// public int QuestionId { get; set; }
// public string Answer { get; set; }
// public bool Correct { get; set; }

export class Answer {
    id: number;
    questionId: number;
    // questionString: string;
    answer: string;
    correct: boolean;
    questionText: string;
    quizId: number;
    userId: number;
}