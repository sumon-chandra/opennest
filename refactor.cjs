const fs = require('fs');
const path = require('path');

const filesToEdit = [
  'services/users.service.ts',
  'services/refresh-token.ts',
  'services/auth-service.ts',
  'app/dashboard/landlord/_actions/update-property.ts',
  'app/dashboard/landlord/properties/[id]/edit/page.tsx',
  'app/dashboard/landlord/_actions/get-my-properties.ts',
  'app/dashboard/landlord/_actions/get-categories.ts',
  'app/dashboard/landlord/_actions/delete-property.ts',
  'app/dashboard/landlord/_actions/create-property.ts',
  'app/(public)/_actions/get-properties.ts',
  'app/(auth)/_actions/auth-actions.ts'
];

for (const file of filesToEdit) {
  const fullPath = path.join(process.cwd(), file);
  if (!fs.existsSync(fullPath)) continue;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;

  // Add import if not present
  if (content.includes('process.env.BACKEND_API_URL') && !content.includes('apiFetch')) {
    // Determine relative path to utils/apiFetch.ts
    const dirDepth = file.split('/').length - 1;
    const prefix = dirDepth === 0 ? './utils/apiFetch' : '../'.repeat(dirDepth) + 'utils/apiFetch';
    
    // Add import statement at top
    content = 'import { apiFetch } from "' + prefix + '";\n' + content;

    // Replace fetch(\${process.env.BACKEND_API_URL}...)
    content = content.replace(/fetch\(\s*\$\{process\.env\.BACKEND_API_URL\}\/?(.*?)\s*,?/g, "apiFetch('/',");
    // Replace fetch(\${process.env.BACKEND_API_URL}\) without trailing parts if any
    content = content.replace(/fetch\(\s*\$\{process\.env\.BACKEND_API_URL\}\\s*,?/g, "apiFetch('/',");
  }

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content);
    console.log('Updated ' + file);
  }
}
