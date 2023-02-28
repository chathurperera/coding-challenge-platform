const path = require('path');
const fs = require('fs');

const dirCode = path.join(__dirname, "codes");
if (!fs.existsSync(dirCode)) {
    fs.mkdirSync(dirCode, { recursive: true });
}


const generateFile = async (format, code) => {
    
    const jobId =  Date. now();
    const fileName = `${jobId}.${format}`;
    const filePath = path.join(dirCode, fileName);

    await fs.writeFileSync(filePath, code);
    return filePath;


}

module.exports = { generateFile }