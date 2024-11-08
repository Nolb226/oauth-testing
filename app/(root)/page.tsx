'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
	const { data: session } = useSession();
	if (session) {
		return (
			<>
				Signed in as {session.user?.name} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn('tour')}>Sign in</button>
		</>
	);
}
