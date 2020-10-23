import React, { Component } from "react";
import Files from "react-files";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import cogoToast from "cogo-toast";
import { connect } from "react-redux";
import { toggleProfilePictureModal, updateProfilePic, getCurrentProfile } from "../../actions/profile";
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

class ProfilePicModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      open: true,
    };

    this.cropper = React.createRef();

    this.onFileSelected = this.onFileSelected.bind(this);
    this.onFileError = this.onFileError.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
  }

  componentWillUnmount() {
    this.setState(() => ({
      file: null,
    }));
  }
 
  handleClickOpen(){
    this.setState({ open: true })
  };

  handleClose = () => {
    this.props.toggleProfilePictureModal();
    this.setState({ open: false })
    console.log(this.state.open)
  };

  onFileSelected = (File) => {
    this.setState({
      file: File[0]
    });
    
  }

  onFileError(error) {
    cogoToast.info(`Whoops, there was a problem with the image 🙈.`, {
      position: "bottom-right",
    });
  }

  uploadPicture =  async () =>{
    const crop = this.cropper.current.cropper.getData();
    let formData = new FormData();
    formData.append("image", this.state.file);
    await this.props.updateProfilePic(formData);
    
    
    setTimeout(() => {
      
      this.props.getCurrentProfile();
    }, 2000)
    this.handleClose();
  }

  render() {

    return (
       <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Profile Picture</DialogTitle>
        
        <DialogContent>
      
          {!this.state.file && (
            <Files
              className="dropzone mt-2"
              dropActiveClassName="dropzone--active"
              accepts={["image/png", "image/jpg", "image/jpeg"]}
              onChange={this.onFileSelected}
              onError={this.onFileError}
              maxFileSize={10000000}
              minFileSize={0}
              clickable
            >
              <div className="d-flex flex-column h-100 justify-content-center">
                <h2 className="text-center">
                  <i className="far fa-file-image"></i>
                </h2>
                <p className="text-center mb-0">
                  Drag and drop your image here or...
                </p>
                <p className="text-center mb-0 btn-link cursor-pointer">
                  Upload one from your device
                </p>
              </div>
            </Files>
          )}
          {this.state.file && (
            <Cropper
              ref={this.cropper}
              src={this.state.file.preview.url}
              style={{ height: 500, width: "100%" }}
              // Cropper.js options
              dragMode="move"
              zoomable={false}
              aspectRatio={1}
              viewMode={2}
              responsive={true}
              guides={false}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.uploadPicture} color="primary">
            Upload
          </Button>
        </DialogActions>
        
      </Dialog>
    
      
    );
  }
}
 

const stateToProps = (state) => ({
  isVisible: state.profile.profilePicModal.isVisible,
});

const dispatchToProps = (dispatch) => ({
  //changeImage: (binary, crop) => dispatch(changeImage(binary, crop)),
  updateProfilePic: (binary) => dispatch(updateProfilePic(binary)),
  toggleProfilePictureModal: () => dispatch(toggleProfilePictureModal()),
  getCurrentProfile: () => dispatch(getCurrentProfile())
});

export default connect(stateToProps, dispatchToProps)(ProfilePicModal);
