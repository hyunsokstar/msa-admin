// msa-admin\next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// import type { NextConfig } from "next";
// import fs from 'fs';
// import path from 'path';

// const nextConfig: NextConfig = {
//   webServer: {  // server가 아닌 webServer 사용
//     https: {
//       key: fs.readFileSync(path.join(process.cwd(), 'ssl', 'private.key')),
//       cert: fs.readFileSync(path.join(process.cwd(), 'ssl', 'certificate.crt'))
//     }
//   }
// };

// export default nextConfig;