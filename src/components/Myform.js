import React,{Component} from "react";
class MyForm extends Component{
    state = {
        form: {first_name:"",last_name:"",email:"", isEdit:false},
        btnName: "Save",
        btnClass: "ui primary button submit-button"
    };
    isEmpty(obj){
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }
    componentDidUpdate(prevProps){
        if(prevProps !== this.props && !this.isEmpty(this.props.customer)){
            this.setState({
                form: {...this.props.customer, isEdit:true},
                btnName: "Update",
                btnClass:"ui orange button submit-button"
            });
            //console.log("update");
        }
    }
    handleChange = event => {
        const {name,value} = event.target;
        let form = this.state.form;
        form[name] =  value;
        this.setState({form});
    }
    onFormSubmit = event => {
        //prevent form submit
        event.preventDefault();

        // form validation
        if(this.formValidation()){
            //send form data to app
            this.props.onFormSubmit(this.state.form)
        }
        //clear form fields
        this.clearFormFields();
    };

    formValidation =  () => {
        //first name
        if(document.getElementsByName("first_name")[0].value === ""){
            alert('Enter First Name');
            return false;
        }

        //last name
        if(document.getElementsByName("last_name")[0].value === ""){
            alert('Enter Last Name');
            return false;
        }

        //email
        if(document.getElementsByName("email")[0].value === ""){
            alert('Enter Email');
            return false;
        }

        return true;
    }
    clearFormFields = () => {
        //change form state
        this.setState({
            form: {first_name:"",last_name:"",email:"", isEdit:false},
        })
        //change the button to save
        this.setState({
            btnName: "Save",
            btnClass:"ui primary button submit-button"
        });
        //clear form field
        document.querySelector(".form").reset();
    };
    render(){
        return (
            <form className="ui form">
                <div className="fields">
                    <div className="four wide field">
                        <label>First Name</label>
                        <input type="text" name="first_name" placeholder="First Name" onChange={this.handleChange} value={this.state.form.first_name}/>
                    </div>

                    <div className="four wide field">
                        <label>Last Name</label>
                        <input type="text" name="last_name" placeholder="Last Name" onChange={this.handleChange} value={this.state.form.last_name}/>
                    </div>

                    <div className="four wide field">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="joe@gmail.com" onChange={this.handleChange} value={this.state.form.email}/>
                    </div>

                    <div className="four wide field">
                        <button className={this.state.btnClass} onClick={this.onFormSubmit}>{this.state.btnName}</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default MyForm;