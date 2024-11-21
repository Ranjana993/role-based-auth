const randomString = require("randomstring")
const User = require("../models/user_model")
const bcrypt = require("bcrypt")
const sendMailer = require("../helper/mailer")

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body
    if (!(name || email)) {
      return res.status(401).json({ success: false, message: "Please enter name and email " })
    }

    const isExist = await User.findOne(({ email }))
    if (isExist) {
      return res.status(400).json({ success: false, message: "email already exist" })
    }

    const password = randomString.generate(6);
    const hashedPass = await bcrypt.hash(password, 10)

    var obj = { name, email, password: hashedPass }
    if (req.body.role && req.body.role === 1) {
      return res.status(400).json({ success: false, message: "You can't create admin" })
    }
    else if (req.body.role) {
      obj.role = req.body.role
    }
    const user = new User(obj);
    const newUser = await user.save();
    console.log("password ", password);
    const content = `
    <p>Hii <b> `+ newUser.name + ` ,</b> Your account has been created , below is your details  </p>
    <Table style=""border-style:none>
    <tr>
      <th>Name :- </th>
      <td>`+ newUser.name + ` </td>
    </tr>
        <tr>
      <th>Email :- </th>
      <td>`+ newUser.email + ` </td>
    </tr>
        <tr>
      <th>Password :- </th>
      <td>`+ newUser.password + ` </td>
    </tr>
    </table>
    <p>Now you can login  and Enjoy a great experience , 
    Thanks </p>
`
    console.log(newUser.email);

    sendMailer(newUser.email, "Account created ", content)
    console.log("Account created successfully ")
    return res.status(200).json({ success: true, message: "user created successfully ! ", data: newUser })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error while creating user ", error: error })
  }
}
module.exports = { createUser }