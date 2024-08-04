const { exec } = require('child_process');

// Install necessary dependencies with --legacy-peer-deps
exec('npm install --legacy-peer-deps', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error installing dependencies: ${error.message}`);
        console.error(stderr);
        return;
    }
    if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
    }
    console.log(`Dependencies installed: ${stdout}`);
});

// Additional build steps can be added here if needed
console.log('Arbitrage bot build process completed.');
