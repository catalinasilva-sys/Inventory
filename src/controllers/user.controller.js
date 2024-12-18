const User = require("#models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.params;
      console.log(req.body);
      const user = await User.findOne({ email });
      if (!user) throw new Error("Este correo no esta asociado con una cuenta de nuestra plataforma")
      const authenticated = bcrypt.compareSync(password, user.password);
      if (!authenticated) throw new Error("Credenciales incorrectas")
      user._doc.createdAt = undefined;
      user._doc.updatedAt = undefined;
      user._doc.password = undefined;
      console.log({ user: user._doc });
      const token = generateToken({ ...user._doc });
      res.status(200).json({ user: user._doc, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  signup: async (req, res) => {
    try {
      const {
        email,
      } = req.body;
      const emailExists = await User.findOne({ email });
      if (emailExists)
        return res.json({
          error:
            "Este correo electrónico ya se encuentra asociado a una cuenta en nuestra plataforma",
        });
      const password = encryptPassword(req.body.password);

      const newUser = new User({
        ...req.body,
        password
      });

      await newUser.save();

      res.status(201).send({ ok: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },

  verifyToken: (req, res) => {
    try {
      const { token } = req.params;
      if (!token) throw new Error("La sesión caducó");
      jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) return res.status(401).json({ error: "La sesión caducó" });
        const user = await User.findById(decoded._id);
        user._doc.createdAt = undefined;
        user._doc.updatedAt = undefined;
        user._doc.password = undefined;
        user._doc.temporalToken = undefined;
        res.status(200).json({ user });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};

const encryptPassword = (password) => {
  const saltRounds = Number(process.env.SALT_ROUNDS);
  return bcrypt.hashSync(password, saltRounds);
};

const generateToken = (data) =>
  jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
