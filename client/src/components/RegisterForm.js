import "./index.scss";

const RegisterForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) => (
  <form onSubmit={handleSubmit} className="mt-3 form">
    <div className="form-group mb-3">
      <label className="form-label">Nazwa</label>
      <input
        type="text"
        className="form-control"
        placeholder="Podaj nazwę"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    <div className="form-group mb-3">
      <label className="form-label">Adres email</label>
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

    <button disabled={!name || !email || !password} className="btn btn-primary">
      Potwierdź
    </button>
  </form>
);

export default RegisterForm;
