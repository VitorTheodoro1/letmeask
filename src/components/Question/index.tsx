
import './styles.scss';
import { ReactNode } from 'react';
import classnames from 'classnames';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
    isAnswered?: boolean;
    isHighLighted?: boolean
}


export function Question({
    content,
    author,
    isAnswered = false,
    isHighLighted = false,
    children,
}: QuestionProps) {
    return (
        <div className={classnames(
            'question',
            { answered: isAnswered },
            { highlighted: isHighLighted && !isAnswered }
        )}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name}></img>
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>

    );
}