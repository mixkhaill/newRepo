import "./index.scss";

const LoginForm = ({
  handleSubmit,
  email, 
  setEmail,
  password,
  setPassword,
}) => (
  <form onSubmit={handleSubmit} className="mt-3 form">
    <div className="form-group mb-3">
      <label className="form-label">Email</label>
      <input
        type="email"
        className="form-control"
        placeholder="Podaj email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="form-group mb-3">
      <label className="form-label">Hasło</label>
      <input
        type="password"
        className="form-control"
        placeholder="Podaj hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <button disabled={!email || !password} className="btn btn-primary">
      Potwierdź
    </button>
  </form>
);

export default LoginForm;
