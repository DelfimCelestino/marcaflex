/** @type {import('next').NextConfig} */
const nextConfig = {
     httpAgentOptions:{
       keepAlive:true   
     },
     images:{
          remotePatterns:[
               {
                    hostname:'utfs.io',
               }
          ]
     }
};

export default nextConfig;
