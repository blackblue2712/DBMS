import React from 'react';
import { Link } from 'react-router-dom';

const AskAQuestion = (props) => {
    return <Link to="/questions/ask" className="s-btn s-btn__outline s-btn__primary">Ask Question</Link>
}

export default AskAQuestion;