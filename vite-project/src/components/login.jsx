import { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../App.css';

function Login() {
  const [serverMessage, setServerMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = async (credentials) => {
    setServerMessage(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        setServerMessage({
          type: 'error',
          text: result.message || 'Invalid email or password.',
        });
        return;
      }

      setServerMessage({ type: 'success', text: 'You are now loged in.' });
    } catch {
      setServerMessage({
        type: 'error',
        text: 'Could not reach the server. Please try again.',
      });
    }
  };

  return (
    <main className="form-wrapper">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <h2 className="form-title">Welcome back</h2>
          <p>login to continue.</p>
        </div>

        <div className="field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Enter a valid email address.',
              },
            })}
          />
          {errors.email && (
            <p className="error" id="email-error">{errors.email.message}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
            {...register('password', {
              required: 'Password is required.',
            })}
          />
          {errors.password && (
            <p className="error" id="password-error">{errors.password.message}</p>
          )}
        </div>

        {serverMessage && (
          <p className={`server-msg ${serverMessage.type}`} role="status">
            {serverMessage.text}
          </p>
        )}

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'loging in…' : 'log in'}
        </button>
      </form>
    </main>
  );
}

export default Login;
