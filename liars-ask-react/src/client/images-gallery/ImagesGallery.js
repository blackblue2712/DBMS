import React from 'react';
import "./ImagesGallery.css";
import ModalPopup from './ModalPopup';
import  { getUploadImages } from '../../controllers/galleryController';
import { isAuthenticated } from '../../controllers/userController';
import Copy from '../../images/copy.png';
import Copy1 from '../../images/copy1.png';
import Close from '../../images/close.png';
import Notify from '../components/Notify';
import ImgCloud from '../../images/cloud1.png';
import { putDeleteUploadedImage } from '../../controllers/galleryController';

class ImagesGallery extends React.Component {
    constructor() {
        super();
        this.state = {
            images: [],
            message: ""
        }
    }

    clearMess = () => {
        this.setState( {message: ""} );
    }

    handleUploadedImage = (url) => {
        this.setState( {images: [[url,...this.arrImgs1], this.arrImgs2, this.arrImgs3, this.arrImgs4]} )
    }

    async componentDidMount() {
        let usreId = isAuthenticated().user._id;
        let data = await getUploadImages(usreId);
        console.log(data);
        
        this.arrImgs1 = [];
        this.arrImgs2 = [];
        this.arrImgs3 = [];
        this.arrImgs4 = [];

        // try 4 for loop
        // if(data.images && data.images.length > 4) {
            for(let i = 0; i < data.images.length; i+=4) {
                this.arrImgs1 = [...this.arrImgs1, data.images[i].image_url];
                if(data.images[i+1] !== undefined) {
                    this.arrImgs2 = [...this.arrImgs2, data.images[i+1].image_url];
                    if(data.images[i+2] !== undefined) {
                        this.arrImgs3 = [...this.arrImgs3, data.images[i+2].image_url];
                        if(data.images[i+3] !== undefined) {
                            this.arrImgs4 = [...this.arrImgs4, data.images[i+3].image_url];
                        }
                    }
                }
            }
            this.setState( {images: [this.arrImgs1, this.arrImgs2, this.arrImgs3, this.arrImgs4]} );
        // } 
        // else if(data.images && data.images.length <= 4) {
        //     this.arrImgs1 = data.images.image_url
        //     this.setState( {images: [this.arrImgs1]} );
        // }

    }

    handleCopyText = (text) => {
        navigator
            .clipboard
            .writeText(text)
            .then(function() {
                document.getElementById(text).src = Copy;
            }, function(err) {
                
            });
    }

    handleDeleteUploadedImage = (img, i) => {
        let flag = window.confirm("Are you sure to delete this photo?");
        if(flag) {
            try {
                let userId = isAuthenticated().user._id;
                let token = isAuthenticated().token;
                let photoName = img.split("/")[img.split("/").length - 1].split(".")[0];
                
                let wrap = document.querySelector(".card-count-" + i);
                wrap.classList.add("btn-loading");
                putDeleteUploadedImage(userId, {img, photoName}, token)
                .then( res => {
                    if(res.message === "Photo deleted") {
                        wrap.remove();
                    }
                    this.setState( {message: res.message} );
                })
            } catch(err) {
                console.log(err);
                let wrap = document.querySelector(".card-count-" + i);
                wrap.classList.remove("btn-loading");
                this.setState( {message: "Error occur (console)"} );
            }
        }
    }

    render() {
        let { images, message } = this.state;
        console.log(this.state)
        
        return (
            <div id="content">
                <div className="main-head">
                    <Notify />  
                    {message !== "" &&  <Notify class="on" text={message} clearMess={this.clearMess} />}
                    <div className="grid d-flex align-items-centers mb16">
                        <h1 className="fs-headline1 mr-auto">Images Gallery</h1>
                        <button
                            className="s-btn s-btn__outline s-btn__primary s-btn__primary d-flex align-items-center"
                            onClick={() => document.getElementsByClassName("js-welcom-modal")[0].style.display = "block"}
                        >
                            <img src={ImgCloud} width="18" alt="upload" />&nbsp;Upload photo
                        </button>
                    </div>
                    <p className="mb24 f13 fw350">
                        <hr/>
                    </p>
                </div>

                {/* LIST WRAPPER  */}
                <div id="images-gallery">
                    <ModalPopup handleUploadedImage={this.handleUploadedImage} />
                    <div className="mini-list">
                        {/* LIST ITEM */}
                        {
                            images.map( (arr, i) => {
                                return (
                                    <div className="grid-column" key={i}>
                                        {
                                            arr.map( (img, i) => {
                                                let r = Math.random().toString(36).substring(7);
                                                return (
                                                    <div className={`image-card ps-relative card-count-${r}`} key={i}>
                                                        <button
                                                            className="s-btn s-btn__outline s-btn__hovero bd-none p-absolute btn-copy d-none"
                                                            onClick={() => this.handleCopyText(img)}
                                                        >
                                                            <img src={Copy1} width={30} alt="img-copy" id={img}/>
                                                        </button>
                                                        <button
                                                            className="s-btn s-btn__outline s-btn__hovero bd-none p-absolute btn-close d-none"
                                                            onClick={() => this.handleDeleteUploadedImage(img, r)}
                                                        >
                                                            <img src={Close} width={30} alt="img-delete" title="delete this photo"/>
                                                        </button>
                                                        <img width="220" className="w-220 single-image" src={img} alt="imgs-gallery" loading="lazy"/>
                                                        <div className="image-url">
                                                            <span>{img}</span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>

                <div className="clear-fix"></div>
            </div>
        )
    }
}

export default ImagesGallery;