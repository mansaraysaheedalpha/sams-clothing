import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss';


const signUpFormFields = {
    email: "",
    password: "",
};
const SignInForm = () => {
    const [formFields, setFormFields] = useState(signUpFormFields);
    const { email, password } = formFields;

    const changeHandler = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!email || !password) return;
            const { user } = await signInWithEmailAndPassword(auth, email, password);

            console.log("User successfully signed in with email and password" + user);
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                alert("incorrect password");
            } else if (error.code === 'auth/user-not-found') {
                alert("user not found, please sign up");
            }
        }

        setFormFields(signUpFormFields);
    }

    const logGoogle = async () => {
        try {
            await signInWithGooglePopup();
        } catch (error) {
            console.error("Error signing in with Google:", error.message);
        }
    }
    return (
        <div>
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <div className="sign-up-container">
                <form onSubmit={handleSubmit}>
                    <FormInput label="Email" type="email" name="email" value={email} onChange={changeHandler} />
                    <FormInput label="Password" type="password" name="password" value={password} onChange={changeHandler} />

                    <div className='buttons-container'>
                        <Button type="submit">Sign In</Button >
                        <Button type="button" buttonType="google" onClick={logGoogle}>Google Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInForm;