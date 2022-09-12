import User from "../models/user";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
 
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name) return res.status(400).send("Nazwa jest wymagana");
    if (!password || password.length < 8)
      return res
        .status(400)
        .send("Hasło jest wymagane i musi mieć przynajmniej 8 znaków!");
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email jest zajęty");
    const user = new User(req.body);
    await user.save();
    console.log("użytkownik stworzony", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log("utworzenie użytkownika nie powiodło się", err);
    return res.status(400).send("");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email }).exec();
    if (!user) res.status(400).send("Nie znaleziono użytkownika z takim adresem email");
    user.comparePassword(password, (err, match) => {
      if (!match || err) return res.status(400).send("hasło nieprawidłowe");
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          stripe_account_id: user.stripe_account_id,
          stripe_seller: user.stripe_seller,
          stripeSession: user.stripeSession,
        },
      });
    });
  } catch (err) {
    console.log("LOGIN ERROR", err);
    res.status(400).send("logowanie nie powiodło się");
  }
};
