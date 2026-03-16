import '../styles/globals.css';
import { useState } from 'react';
import QuickLogin from '../components/QuickLogin';

export default function App({ Component, pageProps }) {
const [user, setUser] = useState(null);

if (!user) {
return (
<div className="min-h-screen flex items-center justify-center bg-black">
<QuickLogin onLogin={setUser} />
</div>
);
}

// Pass user to every page as prop
return <Component {...pageProps} user={user} />;
}
