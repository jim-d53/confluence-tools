const json = require('json-update');

function getBuildDescription() {
    const now = new Date();
    return `Improves Confluence user interface --- Built ${now.toLocaleString()}`;
}

json.update('extension/manifest.json', {description: getBuildDescription()})
    .then(() => console.log('Updated extension manifest.json'));
