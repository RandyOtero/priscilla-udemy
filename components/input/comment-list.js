import classes from './comment-list.module.css';

function CommentList(props) {
  const { items } = props;
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {items.map(item => 
      <div>
      <li key={item._id}> {/* correction du message d'erreur "each child should have a unique key" */}
        <p>{item.text}</p>
        <div>
          By <address>{item.name}</address>
        </div>
      </li>
      </div>
      )}
    </ul>
  );
}

export default CommentList;