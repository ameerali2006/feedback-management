const FeedbackList = ({ feedbacks }: { feedbacks: any[] }) => (
  <ul className="space-y-3">
  {feedbacks.map((f) => (
    <li
      key={f._id}
      className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200"
    >
      <span className="text-gray-800 leading-relaxed">{f.message}</span>
    </li>
  ))}
</ul>
  );
  
  export default FeedbackList;