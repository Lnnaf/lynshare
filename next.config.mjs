/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "picsum.photos",
			},{
				protocol: "https",
				hostname: "media.dev.to"
			},{
				protocol: "https",
				hostname: "lh3.googleusercontent.com" 
			},{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com"
			} 
		],
	},
};

export default nextConfig;
