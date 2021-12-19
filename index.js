const core = require('@actions/core');
const yaml = require('js-yaml');
const fs   = require('fs');

try {
    const ENV_VARIABLES_KEY = 'env_variables';

    const path = core.getInput('path');
    const doc = yaml.load(fs.readFileSync(`${path}`, 'utf8'));

    if (doc[ENV_VARIABLES_KEY] === undefined) {
        console.log(`skipped: ${ENV_VARIABLES_KEY} not found`);
        return
    }

    if (!doc[ENV_VARIABLES_KEY]) {
        console.log(`skipped: ${ENV_VARIABLES_KEY} empty`);
        return
    }

    const envKeys = Object.keys(doc[ENV_VARIABLES_KEY])
    envKeys.forEach(key => {
        if (doc[ENV_VARIABLES_KEY][key].charAt(0) === '$') {
            const compiledEnv = doc[ENV_VARIABLES_KEY][key].substring(1);

            if (process.env[compiledEnv] !== undefined) {
                doc[ENV_VARIABLES_KEY][key] = process.env[compiledEnv]
            }
        }
    });

    const compiledDocument = yaml.dump(doc);
    fs.writeFileSync(path, compiledDocument)

    console.log('done: app.yaml file compiled successfully');
} catch (error) {
    core.setFailed(error.message);
}
