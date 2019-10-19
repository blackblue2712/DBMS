import React from 'react';

class ButtonGuild extends React.Component {

    constructor() {
        super();
        this.state = {
            flag: false
        }
    }

    handleShowDown = (index) => {
        return () => {
            // Array.from(document.querySelectorAll(".s-expandable--content")).map( el => el.display = "none");
            // Array.from(document.querySelectorAll(".js-arrow-up")).map( el => el.classList.add("d-none"));
            // Array.from(document.querySelectorAll(".js-arrow-down")).map( el => el.classList.remove("d-none"));
            let { flag } = this.state;
            let element = document.querySelectorAll(".s-expandable--content")[index];
            let iconUp = document.querySelectorAll(".js-arrow-up")[index];
            let iconDw = document.querySelectorAll(".js-arrow-down")[index];
            if(element) {
                if(!flag) {
                    element.style.display = "block";
                    element.classList.add('is-expanded');
                    element.classList.remove('is-expandable');
                    iconDw.classList.add("d-none");
                    iconUp.classList.remove("d-none");
                    
                } else {
                    element.classList.remove('is-expanded');
                    element.classList.add('is-expandable');
                    iconUp.classList.add("d-none");
                    iconDw.classList.remove("d-none");
                    setTimeout( () => {
                        element.style.display = "none"
                    }, 200)
                }
                this.setState( (prevState, props) => {
                    return { flag: !prevState.flag }
                })
            }
        }
    }


    render() {
        return (
            <>
                <div className={`wrap-button-guild ${this.props.class || ''}`}>
                    <button className="button-guild d-flex algin-items-center w-100 py12" onClick={this.handleShowDown(this.props.index)}>
                        <div className="d-flex algin-items-center mr-auto">
                            <div className="grid--cell mr12">
                                {this.props.icon}
                            </div>
                            <span className="grid--cell ml12 fw-bold">{this.props.title}</span>
                        </div>
                        <div >
                            <div className="js-arrow-down"><svg aria-hidden="true" className="svg-icon iconArrowDownAlt" width="18" height="18" viewBox="0 0 18 18"><path d="M16.01 6.43l-1.4-1.41L9 10.6 3.42 5l-1.4 1.42 7 7 7-7z"></path></svg></div>
                            <div className="js-arrow-up d-none"><svg aria-hidden="true" className="svg-icon iconArrowUpAlt" width="18" height="18" viewBox="0 0 18 18"><path d="M16.01 11.62l-1.4 1.4L9 7.45l-5.59 5.59-1.4-1.41 7-7 7 7z"></path></svg></div>
                        </div>
                    </button>
                    <div className="s-expandable--content pb12 ml16 is-expanded">
                        {this.props.child}
                    </div>
                </div>
            </>
        )
    }
}

export default ButtonGuild;