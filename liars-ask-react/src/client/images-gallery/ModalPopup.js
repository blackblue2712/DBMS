import React, { useEffect, useState } from 'react';
import icon from '../../images/icon-photo.svg';
import { isAuthenticated } from '../../controllers/userController';
import { postUploadImage } from '../../controllers/galleryController';
import Notify from '../components/Notify';

const ModalPopup = props => {
    const formData = new FormData();
    const [showNotify, setShowNotify] = useState("");

    const closeDialog = () => {
        document.querySelector(".s-modal").style.display = "none";
    }
    
    const previewPhoto = (event) => {
        let reader = new FileReader();
        reader.onload = function () {
            let inputAvatar = document.getElementById('preview-img');
            inputAvatar.src = reader.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        formData.append("photo", event.target.files[0]);
    }

    const saveImg = () => {
        let userId = isAuthenticated().user._id;
        let token = isAuthenticated().token;
        let btn = document.getElementById("wrap-btn-loading");
        btn.classList.add("btn-loading");
        if(formData.get("photo")) {
            postUploadImage(formData, userId, token)
            .then( res => {
                if(res.imageURL) {
                    closeDialog();
                    props.handleUploadedImage(res.imageURL);
                    setShowNotify(res.message)
                }
                btn.classList.remove("btn-loading");
            })
            .catch( err => {
                setShowNotify("Error occur");
                btn.classList.remove("btn-loading");
            })
        } else {
            alert("Choose file upload!");
            btn.classList.remove("btn-loading");
        }
        
    }

    useEffect( () => {
        // document.querySelector("#root").onclick = () => {
        //     document.querySelector(".s-modal").style.display = "none";
        // }
    })
    

    return (
        <>
            <Notify />
            {showNotify !== "" &&  <Notify class="on" text={showNotify} clearMess={setShowNotify} />}
            <div className="s-modal js-welcom-modal ps-fixed" style={{display: "none"}}>
                
                <div
                    className="s-modal--dialog js-modal--dialog wmx4 ps-relative"
                    draggable={true}
                >
                    {/* <h1 className="s-modal--header">Upload your photo</h1> */}
                    <div className="s-modal--body">
                        <div className="choose-images" id="choose-images">
                            <div className="d-flex justify-content-center">
                                <button className="s-btn s-btn__outline s-btn__hovero mt24 bd-none d-flex align-items-center" onClick={ () => document.getElementById("img-gallery").click()}>
                                    <img src={icon} alt="icon-photo" width="24" style={{ background: "#afafaf", borderRadius: "50%"}}/>&nbsp;Choose
                                    <input type="file" id="img-gallery" className="d-none" onChange={previewPhoto}/>
                                </button>
                            </div>
                            <div className="preview-area">
                                <img id="preview-img" style={{maxWidth: "400px"}} src="" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="s-modal--footer">
                        <div id="wrap-btn-loading">
                            <button
                                className="s-btn s-btn__outline s-btn__primary mt24 mr24"
                                id="save-photo"
                                onClick={saveImg}
                            >Save img</button>
                        </div>
                        
                    </div>
                    
                    <button className="s-modal--close s-btn js-modal-close ps-absolute" onClick={closeDialog}>
                        <svg aria-hidden="true" className="svg-icon iconClearSm" width="14" height="14" viewBox="0 0 14 14"><path d="M12 3.41L10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41z"></path></svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default ModalPopup;