import express from 'express';
import session from 'express-session';
import exphbs from 'express-handlebars';
import configRoutes from './routes/index.js';
import { logMiddleware, authMiddleware, adminMiddleware, userMiddleware, signInMiddleware, signUpMiddleware, signOutMiddleware } from './middleware.js';

const app = express();
const PORT = 3000;

// Set up Handlebars
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  name: 'AuthenticationState',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: false
}));

app.use(logMiddleware);
app.use('/', authMiddleware);
app.use('/signinuser', signInMiddleware);
app.use('/signupuser', signUpMiddleware);
app.use('/user', userMiddleware);
app.use('/administrator', adminMiddleware);
app.use('/signoutuser', signOutMiddleware);

configRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});