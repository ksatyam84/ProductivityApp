import React from 'react';
import {Link} from 'react-router-dom';
import '../css/postitem.css'

const PostItem = ({title, body, id}) => {
  return (
    <div>
      <li className="list-group-item postitem">
        <Link to={"/post/" + id}>
          <h3>{title}</h3>
        </Link>
        <p>{body}</p>
      </li>
    </div>
  );
};

export default PostItem;