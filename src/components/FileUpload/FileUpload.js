import React, { Component } from 'react';
import axios from 'axios';
import classes from './FileUpload.module.css';
export default class FilesUploadComponent extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {}
    }
    onFileChange(e) {
        this.setState({ file: e.target.files[0] })
    }
    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", this.state.file);
        // console.log(Object.fromEntries(formData.entries())) file info
        axios.post("http://localhost:4000/folder/uploadFile", formData, {
        }).then(response => {
            console.log("res",response.data)
         })
         .then(data => {
            console.log(data)
            alert("Pdf file uploaded")
         })
         .catch(error => {
            console.log(error.response.data?.message)
            alert(error.response.data?.message)
            // throw new Error(error.response.data?.message)
         })

        e.target.reset()
    }

    render() {
        return (
            <>
            <section className={classes.auth}>
            <h1>Upload</h1>
            <form onSubmit={this.onSubmit}>
                <div className={classes.control}>
                    <label htmlFor='file'>Select File</label>
                    <input type='file' id='file' required onChange={this.onFileChange}/>
                </div>
                <div className={classes.actions}>
                    <button>Upload</button>
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={() => window.location.reload(false)}>
                    click here to refresh!
                </button>
        </div>
            </form>
            </section>
            </>
                 
        )
    }
}