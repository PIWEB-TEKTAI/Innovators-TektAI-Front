export type submission = {
  _id: string;
  challengeId:string;
  title: string,
  description: string,
  files: [{
    name: string,
    url: string
  }]
  status: 'pending' | 'approved' | 'rejected';
  score: number;
  submissionDate: Date;
}
