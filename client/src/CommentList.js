import React from 'react';


export default ({comments}) => {

    const renderedComments = comments.map(comment => {

        let content;

        switch (comment.status) {
            case "approved":
                content = comment.content;
                break;
            case "rejected":
                content = <i>[Comment rejected]</i>;
                break;
            case "pending":
                content= <i>[Comment awaiting moderation...]</i>;
                break;
        
            default:
                content = <i>An error has occured</i>
                break;
        }

        return(
            <li key={comment.id}>
                {content}
            </li>
        );
    })

    return (
        <div>
            <ul>
                {renderedComments}
            </ul>
        </div>
    );

};