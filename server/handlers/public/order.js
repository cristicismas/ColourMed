const nodemailer = require('nodemailer');

exports.placeOrder = async function(req, res, next) {
  try {
    const orderData = req.body;

    const date = new Date();
    const formattedDate = `${date.getDate()}-${date.getMonth() +
      1}-${date.getFullYear()}`;

    const mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const { userData, items } = orderData;

    let formattedItems = '';
    let totalPrice = 0;

    items.forEach((item, index) => {
      formattedItems += `
      ${index + 1}.
      ${item.title}
      Culoare: ${item.colors[0]}
      Marime: ${item.sizes[0]}
      Pret: ${item.price}
      Cantitate: ${item.quantity}
      Imagine: ${item.images[0]}
      ${item.forMen ? 'Barbati' : 'Femei'}

      `;

      totalPrice += item.price;
    });

    const mailText = `
    Nume: ${userData.firstName}
    Prenume: ${userData.lastName}
    Adresa: ${userData.address}
    Nr. Telefon: ${userData.phoneNumber}
    Email: ${userData.email}

    Pret Total: ${totalPrice} lei


    Produse:

    ${formattedItems}
    `;

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: 'Comanda noua: ' + formattedDate,
      text: mailText
    };

    mailTransporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        return next(err);
      } else {
        return res.status(200).json({ message: 'Success' });
      }
    });
  } catch (err) {
    return next(err);
  }
};