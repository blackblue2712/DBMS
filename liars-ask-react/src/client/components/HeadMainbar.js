import React from 'react';
import AskAQuestion from './AskAQuestion';

const HeadMainbar = props => {
    return (
        <div className="main-head">
            <div className="grid d-flex align-items-centers mb16">
                <h1 className="fs-headline1 mr-auto">Top Question</h1>
                <div>
                    <AskAQuestion />
                </div>
            </div>
            <div className="grid-ai mb16 text-right">
                <div className="s-btn-group">
                <a href="#popular" className="s-btn s-btn__outline s-btn__primary">Interesting</a>
                    <a href="#popular" className="s-btn s-btn__outline s-btn__primary">Popular</a>
                    <a href="#popular" className="s-btn s-btn__outline s-btn__primary">Hot</a>
                    <a href="#popular" className="s-btn s-btn__outline s-btn__primary">Week</a>
                </div>
            </div>
        </div>
    )
}

export default HeadMainbar;