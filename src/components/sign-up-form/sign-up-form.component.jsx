import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from "../../components/form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            if (!email || !password) return;
            const { user } = await createUserWithEmailAndPassword(auth, email, password)
            await createUserDocumentFromAuth(user, { displayName });
            setFormFields(defaultFormFields)
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert("Email already in use!");
            } else {
                console.error("Error creating user:", error.message);
            }
        }
    }



    return (

        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Display Name" type="text"
                    name="displayName" value={displayName} onChange={handleChange} required />

                <FormInput label="Email" type="email"
                    name="email" value={email} onChange={handleChange} required />

                <FormInput label="Password" type="password"
                    name="password" value={password} onChange={handleChange} required />


                <FormInput label="Confirm Password" type="password"
                    name="confirmPassword"
                    value={confirmPassword} onChange={handleChange} required />
                <Button type="submit">Sign Up</Button >
            </form>

        </div>
    );
};

export default SignUpForm;