import { useState } from 'react';
import { useForm } from 'react-hook-form';

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

  const [serverMsg, setServerMsg] = useState(null);

  const onSubmit = async (data) => {
    setServerMsg(null);
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (result.success) {
        setServerMsg({ type: 'success', text: 'Signup validated successfully!' });
        reset();
      } else {
        setServerMsg({
          type: 'error',
          text: result.errors.map((e) => e.message).join(' ')
        });
      }
    } catch {
      setServerMsg({ type: 'error', text: 'Failed to connect to server.' });
    }
  };

  const validationRules = {
    username: {
      required: 'Username is required',
      minLength: {
        value: 3,
        message: 'Username must be at least 3 characters'
      }
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address'
      }
    },
    password: {
      required: 'Password is required',
      minLength: {
        value: 6,
        message: 'Password must be at least 6 characters'
      }
    }
  };

  return (
    <div className="form-wrapper">
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 className="form-title">Sign Up</h2>

        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            aria-invalid={errors.username ? 'true' : 'false'}
            {...register('username', validationRules.username)}
          />
          {errors.username && <p className="error">{errors.username.message}</p>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', validationRules.email)}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            aria-invalid={errors.password ? 'true' : 'false'}
            {...register('password', validationRules.password)}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <p className="watch-line">
          Username live: <strong>{watch('username')}</strong>
        </p>

        {serverMsg && (
          <p className={`server-msg ${serverMsg.type}`}>{serverMsg.text}</p>
        )}

        <button type="submit" className="submit-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Form;