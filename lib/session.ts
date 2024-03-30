import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";


const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: 'myapp_cookiename',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}