const config = {
    API_HOST: process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000',
    API_KEY: process.env.NEXT_PUBLIC_API_KEY ,
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
}

export default config;
