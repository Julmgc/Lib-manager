import nodemailer from 'nodemailer';
import path from 'path';
import hbs, {NodemailerExpressHandlebarsOptions} from 'nodemailer-express-handlebars'

export default class MailerServices {
	static transport = () => {
		const host = process.env.MAILER_HOST || "";
		const port = process.env.MAILER_PORT || "";
		const user = process.env.MAILER_USER;
		const pass = process.env.MAILER_PASSWORD
		const transport = nodemailer.createTransport({
			host: host, // Endereço de IP/hostname para conexão
			port: parseInt(port), // Porta de entrada
			auth: {
				// Credenciais de autorização
				user: user,
				pass: pass,
			},
		});

		const handlebarOptions: NodemailerExpressHandlebarsOptions = {
			viewEngine: {
				partialsDir:
					process.env.NODE_ENV === "production"
						? "/app/src/templates"
						: path.resolve(__dirname, "..", "templates"),
				defaultLayout: undefined,
			},
			viewPath:
				process.env.NODE_ENV === "production"
					? "/app/src/templates"
					: path.resolve(__dirname, "..", "templates"),
		};

		transport.use("compile", hbs(handlebarOptions));

		return transport;
	};

	
}