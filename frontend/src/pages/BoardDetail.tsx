import { useParams } from 'react-router-dom';

export default function BoardDetail() {
  const { boardId } = useParams<{ boardId: string }>();
  return (
    <div>
      <h1>Board Details</h1>
      <p>Showing details for board <strong>{boardId}</strong></p>
      {/* Later: render columns, cards, chat */}
    </div>
  );
}
