import NextAuth, { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
	providers: [
		{
			id: 'tour',
			name: 'Tour',
			client: {
				client_id: 'web-client',
				token_endpoint_auth_method: 'none',
			},
			type: 'oauth',
			version: '2',
			checks: ['pkce'],
			idToken: true,
			issuer: 'localhost:9000', //ENDPOINT.ACCOUNT
			wellKnown: 'localhost:9000', //ENDPOINT.ACCOUNT',.

			userinfo: {
				url: 'localhost:8080', // Lấy profile
				async request(context) {
					const res = await fetch(
						'localhost:8080', //Lấy profile
						{
							headers: {
								Authorization: `Bearer ${context.tokens.access_token}`,
							},
						}
					);
					const data = await res.json();
					console.log(data);

					return { id: 'sdsd', ...data }; // nếu có id thỉ bỏ id chỉ cần return data;
				},
			},
			profile: (profile) => {
				return {
					...profile,
				};
			},
		},
	],
};

const handle = NextAuth(authOptions);

export { handle as GET, handle as POST };
