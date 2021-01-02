const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Votre commande pour ${total}</h2>
    <ul>
      ${order
        .map(
          (item) => `<li>
        <img src="${item.thumbnail}" alt="${item.name}" />
        ${item.format}: ${item.name} - ${item.price}
      </li>`
        )
        .join('')}
    </ul>
    <h3>Le montant de votre commande est de <strong>${total}</strong>.</h3>
    <style>
        ul { list-style: none; }
    </style>
  </div>`;
}

// transport
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

// for vercel deploy!
/* module.exports = async (req, res) {
  const { body } = req;
  if (body.pate) {
    return res.status(400).json({
      message: 'ERR 95643',
    })
  }
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return res.status(400).json({
        message: `Oups! Il manque les infos du champ ${field}`,
      })
    }
  }

  if (!body.order.length) {
      return res.status(400).json({
        message: 'Pourquoi ne rien commander ?',
      })
  }

  // send email
  await transporter.sendMail({
    from: "Books's Slices <books@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'Votre commande',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return res.status(200).json({
    message: 'Succès !',
  });
} */
exports.handler = async (event, context) => {
  // await wait(2000);

  // get body data sent as string
  const body = JSON.parse(event.body);

  // check pate - honey pot
  if (body.pate) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'ERR 95643' }),
    };
  }

  // validate the data is correct and complete
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `OOps! Il manque les infos du champ ${field}`,
        }),
      };
    }
  }

  // make sure there are items in order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Pourquoi ne rien commander ?',
      }),
    };
  }

  // send email
  await transporter.sendMail({
    from: "Books's Slices <books@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'Votre commande',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Succès !' }),
  };
};
